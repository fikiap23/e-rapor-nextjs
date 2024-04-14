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
    router.push(`/cari-rapor/${dataSearch.nis}`);
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
              <label htmlFor="nis" className=" font-normal">
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
              <label htmlFor="nama" className=" font-normal">
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
            <button type="submit" className="p-3 rounded-lg bg-blue-500">
              Cari
            </button>
          </form>
        </div>
        <div className="text-white">
          <h1 className="text-2xl text-white font-bold mb-3">Petunjuk</h1>
          <p className="text-justify text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, animi
            qui! Beatae amet, reprehenderit mollitia repellendus repudiandae
            neque sapiente consequuntur temporibus, pariatur recusandae vitae
            unde maxime architecto ipsum voluptatem error itaque dolore repellat
            magni ut rem. Obcaecati reprehenderit architecto totam cupiditate
            unde, enim et, id rerum maxime natus iusto nobis quasi mollitia quos
            distinctio animi! Explicabo a voluptas eveniet, vel pariatur ad
            ratione totam molestiae, nemo sint quasi itaque, consequuntur saepe
            modi suscipit dignissimos sapiente ab. Inventore vel harum et
            numquam doloremque ut sit ad id vitae aperiam, consectetur possimus
            reiciendis sequi dignissimos, enim veniam sunt! Ullam nostrum
            mollitia vel adipisci beatae! Perferendis ipsam totam molestiae
            dolores ea temporibus ab architecto aliquid explicabo qui molestias
            cumque delectus laudantium sit, laboriosam quidem magnam, sed
            consequuntur? Quaerat quia aperiam quas impedit! Reprehenderit neque
            perspiciatis cumque vel ipsa eveniet ducimus porro eius facilis
            voluptate saepe nobis pariatur, placeat adipisci quibusdam
            voluptatem aliquid unde. Voluptate iste beatae magnam saepe at
            inventore maxime qui obcaecati suscipit,
          </p>
        </div>
      </header>
      <Footer />
    </div>
  );
}
