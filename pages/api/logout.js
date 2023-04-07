import cookie from "cookie";

export default async function Logout(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: new Date(0),
        sameSite: "strict",
        path: "/", // we can get the cookie everywhere
      })
    );
    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
}
