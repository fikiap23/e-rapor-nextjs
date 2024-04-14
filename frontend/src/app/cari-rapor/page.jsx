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
    nis: "",
    nama: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataSearch({
      ...dataSearch,
      [name]: value,
    });
  };

  const dataAccordion = [
    {
      title: "2023 - 2024 Ganjil",
    },
    {
      title: "2023 - 2024 Genap",
    },
    {
      title: "2024 - 2025 Ganjil",
    },
    {
      title: "2024 - 2025 Genap",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(dataSearch);
  };
  return (
    <div>
      <Navbar role={userData?.role} />
      <header className="grid grid-cols-none md:grid-cols-2 bg-gradient-to-r from-blue-400 to-purple-400 w-full p-10 md:p-20 gap-10 h-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl text-white font-bold mb-5">Cari Siswa</h1>
          <form
            action=""
            method="post"
            className="flex flex-col gap-5 text-white"
            onSubmit={handleSearch}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="nis" className="block text-sm font-medium">
                Masukkan NIS
              </label>
              <input
                type="number"
                name="nis"
                placeholder="NIS"
                className=" p-3 md:p-6 rounded-md text-black"
                onChange={handleChange}
              />
              <p className="text-sm font-mono">Contoh: 023422</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="nama" className="block text-sm font-medium">
                Masukkan Nama
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                className="p-3 md:p-6 rounded-md text-black"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="semester" className="block text-sm font-medium">
                Pilih Semester
              </label>
              <select
                name="semester"
                id="semester"
                onChange={handleChange}
                value={dataSearch.semester}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-3 md:p-6"
              >
                {dataAccordion.map((item, index) => (
                  <option
                    value={`semester${index + 1}`}
                    key={index}
                    className="p-3 md:p-6"
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="p-3 rounded-lg bg-blue-500"
              target="_blank"
            >
              Cari
            </button>
          </form>
        </div>
        <div className="text-white">
          <h1 className="text-2xl text-white font-bold mb-3">Petunjuk</h1>

          <ul className="list-disc list-inside text-sm md:text-base">
            <li>Masukkan NIS sesuai yang terdata</li>
            <li>Masukkan Nama yang sesuai</li>
            <li>Pilih semester yang diinginkan</li>
          </ul>
        </div>
      </header>
      <Footer />
    </div>
  );
}
