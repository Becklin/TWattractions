import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async function Login(req, res) {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    try {
      const StrapiRes = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });
      const data = await StrapiRes.json();
      if (StrapiRes.ok) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.jwt, {
            httpOnly: true, // meaning the client side js can't have access to the cookie
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json({ user: data.user, jjwwtt: data.jwt });
      } else {
        res.status(data.error.status).json({ message: data.error.message });
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    res.setHeader("allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
}
