/**
 * Fetches public GitHub repository metadata for an `owner/name` repository string.
 *
 * Returns an object with `{ ok, stars, forks, tag }`. Repository stats come from
 * the GitHub repository endpoint, with a public Shields badge fallback for stars
 * when anonymous GitHub API requests are rate-limited. `tag` comes from the latest
 * release when available. Failed requests and invalid input return a safe empty
 * result. Results are cached in-process by repository string to avoid duplicate API
 * calls during a build.
 *
 * Usage:
 *   {% set repo = vara_github_repo("varavelio/veta") %}
 *   {{ repo.stars |vara_compact_number }}
 */

const cache = {};

function emptyResult() {
  return { ok: false, stars: 0, forks: 0, tag: "" };
}

function parseBadgeCount(value) {
  const match = String(value || "").trim().match(/^(\d+(?:\.\d+)?)([kmb])?$/i);

  if (!match) {
    return null;
  }

  const multipliers = { k: 1_000, m: 1_000_000, b: 1_000_000_000 };
  const multiplier = multipliers[String(match[2] || "").toLowerCase()] || 1;
  return Math.round(Number(match[1]) * multiplier);
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
  let githubApiAvailable = false;

  try {
    const repoResponse = httpClient.get(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      timeoutMs: 5000,
    });

    if (repoResponse.ok) {
      const repoData = JSON.parse(repoResponse.body);
      githubApiAvailable = true;
      result.ok = true;
      result.stars = Number(repoData.stargazers_count || 0);
      result.forks = Number(repoData.forks_count || 0);
    }
  } catch (_error) {
    // The public badge fallback below also works when GitHub rejects the request.
  }

  if (!result.ok) {
    try {
      const encodedRepo = repo.split("/").map(encodeURIComponent).join("/");
      const badgeResponse = httpClient.get(`https://img.shields.io/github/stars/${encodedRepo}.json`, {
        timeoutMs: 5000,
      });

      if (badgeResponse.ok) {
        const badgeData = JSON.parse(badgeResponse.body);
        const stars = parseBadgeCount(badgeData.value);

        if (stars !== null) {
          result.ok = true;
          result.stars = stars;
        }
      }
    } catch (_error) {
      // Missing badge metadata is equivalent to an unavailable repository.
    }
  }

  if (githubApiAvailable) {
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
  }

  cache[repo] = result;
  return result;
}
