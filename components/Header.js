import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";

export default function Header() {
  return (
    <div class="z-10 fixed top-0 navbar bg-slate-800">
      <div class="flex-1">
        <Link
          className="btn btn-ghost normal-case text-xl text-slate-100"
          href="/"
        >
          Taiwan Attractions
        </Link>
      </div>
      <div class="flex-none gap-2">
        <Search />
        {/* <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered"
          />
        </div> */}
        <Link
          className="btn btn-ghost normal-case text-xl text-slate-100"
          href="/attractions/add"
        >
          Add Attractions
        </Link>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {/* <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              <Link href="/account/login">
                <FaSignInAlt></FaSignInAlt>Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
