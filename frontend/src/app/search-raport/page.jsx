"use client";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "../tailwind.css";
import useAuth from "@/hooks/useAuth";
import getTokenData from "@/lib/getTokenData";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { token } = useAuth();
  // console.log(token);
  const userData = getTokenData(token);
  // console.log(userData);

  const router = useRouter();

  const [dataSearch, setDataSearch] = useState({
    nisn: "",
    nama: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataSearch({
      ...dataSearch,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search-raport/${dataSearch.nisn}`);
  };
  return (
    <div>
      <Navbar role={userData?.role} />
      <header className="grid grid-cols-2 bg-blue-500 w-full p-20 gap-10 h-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl text-white font-bold">Cari Siswa</h1>
          <form
            action=""
            method="post"
            className="flex flex-col gap-5"
            onSubmit={handleSearch}
          >
            <div className="flex flex-col">
              <label htmlFor="nisn" className="text-white font-normal">
                Masukkan NISN
              </label>
              <input
                type="number"
                name="nisn"
                placeholder="NISN"
                className="p-6"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nama" className="text-white font-normal">
                Masukkan Nama
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                className="p-6"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="bg-white p-3 rounded-lg">
              Cari
            </button>
          </form>
        </div>
        <div>
          <h1>Hallo</h1>
        </div>
      </header>
      <Footer />
    </div>
  );
}
