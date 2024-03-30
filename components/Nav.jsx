"use client";

import Link from "next/link"; // helps moving through different pages
import Image from "next/image"; // optimize images
import { useState, useEffect } from "react"; // hooks (client side ability)
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
const { data: session } = useSession(); // destructuring session from useSession
const [providers, setProviders] = useState(false);
const [toggleDropdown, setToggleDropdown] = useState(false);
useEffect(() => {
const setUpProviders = async () => {
const response = await getProviders();
setProviders(response);
};
setUpProviders();
}, []);
return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="max-sm:hidden font-satoshi font-semibold text-lg text-black">
          Share&Care
        </p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex md:gap-5 gap-3">
            <Link
              href="/create-prompt"
              className="font-semibold font-inter bg-black text-white rounded-full py-1.5 px-5 hover:bg-white hover:text-black text-center text-sm flex justify-center items-center transition-all shadow-lg"
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="font-semibold font-inter bg-transparent text-black rounded-full py-1.5 px-5 hover:bg-white hover:text-black text-center text-sm flex justify-center items-center transition-all shadow-lg border border-black hover:bg-black hover:text-white"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:text-black hover:bg-white"
                >Sign In with {provider.name}</button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="absolute right-0 top-full w-full p-5 mt-3 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                <Link
                  href="/profile"
                  className="text-sm text-gray-600 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="text-sm text-gray-600 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full bg-black text-white rounded-full py-1.5"
                >Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)} // string identifier of the provider (google, facebook, github etc)
                  className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:text-black hover:bg-white"
                >Sign In</button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
