# TECHNICAL DETAILS

## Explaining The _Next.js_ Routing

`layout.tsx` within `/app` is the root (entrypoint) for the web application. It defines the underlying HTML structure for the site. Every route will conform to this layout if no other layout is later given.

Other pages and routes for the website are built by creating subsequent directories under `/app`. To make a route accessible for the user (and not result into a 404), we **must** include a file named `page.tsx` (with a _default export_) within that directory. This tells the router that here exists a real HTML page.

By default, pages will be rendered on the server, and only then returned to the client. Files with a `"use client";` directive will be rendered on the client-side only. This is useful for pages that need interactive elements or otherwise include processing/displaying user's personal/customized data.
