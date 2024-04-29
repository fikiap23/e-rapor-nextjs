import { BadRequestException, Injectable } from '@nestjs/common';
import { RaporQuery } from '../prisma/queries/rapor/rapor.query';
import { CreateRaporDto } from './dto/create-rapor.dto';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { SekolahRepository } from '../sekolah/sekolah.repository';
import { MuridRepository } from '../murid/murid.repository';
import { SemesterRepository } from '../semester/semester.repository';
import { UpdateRaporDto } from './dto/update-rapor.dto';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';
import { UpdateRaporStatic } from '../prisma/queries/rapor/interfaces/rapor';
import { NilaiMingguanRepository } from '../nilai-mingguan/nilai-mingguan.repository';

@Injectable()
export class RaporRepository {
    constructor(
        private readonly raporQuery: RaporQuery,
        private readonly authRepository: AuthRepository,
        private readonly sekolaRepository: SekolahRepository,
        private readonly muridRepository: MuridRepository,
        private readonly semesterRepository: SemesterRepository,
        private readonly rombelQuery: RombelQuery,
        private readonly nilaiMingguanRepository: NilaiMingguanRepository,
    ) { }

    async findByIdOrThrow(id: string) {
        const data = await this.raporQuery.findById(id);
        if (!data) throw new BadRequestException('Rapor tidak ditemukan');
        return data
    }

    async findByIdMuridAndSemesterOrThrow(idMurid: string, idSemester: string) {
        const data = await this.raporQuery.findByIdMuridAndSemester(idMurid, idSemester);
        if (!data) throw new BadRequestException('Rapor tidak ditemukan');
        return data
    }

    async findByIdMurid(idMurid: string) {
        await this.muridRepository.findByIdOrThrow(idMurid)
        return await this.raporQuery.findByIdMurid(idMurid)
    }

    async checkIsRaporExist(idMurid: string, idSemester: string) {
        const rapor = await this.raporQuery.findByIdMuridAndSemester(idMurid, idSemester);
        if (rapor) throw new BadRequestException('Rapor sudah ada');
        return
    }

    async create(token: string, dto: CreateRaporDto) {
        try {
            const sekolah = await this.sekolaRepository.findSekolah()
            const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
            const idRombelSemesterGuru = dto.idRombelSemesterGuru;

            if (!idsRombelSemesterGuru.includes(idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

            // check rombel semester guru exist
            const rombelSemesterGuru = await this.rombelQuery.findRombelSemesterGuruById(idRombelSemesterGuru)

            // check semester and murid exist
            await this.semesterRepository.findByIdOrThrow(dto.idSemester);
            const murid = await this.muridRepository.findByIdOrThrow(dto.idMurid);

            // check rapor exist
            await this.checkIsRaporExist(dto.idMurid, dto.idSemester);

            if (rombelSemesterGuru.idRombel !== murid.idRombel) throw new BadRequestException('Anak tidak terdaftar di rombel ini');

            const data = await this.raporQuery.create(sekolah.id, idRombelSemesterGuru, dto);
            if (!data) throw new BadRequestException('Rapor gagal ditambahkan');
            return data
        } catch (BadRequestException) {
            throw BadRequestException
        }
    }

    async update(token: string, id: string, dto: UpdateRaporDto) {
        await this.findByIdOrThrow(id);
        const { idsRombelSemesterGuru } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        const idRombelSemesterGuru = dto.idRombelSemesterGuru;

        if (!idsRombelSemesterGuru.includes(idRombelSemesterGuru)) throw new BadRequestException('Akun tidak terdaftar di rombel ini');
        // check rombel semester guru exist
        await this.rombelQuery.findRombelSemesterGuruById(idRombelSemesterGuru)

        return await this.raporQuery.updateById(id, idRombelSemesterGuru, dto);
    }

    async findByIdRombelAndSemester(idRombel: string, idSemester: string) {
        return await this.raporQuery.findByIdRombelAndSemester(idRombel, idSemester)
    }

    async printById(id: string) {
        return await this.raporQuery.printById(id)
    }

    async findByNisNamaMuridAndSemester(nis: string, nama: string, idSemester: string) {
        return await this.raporQuery.findByNisNamaMuridAndSemester(nis, nama, idSemester)
    }

    async updateToStaticById(id: string) {
        const checkRapor = await this.findByIdOrThrow(id);
        const data = await this.printById(id);
        const semester = data.semester
        const semesterTahun = data.semesterTahun
        const sekolah = data.sekolah
        // const murid = data.murid
        const guru = data.guru
        const rombel = data.rombel
        const kapsek = data.kapsek
        const rapor = data.rapor

        const payloadUpdate: UpdateRaporStatic = {
            // // static value murid
            // nama: murid.nama,
            // nis: murid.nis,
            // tempatLahir: murid.tempatLahir,
            // tanggalLahir: murid.tanggalLahir,
            // jenisKelamin: murid.jenisKelamin,
            // agama: murid.agama,
            // anakKe: murid.anakKe,
            // foto: murid.foto,

            // // static value orang tua
            // namaAyah: murid.namaAyah,
            // pekerjaanAyah: murid.pekerjaanAyah,
            // namaIbu: murid.namaIbu,
            // pekerjaanIbu: murid.pekerjaanIbu,
            // jalan: murid.jalan,
            // kelurahan: murid.kelurahan,
            // kecamatan: murid.kecamatan,
            // kota: murid.kota,
            // provinsi: murid.provinsi,

            // static value guru
            namaGuru: guru.nama,
            nipGuru: guru.nip,
            namaKapsek: kapsek.nama,
            nipKapsek: kapsek.nip,

            // static value rombel
            namaRombel: rombel.nama,
            kelompokUsia: rombel.kelompokUsia,

            // static value sekolah
            namaSekolah: sekolah.nama,
            npsnSekolah: sekolah.npsn,
            alamatSekolah: sekolah.alamat,
            kodePosSekolah: sekolah.kodePos,
            noTeleponSekolah: sekolah.noTelepon,
            kelurahanSekolah: sekolah.kelurahan,
            kecamatanSekolah: sekolah.kecamatan,
            kotaSekolah: sekolah.kota,
            provinsiSekolah: sekolah.provinsi,
            namaDisdikSekolah: sekolah.namaDisdik,
            logoSekolah: sekolah.logo,

            // static value semester
            namaSemester: semester,
            semesterTahun: semesterTahun,
            tanggalBagiRapor: rapor.tanggalBagiRapor

        }
        await this.nilaiMingguanRepository.createStaticAnalisisPenilaianByIdRombelSemesterGuru(checkRapor.idRombelSemesterGuru, checkRapor.idMurid)
        return await this.raporQuery.updateToStatic(id, payloadUpdate)
    }
}