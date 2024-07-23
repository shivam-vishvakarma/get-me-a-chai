"use client";
import BlueBtn from "./BlueBtn";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between px-4 h-14 max-w-screen-xl mx-auto">
      <div>
        <h1 className="font-bold text-xl dark:text-white">GetMeaChai</h1>
      </div>
      <menu className="flex gap-4 items-center">
        {/* <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li> */}
        {session ? (
          <>
            <button
              type="button"
              className="peer flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="userBtn"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={session.user.profile || "https://i.pravatar.cc/300"}
                alt="user photo"
              />
            </button>
            <div
              className="transition-all z-50 peer-hover:block fixed top-12 right-5 lg:right-10 hidden hover:block peer-focus:block my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {session.user.name || "User"}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {session.user.email || "user@email.com"}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    href={"/dashboard"}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    href={`/${session.user.username}`}
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link href={"/login"}>
            <BlueBtn>Login</BlueBtn>
          </Link>
        )}
      </menu>
    </nav>
  );
}
