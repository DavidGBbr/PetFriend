"use client";
import { signOut } from "@/context/AuthContext";
import Link from "next/link";

const DashboardHeader = () => {
  const handleLogout = async () => {
    signOut();
  };

  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/new">Anunciar pet</Link>
      <button onClick={handleLogout} className="ml-auto">
        Sair da conta
      </button>
    </div>
  );
};

export default DashboardHeader;
