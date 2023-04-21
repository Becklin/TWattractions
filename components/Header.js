import Link from "next/link";
import Image from "next/image";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";

import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { logout, user } = useContext(AuthContext);
  const [showUtility, setShowUtility] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row z-10 shrink-0 fixed top-0 navbar bg-slate-800">
      <div className="flex-1 flex justify-center sm:justify-between w-full">
        <Link
          className="btn btn-ghost text-md sm:text-lg text-slate-100 uppercase tracking-widest"
          href="/"
        >
          Taiwan Attractions
        </Link>
        <div className="fixed right-0 sm:hidden">
          <button
            onClick={() => setShowUtility(!showUtility)}
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden sm:inline-flex flex-none gap-2 my-2">
        <Search />
        {user && (
          <Link
            className="btn btn-ghost normal-case text-md text-slate-100"
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
      {showUtility && (
        <div
          className={`z-10 flex flex-col justify-center sm:hidden my-2 ${
            user ? "gap2" : ""
          }`}
        >
          <div className="flex gap-2">
            {/* Add Attractions */}
            {user && (
              <Link
                className="btn btn-ghost normal-case text-lg text-slate-100"
                href="/attractions/add"
              >
                Add Attractions
              </Link>
            )}
            {/* dropdown */}
            <div className="fixed right-2 dropdown dropdown-end">
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
          <Search />
        </div>
      )}
    </div>
  );
}
