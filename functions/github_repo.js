/**
 * Fetches public GitHub repository metadata for an `owner/name` repository string.
 *
 * Returns an object with `{ ok, stars, forks, tag }`. Repository stats come from
 * the GitHub repository endpoint, and `tag` comes from the latest release when
 * available. Failed requests and invalid input return a safe empty result. Results
 * are cached in-process by repository string to avoid duplicate API calls during a
 * build.
 *
 * Usage:
 *   {% set repo = github_repo("varavelio/veta") %}
 *   {{ repo.stars | compact_number }}
 */

const cache = {};

function emptyResult() {
  return { ok: false, stars: 0, forks: 0, tag: "" };
}

export default function({ httpClient }, input) {
  const repo = String(input || "").trim();

  if (!repo || !repo.includes("/")) {
    return emptyResult();
  }

  if (cache[repo]) {
    return cache[repo];
  }

  const result = emptyResult();

  try {
    const repoResponse = httpClient.get(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      timeoutMs: 5000,
    });

    if (repoResponse.ok) {
      const repoData = JSON.parse(repoResponse.body);
      result.ok = true;
      result.stars = Number(repoData.stargazers_count || 0);
      result.forks = Number(repoData.forks_count || 0);
    }
  } catch (_error) {
    cache[repo] = result;
    return result;
  }

  try {
    const tagResponse = httpClient.get(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      timeoutMs: 5000,
    });

    if (tagResponse.ok) {
      const tagData = JSON.parse(tagResponse.body);
      result.tag = String(tagData.tag_name || "");
    }
  } catch (_error) {
    // Tags are optional metadata; keep the repository stats if release lookup fails.
  }

  cache[repo] = result;
  return result;
}
