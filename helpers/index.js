import cookie from "cookie";

export function parseCookies(req) {
  let token = cookie.parse(req ? req.headers.cookie || "" : "");
  if (token == {}) {
    token = null;
  }
  return token;
}
