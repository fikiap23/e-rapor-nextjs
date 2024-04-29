

type Penilaian = {
    nilaiAgamaBudipekerti: string;
    deskripsiAgamaBudipekerti: string;
    nilaiJatiDiri: string;
    deskripsiJatiDiri: string;
    nilaiLiterasiSains: string;
    deskripsiLiterasiSains: string;
    minggu: number;
};

export type CreateAnalisisPenilaianType = {
    nama: string;
    nis: string;
    idMurid: string;
    idRombelSemesterGuru: string;
    namaSekolah: string;
    namaRombel: string;
    kelompokUsia: string;
    semester: string;
    namaGuru: string;
    nipGuru: string;
    namaKapsek: string;
    nipKapsek: string;
    penilaian: Penilaian[];
};
