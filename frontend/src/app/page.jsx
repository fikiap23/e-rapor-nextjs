import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <header className="grid grid-cols-2 bg-blue-500 w-full p-20 gap-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl text-white font-bold">Cari Siswa</h1>
          <form action="" method="post" className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="nisn" className="text-white font-normal">
                Masukkan NISN
              </label>
              <input
                type="text"
                name="nisn"
                placeholder="NISN"
                className="p-6"
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
