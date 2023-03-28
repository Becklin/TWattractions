import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import TwInput from "@/components/TwInput";

import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="Add New Attraction">
      <ToastContainer />
      <Image
        priority
        alt="background image"
        src="/images/vacation.jpg"
        fill
        className="z-0 object-cover"
      />
      <form
        className="z-10 relative form-control w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2>
          <FaUser className="inline" /> Login
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <TwInput
              type="email"
              name="email"
              value={email}
              placeholder="email"
              handleInputChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <TwInput
              type="password"
              name="password"
              value={password}
              placeholder="password"
              handleInputChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" className="btn mt-8" value="Login" />
      </form>
      <p className="z-10 relative my-4">
        Do not have an account? <Link href="/account/register">Register</Link>
      </p>
      <Link href="/attractions">Back</Link>
      <div className="divider"></div>
    </Layout>
  );
}