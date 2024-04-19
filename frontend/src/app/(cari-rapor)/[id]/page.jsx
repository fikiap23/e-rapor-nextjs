"use client";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import useAuth from "@/hooks/useAuth";
import "../../tailwind.css";
import getTokenData from "@/lib/getTokenData";
import Accordion from "@/components/tailwind_component/accordion";
import Footer from "@/components/shared/Footer";
import Breadcrumbs from "@/components/tailwind_component/breadcrumbs";

export default function SearchRaportPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const userData = getTokenData(token);

  // const { data, error, isFetching, refetch } = usePrintOneRaport(token, id);

  const paths = [
    { text: "Home", href: "/" },
    { text: "Cari Raport", href: "/cari-rapor" },
    { text: "Data Siswa" },
  ];

  const dataSiswa = {
    nama: "John Doe",
    nis: { id },
    rombel: "A1",
    kelompokUsia: "3 - 4 Tahun",
  };

  const dataAccordion = [
    {
      title: "Semester 1",
    },
    {
      title: "Semester 2",
    },
    {
      title: "Semester 3",
    },
    {
      title: "Semester 4",
    },
  ];

  return (
    <div>
      <Navbar role={userData?.role} />
      <div className="w-full h-fit p-1 bg-gradient-to-r from-blue-400 to-purple-400">
        <div className="mx-auto w-2/3 py-5">
          <h1 className="text-white text-4xl font-semibold mb-3">Data Siswa</h1>
          <Breadcrumbs paths={paths} />
        </div>
      </div>
      <div className="w-full mx-auto h-full p-1 md:p-8">
        <div className="w-full flex flex-col gap-16 justify-center items-center py-4">
          <div className="rounded-md w-3/4 md:w-1/2 overflow-auto drop-shadow-md">
            <table className="w-full h-fit table-auto border-collapse bg-white/30 backdrop-blur-2xl">
              <thead>
                <tr>
                  <th
                    colSpan={3}
                    className="font-bold text-2xl text-start text-white bg-utama/50 py-2 px-4"
                  >
                    Data Siswa
                  </th>
                </tr>
              </thead>
              <tbody className="text-center font-light">
                <tr className="font-normal">
                  <td className="w-1/4 text-end p-2">Nama</td>
                  <td>:</td>
                  <td className="text-start">{dataSiswa.nama}</td>
                </tr>
                <tr>
                  <td className="text-end p-2">NIS</td>
                  <td>:</td>
                  <td className="text-start">{id}</td>
                </tr>
                <tr>
                  <td className="text-end p-2">Rombel</td>
                  <td>:</td>
                  <td className="text-start">{dataSiswa.rombel}</td>
                </tr>
                <tr>
                  <td className="text-end p-2">Kelompok Usia</td>
                  <td>:</td>
                  <td className="text-start">{dataSiswa.kelompokUsia}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-3/4 md:w-1/2 bg-white drop-shadow-md transition duration-[0.5s] rounded-xl overflow-auto p-4">
            <h1 className="mx-auto font-semibold underline underline-offset-4 text-center mb-2">
              Cetak Raport
            </h1>
            <form action="" className="max-w-[50%] mx-auto">
              <label
                htmlFor="semester"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Pilih Semester
              </label>
              <select
                name="semester"
                id="semester"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
              >
                {dataAccordion.map((item, index) => (
                  <option
                    value={`semester${index + 1}`}
                    key={index}
                    className="p-2.5"
                  >
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                className=" py-2 bg-blue-500 rounded-xl text-white mt-5 text-sm w-full"
                type="submit"
              >
                Cetak
              </button>
            </form>
            {/* {dataAccordion.map((item, index) => (
              <Accordion title={item.title} key={index + 1}>
                <div className="flex justify-between items-center transition duration-[0.5s]">
                  <h1>Raport {item.title}</h1>
                  <button className="bg-blue-500 px-3 py-1 rounded-full text-white">
                    Cetak
                  </button>
                </div>
              </Accordion>
            ))} */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
