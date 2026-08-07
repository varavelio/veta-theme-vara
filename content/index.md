---
title: "Vara"
description: "A clean, fast, and responsive theme for Veta - documentation and landing pages from Markdown, without a frontend build."
---

<vara-header
container="lg"
links="Docs|/docs,Components|/docs/components,Icons|/icons,GitHub|https://github.com/varavelio/veta-theme-vara"
cta_label="Install"
cta_href="/docs/getting-started/installation"
/>

<vara-hero
container="lg"
eyebrow="The Official Veta Theme"
title="Instant documentation and landing pages"
description="Vara gives your Veta project production-ready layouts out of the box. Write content, drop in components, and launch polished docs or marketing pages without complex JS toolchains."
primary_label="Explore Documentation"
primary_href="/docs/"
secondary_label="GitHub Repository"
secondary_href="https://github.com/varavelio/veta-theme-vara"
panel_icon="panels-top-left"
panel_title="Built for speed and consistency"
panel_description="A curated set of templates and components designed to keep your site cohesive, responsive, and blazing fast."
item_1="Flexible doc and landing page layouts"
item_2="Pre-styled, ready-to-use components"
item_3="Native dark mode support"
item_4="Built-in search and LLM-friendly output"
/>

<vara-features
container="lg"
title="What you get"
description="Vara covers the common path for a software project so you can focus on the content."
columns="3"
item_1_icon="book-open-text"
item_1_title="Documentation sites"
item_1_description="Searchable, responsive documentation with a sidebar, table of contents, and previous and next navigation."
item_1_badge="Docs"
item_2_icon="layout-template"
item_2_title="Landing pages"
item_2_description="Compose polished landing pages from Markdown with a small set of focused components."
item_2_badge="Landing"
item_3_icon="package-check"
item_3_title="No frontend build"
item_3_description="Styles and JavaScript are compiled and shipped with the theme, so your project has no frontend toolchain to maintain."
item_3_badge="Assets"
item_4_icon="search"
item_4_title="Client-side search"
item_4_description="Full-text search over your documentation that runs in the browser, with an index generated at build time."
item_5_icon="sparkles"
item_5_title="Syntax highlighting"
item_5_description="Code blocks are highlighted on demand with a familiar light and dark themes."
item_6_icon="bot"
item_6_title="LLM-ready output"
item_6_description="Every page ships as readable Markdown, with llms.txt indexes for AI assistants."
/>

<vara-content-split
container="lg"
eyebrow="How it works"
title="Content, templates, and components"
description="Veta separates what you write from how it looks. Your project declares pages, writes Markdown, and configures a few settings; Vara provides the presentation."
item_1="Page generators choose a template per route"
item_2="Markdown is rendered and composed with components"
item_3="A data/site.yaml file controls branding and behavior"
panel_icon="workflow"
panel_title="The same theme, many projects"
panel_description="Since Veta is a single binary and this theme requires no dependencies, you can easily use this theme in many projects without any complications."
heading_level="3"
/>

<vara-faq container="lg" title="Common questions" description="A few things people ask before starting." open_first="true" heading_level="3">
<vara-faq-item id="frontend-build" question="Does my project need a frontend build?">
No. Vara ships compiled styles and JavaScript. Your project is content, generators, and configuration.
</vara-faq-item>
<vara-faq-item id="components" question="Do I have to use the bundled components?">
No. Components are opt-in. You can write plain HTML in your templates or add your own components to the project.
</vara-faq-item>
<vara-faq-item id="customize" question="Can I customize the look?">
Yes. The theme is built with Tailwind CSS and uses design tokens for colors, so you can override them and add your own styles.
</vara-faq-item>
<vara-faq-item id="deploy-path" question="Does it work when deployed below a path?">
Yes. Internal links use Veta's deployment-aware URL helper, so the site keeps working under any prefix.
</vara-faq-item>
</vara-faq>

<vara-cta
container="lg"
title="Ready to start?"
description="Install the theme, configure it, and write your first page in a few minutes."
primary_label="Install Vara"
primary_href="/docs/getting-started/installation"
secondary_label="Quick start"
secondary_href="/docs/getting-started/quick-start"
/>

<vara-footer
container="lg"
copyright="A Varavel project &copy; %year%"
links="Docs|/docs,Components|/docs/components,Varavel|https://varavel.com"
github_href="https://github.com/varavelio/veta-theme-vara"
github_label="Vara on GitHub"
/>
