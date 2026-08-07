---
title: "Composing a Landing Page"
weight: 3
description: "Assemble a full landing page from Vara's sections and add your own components."
icon: "layout-dashboard"
---

# Composing a Landing Page

The quick start leaves you with a single hero. This guide builds a complete landing page section by section, then shows how to create your own component so the page can grow with your project.

A landing page is a stack of sections, and most sections accept the same surface controls: `container`, `background`, and `class`. The order of the components in your Markdown is the order they appear on the page, so start with the entry point and work your way down.

## The page shell

Everything lives in `content/index.md`. Build the page top to bottom.

### 1. Header

The header carries the brand, navigation, and a primary action:

```html
<vara-header
  container="lg"
  title="Northwind"
  links="Product|/product,Features|/features,Company|/company"
  cta_label="Start free"
  cta_href="/signup"
/>
```

### 2. Hero

The hero is the first thing visitors see. Give it a headline, one clear sentence, and a pair of actions:

```html
<vara-hero
  container="lg"
  eyebrow="Northwind 2.0"
  title="The analytics platform your team will actually use"
  description="Northwind turns scattered product data into one calm dashboard - no training, no SQL, no waiting on reports."
  primary_label="Start free"
  primary_href="/signup"
  secondary_label="See it live"
  secondary_href="/demo"
  panel_icon="gauge"
  panel_title="What you get on day one"
  item_1="A live dashboard in under five minutes"
  item_2="Integrations for the tools you already use"
  item_3="Answers, not just charts"
/>
```

### 3. Features

Summarize what makes the product worth trying:

```html
<vara-features
  container="lg"
  title="Everything you need to understand your numbers"
  description="Three focused capabilities, zero filler."
  columns="3"
  item_1_icon="gauge"
  item_1_title="Live dashboards"
  item_1_description="Metrics refresh as data arrives, so everyone looks at the same numbers."
  item_2_icon="plug"
  item_2_title="Native integrations"
  item_2_description="Connect your stack in minutes with ready-made integrations."
  item_3_icon="shield-check"
  item_3_title="Enterprise-ready"
  item_3_description="SSO, audit logs, and role-based access out of the box."
/>
```

### 4. Stats

Specific numbers build trust:

```html
<vara-stats
  container="lg"
  title="Teams already shipping with Northwind"
  columns="3"
  stat_1_label="Active teams"
  stat_1_value="2,400"
  stat_2_label="Median time to first answer"
  stat_2_value="4m"
  stat_3_label="Support rating"
  stat_3_value="4.9"
/>
```

### 5. A content split

Use a split when a workflow or a benefit deserves more room:

```html
<vara-content-split
  container="lg"
  eyebrow="How it works"
  title="Connect, model, and share"
  description="Northwind follows the same three steps for every data source."
  item_1="Connect your data sources in a couple of clicks"
  item_2="Model the metrics that matter to your team"
  item_3="Share a live dashboard with one link"
  panel_icon="workflow"
  panel_title="The same flow, every source"
  panel_description="Once you have seen it once, every integration feels familiar."
  media_position="start"
  heading_level="3"
/>
```

### 6. FAQ

Address the questions that stop people from signing up:

```html
<vara-faq
  container="lg"
  title="Before you ask"
  description="The short version of the answers you are looking for."
  open_first="true"
  heading_level="3"
>
  <vara-faq-item id="pricing" question="Is there a free plan?">
    Yes - one project, unlimited dashboards, and community support.
  </vara-faq-item>
  <vara-faq-item id="security" question="How is my data protected?">
    Data is encrypted in transit and at rest, and you can export everything at
    any time.
  </vara-faq-item>
  <vara-faq-item id="migration" question="Can I import from another tool?">
    Most integrations come with one-click import, and the API covers the rest.
  </vara-faq-item>
</vara-faq>
```

### 7. Call to action

Close the page with one clear next step:

```html
<vara-cta
  container="lg"
  title="See your numbers clearly"
  description="Create your account and connect your first data source today."
  primary_label="Start free"
  primary_href="/signup"
  secondary_label="Talk to sales"
  secondary_href="/contact"
/>
```

### 8. Footer

End with the footer so every page has a consistent exit:

```html
<vara-footer
  container="lg"
  copyright="Northwind Inc. &copy; %year%"
  links="Privacy|/privacy,Terms|/terms,Contact|/contact"
  github_href="https://github.com/northwind/northwind"
  github_label="Northwind on GitHub"
/>
```

## Making it yours

The bundled sections cover the common path, but your landing page will eventually need something specific - a logo cloud, a pricing table, a comparison. That is where Vara shines: components are just templates, so adding your own takes minutes.

### Your first component

Create `components/vara-logo-cloud.j2`. The filename becomes the tag name, so keep the `vara-` prefix and kebab-case:

```html
<section class="not-prose bg-base-100 py-10">
  <div class="mx-auto max-w-7xl px-4 text-center">
    <p class="text-xs font-medium uppercase tracking-[0.24em] text-content-muted">
      Trusted by teams at
    </p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-8">
      {{ props.content|safe }}
    </div>
  </div>
</section>
```

Use it as a paired tag anywhere in your page. Whatever you put between the tags is passed to `props.content`:

```html
<vara-logo-cloud>
  <img src="/logos/acme.svg" alt="Acme" class="h-8 w-auto" />
  <img src="/logos/northwind.svg" alt="Northwind" class="h-8 w-auto" />
</vara-logo-cloud>
```

### What your components can use

Your components live in the same world as the theme's, so they can reach for everything Vara ships:

- **Props** - read `props.<name>` for every attribute, and `props.content` for the paired body.
- **Macros** - import the theme's macros for consistent UI, for example `{% import "../templates/vara/macros/button.j2" button %}`.
- **Functions and filters** - call theme helpers such as `vara_icon`, `vara_site_setting`, and `vara_compact_number`.
- **Layout primitives** - compose with `<vara-container>` when you want the same sizing as the rest of the page.

Here is a component that combines a title, paired content, and a button macro:

```html
{% import "../templates/vara/macros/button.j2" button %}

<section class="not-prose bg-base-100 py-10{% if props.class %} {{ props.class }}{% endif %}">
  <div class="mx-auto max-w-7xl px-4 text-center">
    <h2 class="text-3xl font-semibold tracking-tight text-content desk:text-4xl">
      {{ props.title|default:"A heading you can set" }}
    </h2>
    {% if props.content|vara_trim %}<div class="mt-6">
      {{ props.content|safe }}
    </div>{% endif %} {% if props.cta_label and props.cta_href
    %}<div class="mt-8">
      {{ button(props.cta_label, props.cta_href, "", "", "", "lg", "md",
      "solid", "neutral", "true", "false", "button", "desk:w-auto") }}
    </div>{% endif %}
  </div>
</section>
```

### Props stay strings

Component attributes are strings, so keep the same conventions the theme uses: quote every value, use `"true"` / `"false"` for booleans, and accept a `class` prop so users can extend your component:

```html
<section class="not-prose bg-base-100 py-10{% if props.class %} {{ props.class }}{% endif %}">
```

## Keeping the page maintainable

- Give every section a matching `container` so the page feels aligned.
- Alternate `background` values (`base-100` and `base-200`) to separate sections visually.
- Keep one idea per section - if one grows past a few paragraphs, split it.
- Check the page on a narrow screen; every section should read comfortably on mobile.

## Next steps

- Browse the [component catalog](../components/) for everything else that ships with Vara.
- Learn how to [override the theme](../fundamentals/customization/) or change its look.
- Read about [page generators](../fundamentals/page-generators/) when you are ready to restructure the site.
