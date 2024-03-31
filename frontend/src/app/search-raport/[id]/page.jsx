"use client";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import useAuth from "@/hooks/useAuth";
import "../../tailwind.css";
import getTokenData from "@/lib/getTokenData";

export default function SearchRaportPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const userData = getTokenData(token);

  return (
    <div>
      <Navbar role={userData?.role} />
      <div className="w-full mx-auto bg-blue-500 h-screen"></div>
    </div>
  );
}
