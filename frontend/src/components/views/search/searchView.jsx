"use client";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "@/components/tailwind_component/tailwind.css";
import useAuth from "@/hooks/useAuth";
import getTokenData from "@/lib/getTokenData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import raportService from "@/services/rapor.service";
import { useGetAllSemesterData } from "@/hooks/useSemester";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SearchView() {
  const { token } = useAuth();
  // console.log(token);
  const userData = getTokenData(token);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    nis: "",
    nama: "",
    semester: "",
  });
  const { push } = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataSearch({
      ...dataSearch,
      [name]: value,
    });
  };

  const {
    data: listSemester,
    error: errorSemester,
    isFetching: isFetchingSemester,
    refetch: refetchSemester,
  } = useGetAllSemesterData(token);

  const filteredSemesters = listSemester.filter((semester) =>
    Object.values(semester).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(dataSearch);
    try {
      setIsLoading(true);
      const result = await raportService.getOne(
        dataSearch.nama,
        dataSearch.nis,
        dataSearch.semester
      );

      const idRapor = result.idRapor;

      // Redirect to home
      push(`/raport_print/${idRapor}`);
      setIsLoading(false);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
      });
      console.log(`Gagal mendapatkan Raport: ${error}`);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Navbar role={userData?.role} />
      <section
        id="hero"
        className="hero-content flex-col lg:flex-row-reverse bg-no-repeat bg-cover bg-center bg-hero-pattern h-screen w-full"
      >
        <div className="h-full w-full flex justify-center items-center bg-gradient-to-t from-purple-400 to-transparent">
          <div className="w-1/2 text-center bg-white/30 backdrop-blur-md p-2 md:p-7 rounded-xl shadow-md">
            <h1 className="text-base md:text-4xl font-bold text-white">
              TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL
            </h1>
          </div>
        </div>
      </section>
      <header className="grid grid-cols-none md:grid-cols-2 bg-gradient-to-t from-blue-400 to-purple-400 w-full p-10 md:p-20 gap-10 h-auto">
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
                <option value="#" selected>
                  --- PILIH SEMESTER ---
                </option>
                {filteredSemesters.map((item, index) => (
                  <option value={item.id} key={index} className="p-3 md:p-6">
                    {item.tahunAjaranAwal} - {item.tahunAjaranAkhir}{" "}
                    {item.jenisSemester}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="p-3 rounded-lg bg-blue-500"
              target="_blank"
            >
              {isLoading ? "Loading..." : "Cari"}
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
