/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true, // URL tree in the SEO plan uses trailing slashes
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    // Fallback only: static app/lpg-in-*/page.tsx wins first; remaining /lpg-in-:slug
    // (provinces + hubs without a static page) rewrite to app/lpg-hub/[slug].
    return [{ source: "/lpg-in-:slug", destination: "/lpg-hub/:slug" }];
  },
  async redirects() {
    return [
      // One canonical host: www (once attached to the Vercel project) forwards to the apex in a single hop.
      // :path* drops the trailing slash, so slash-ended paths get their own rule (else a second hop adds it back).
      { source: "/", has: [{ type: "host", value: "www.thelpgco.pk" }], destination: "https://thelpgco.pk/", permanent: true },
      { source: "/:path+/", has: [{ type: "host", value: "www.thelpgco.pk" }], destination: "https://thelpgco.pk/:path+/", permanent: true },
      { source: "/:path+", has: [{ type: "host", value: "www.thelpgco.pk" }], destination: "https://thelpgco.pk/:path+", permanent: true },
      { source: "/get-quote", destination: "/order-lpg/", permanent: true },
      { source: "/shop-preview", destination: "/shop/", permanent: true },
      { source: "/about/haroon-rasheed", destination: "/about/", permanent: true },
      { source: "/safety", destination: "/lpg-safety/", permanent: true },
      { source: "/lpg-hub/:slug", destination: "/lpg-in-:slug/", permanent: true },
      { source: "/cities", destination: "/delivery-areas/", permanent: true },
      { source: "/cities/:slug", destination: "/delivery-areas/", permanent: true },
    ];
  },
};

export default nextConfig;
