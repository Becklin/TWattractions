import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async function User(req, res) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res
        .status(403)
        .json({ message: "Not Authorized", head: JSON.stringify(req.headers) });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();
    if (strapiRes.ok) {
      res.status(200).json({ user, strapiRes: JSON.stringify(strapiRes) });
    } else {
      res.status(403).json({
        message: "User forbidden",
        API_URL,
        user,
        reqcookie: req.headers.cookie,
      });
    }
  } else {
    res.setHeader("allow", ["GET"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
}
