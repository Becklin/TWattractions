import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import TwInput from "@/components/TwInput";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    register({ username, email, password });
  };

  return (
    <>
      <Layout title="User Registration">
        <div className="mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto">
          <ToastContainer />
          <Image
            priority
            alt="background image"
            src="/images/vacation.jpg"
            fill
            className="z-0 object-cover"
          />
          <form
            className="z-[1] relative form-control w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <h1>Register</h1>
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <TwInput
                  type="text"
                  name="username"
                  value={username}
                  placeholder="username"
                  handleInputChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              <div className="flex-1">
                <TwInput
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  placeholder="passwordConfirm"
                  handleInputChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" className="btn mt-8" value="Register" />
          </form>
          <p>
            Already have an account? <Link href="/account/login">Login</Link>
          </p>
          <Link href="/attractions">Back</Link>
          <div className="divider"></div>
        </div>
      </Layout>
    </>
  );
}
