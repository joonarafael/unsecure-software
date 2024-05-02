# TECHNICAL DETAILS

## Explaining The _Next.js_ Routing

`layout.tsx` within `/app` is the root (entrypoint) for the web application. It defines the underlying HTML structure for the site. Every route will conform to this layout if no other layout is later given.

Other pages and routes for the website are built by creating subsequent directories under `/app`. To make a route accessible for the user (and not result into a 404), we **must** include a file named `page.tsx` (with a _default export_) within that directory. This tells the router that here exists a real HTML page.

I've built this web application so that all server-side logic, e.g. the _business logic_, is always executed on `page.tsx`. Only after this logic is executed, the client will be provided with the final page and _client only_ components, that require no server-sided logic whatsoever.
