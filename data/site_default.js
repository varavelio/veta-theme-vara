export default function() {
  return {
    title: "",
    description: "",
    site_url: "",
    favicon: "https://cdn.jsdelivr.net/gh/varavelio/brand@v1.0.2/dist/avatar-dark.svg",
    logo_light: "https://cdn.jsdelivr.net/gh/varavelio/brand@v1.0.2/dist/logo-black.svg",
    logo_dark: "https://cdn.jsdelivr.net/gh/varavelio/brand@v1.0.2/dist/logo-white.svg",

    not_found_links: [
      {
        icon: "house",
        title: "Go home",
        href: "/",
      },
    ],

    docs_favicon: "", // Docs only override
    docs_logo_light: "", // Docs only override
    docs_logo_dark: "", // Docs only override
    docs_show_title: true,
    docs_github_repo: "", // In user/repo format
    docs_header_links: [],
    docs_sidebar_sections: [],
    docs_sidebar_collapsed: false,
    docs_llms: true,
    docs_llms_index: true,
    docs_credits_footer: true,
    docs_root_permalink: "/docs/",
    docs_search: true,
    docs_search_index_permalink: "/docs/vara-docs-search-index.json",
    docs_shiki: true,
    docs_shiki_custom_languages: [
      {
        id: "vdl",
        url: "https://cdn.jsdelivr.net/gh/varavelio/vdl@e0b51b/integrations/syntax/textmate/vdl.tmLanguage.json",
      },
    ],
  };
}
