"use client";
import "@/components/tailwind_component/tailwind.css";
import useAuth from "@/hooks/useAuth";
import getTokenData from "@/lib/getTokenData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import raportService from "@/services/rapor.service";
import { useGetAllSemesterData } from "@/hooks/useSemester";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/shared/Navbar";

export default function SearchView() {
  const { token } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    nis: "",
    nama: "",
    semester: "",
  });
  const { push } = useRouter();

  const userData = getTokenData(token);

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
  } = useGetAllSemesterData(null, true);

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
      if (
        dataSearch.semester === "" ||
        dataSearch.semester === null ||
        dataSearch.semester === "#"
      ) {
        toast.error("Semester harus dipilih", {
          position: "top-right",
        });
        setIsLoading(false);
        return;
      }
      const result = await raportService.getOne(
        dataSearch.nama,
        dataSearch.nis,
        dataSearch.semester
      );

      const idRapor = result.idRapor;

      setTimeout(() => {
        push(`/raport_print/${idRapor}`);
        setIsLoading(false);
      }, 500);
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
        className="hero-content flex-col lg:flex-row-reverse bg-no-repeat bg-right md:bg-cover md:bg-center bg-hero-pattern h-full min-h-[700px] w-full"
      >
        <div className="h-full w-full min-h-[700px] flex flex-col gap-14  justify-center items-center bg-[#002E1A]/50 px-10">
          <div className="text-center text-white flex flex-col justify-center items-center gap-7 mb-7">
            <h1 className="text-2xl md:text-[42px] font-bold mb-2">
              Sistem Informasi Raport Online
            </h1>
            <p className="font-medium text-lg md:text-[21px]">
              RA. Daarun Na’im Ambon
            </p>
            <p className="text-sm">
              Raport Online, pelaporan nilai siswa menjadi lebih mudah dan
              efisien. Cukup akses melalui platform online, dan akses raport
              dengan cepat
            </p>
          </div>
          <a
            href="#cek"
            className="px-5 py-2 bg-[#007C11] text-white text-sm rounded-lg font-semibold transition-all duration-[1s]"
          >
            Cek Raport Online
          </a>
        </div>
      </section>
      <header
        id="cek"
        className="flex flex-col items-center bg-gradient-to-t from-[#007C11] to-[#659165] w-full px-10 py-10 md:px-20 gap-10 h-full"
      >
        <div className="w-full md:px-28">
          <h1 className="text-2xl text-white font-bold mb-5">
            Cari Raport Siswa
          </h1>
          <p className="text-white mb-10">
            Akses Raport Siswa anda dengan secara Online dan Realtime
          </p>
          <form
            action=""
            method="post"
            className="flex flex-col gap-5 text-white"
            onSubmit={handleSearch}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="nis" className="block text-sm font-semibold">
                NIS
              </label>
              <input
                type="number"
                name="nis"
                placeholder="Masukkan NIS"
                className="px-5 py-2 rounded-full text-black"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="nama" className="block text-sm font-semibold">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan Nama"
                className="px-5 py-2 rounded-full text-black"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="semester" className="block text-sm font-semibold">
                Pilih Semester
              </label>
              <select
                name="semester"
                id="semester"
                onChange={handleChange}
                value={dataSearch.semester}
                className="bg-gray-50 border border-gray-300 text-gray-900 px-5 py-2 rounded-full  focus:ring-blue-500 block w-full "
              >
                <option value="#">--- Pilih Semester ---</option>
                {filteredSemesters.map((item, index) => (
                  <option
                    value={item.id}
                    key={index}
                    className="md:px-5 md:py-2 text-black"
                  >
                    {item.tahunAjaranAwal} - {item.tahunAjaranAkhir}{" "}
                    {item.jenisSemester}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-[35px] py-[10px] border-2 border-white w-fit rounded-lg "
              target="_blank"
            >
              {isLoading ? "Loading..." : "Cari Raport"}
            </button>
          </form>
        </div>
        <div className="text-white w-full md:px-28">
          <h1 className="text-2xl text-white font-bold mb-3">Petunjuk</h1>

          <ul className="list-disc list-inside text-sm md:text-base">
            <li>Masukkan NIS sesuai yang terdata</li>
            <li>Nama yang sesuai</li>
            <li>Pilih semester yang diinginkan</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
