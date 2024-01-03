"use client";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/images/logo.svg";
import { FiUser, FiLogIn } from "react-icons/fi";
import { signOut } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

const Header = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setAuthenticated(Object.keys(parseCookies()).length === 1 ? true : false);
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
        <Link href="/">
          <Image alt="Logo do site" src={logoImg} height={110} priority />
        </Link>
        <Link href={isAuthenticated ? "/dashboard" : "/login"}>
          <button
            className="border-2 rounded-full p-1 border-gray-900"
            onClick={isAuthenticated ? undefined : signOut}
          >
            {isAuthenticated ? (
              <FiUser size={22} color="#000" />
            ) : (
              <FiLogIn size={22} color="#000" />
            )}
          </button>
        </Link>
      </header>
    </div>
  );
};

export default Header;
