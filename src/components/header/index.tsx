"use client";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/images/logo.svg";
import { FiUser, FiLogIn } from "react-icons/fi";
import { AuthContext, signOut } from "@/context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const signed = isAuthenticated;
  const loadingAuth = false;

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
        <Link href="/">
          <Image alt="Logo do site" src={logoImg} height={110} />
        </Link>

        {!loadingAuth && signed && (
          <Link href="/dashboard">
            <button className="border-2 rounded-full p-1 border-gray-900">
              <FiUser size={22} color="#000" />
            </button>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link href="/login">
            <button
              className="border-2 rounded-full p-1 border-gray-900"
              onClick={handleLogout}
            >
              <FiLogIn size={22} color="#000" />
            </button>
          </Link>
        )}
      </header>
    </div>
  );
};

export default Header;
