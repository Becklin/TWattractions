// // import cookie from "cookie";
import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const StrapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await StrapiRes.json();

    if (StrapiRes.ok) {
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true, // meaning the client side js can't have access to the cookie
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/", // we can get the cookie everywhere
        })
      );
      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
};
