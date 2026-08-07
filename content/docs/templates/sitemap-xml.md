---
title: "vara-sitemap-xml"
weight: 7
description: "The XML sitemap template."
icon: "map"
---

# vara-sitemap-xml

The `vara-sitemap-xml` template generates an XML sitemap of your site's routes, ready to submit to search engines.

## When to use it

Create one page with this template at `/sitemap.xml`:

```js
{
  permalink: "/sitemap.xml",
  template: "vara-sitemap-xml",
}
```

## Which pages are included

HTML routes are included automatically. Other output formats - such as the search index and LLM files - are left out unless a page opts in with `sitemap: true`. Any page can opt out with `sitemap: false`, which is how the not-found page stays out of the sitemap.

Entries are deduplicated by permalink, and each location is resolved to an absolute URL with `site_url`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/docs/</loc>
  </url>
</urlset>
```

See [Page generators](../fundamentals/page-generators/) for more on sitemap opt-in and opt-out.
