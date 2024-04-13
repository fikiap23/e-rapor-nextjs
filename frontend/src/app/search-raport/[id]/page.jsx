"use client";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import useAuth from "@/hooks/useAuth";
import "../../tailwind.css";
import getTokenData from "@/lib/getTokenData";
import Accordion from "@/components/tailwind_component/accordion";

export default function SearchRaportPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const userData = getTokenData(token);

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
      <div className="w-full mx-auto bg-utama h-screen p-8">
        <div className="w-full h-full flex flex-col gap-10 justify-center items-center  rounded p-5">
          <table className="w-1/2 h-fit table-auto">
            <thead className="rounded border">
              <tr className="bg-white">
                <th>Nama</th>
                <th>:</th>
                <th>John Doe</th>
              </tr>
              <tr>
                <th>NISN</th>
                <th>:</th>
                <th>{id}</th>
              </tr>
            </thead>
          </table>
          <div className="w-full">
            {dataAccordion.map((item, index) => (
              <Accordion title={item.title} key={index + 1}>
                <div className="flex justify-between items-center transition duration-[0.5s]">
                  <h1>Raport {item.title}</h1>
                  <button className="bg-blue-500 px-3 py-1 rounded-full text-white">
                    Cetak
                  </button>
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
