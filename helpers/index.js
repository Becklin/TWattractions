import cookie from "cookie";

export function parseCookies(req) {
  let token = cookie.parse(req ? req.headers.cookie || "" : "");
  if (token == {}) {
    token = null;
  }
  return token;
}

export function interceptJsonFromVercelBuild(req) {
  if (typeof window !== "undefined") {
    console.log("瀏覽器");
    // intercept and prevent wasteful /_next/data/*.json request until Next.js issue is resolved
    // https://github.com/vercel/next.js/discussions/38414
    // https://github.com/vercel/next.js/issues/40611
    const { fetch: originalFetch } = window;
    const nextDataRequestRegex = /^\/_next\/data\/.*\.json/;
    window.fetch = async (...args) => {
      const [url] = args;
      console.log("新的fetch url", url);
      if (nextDataRequestRegex.test(url)) {
        return Promise.reject("no vercel build");
      }
      return originalFetch(...args);
    };
  } else {
    console.log("伺服器");
  }
}
