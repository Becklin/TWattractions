import Link from "next/link";
import Image from "next/image";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";

import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { logout, user } = useContext(AuthContext);
  return (
    <div className="z-10 fixed top-0 navbar bg-slate-800">
      <div className="flex-1">
        <Link
          className="btn btn-ghost text-xl text-slate-100 uppercase tracking-widest"
          href="/"
        >
          Taiwan Attractions
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Search />
        {user && (
          <Link
            className="btn btn-ghost normal-case text-xl text-slate-100"
            href="/attractions/add"
          >
            Add Attractions
          </Link>
        )}
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ">
              <Image
                priority
                src="/images/profile.svg"
                height={28}
                width={28}
                alt="profile"
              />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {user && (
              <li>
                <Link href="/account/dashboard">
                  <FaSignInAlt></FaSignInAlt>Dashboard
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <button onClick={() => logout()} aria-label="log out">
                  <FaSignOutAlt></FaSignOutAlt>logout
                </button>
              ) : (
                <Link href="/account/login">
                  <FaSignInAlt></FaSignInAlt>Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
