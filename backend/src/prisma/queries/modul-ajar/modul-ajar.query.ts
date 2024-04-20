import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateModulAjarDto from '../../../modul-ajar/dto/create-modul-ajar.dto';
import { UpdateModulAjarDto } from '../../../modul-ajar/dto/update-modul-ajar.dto';
import { SemesterType } from '@prisma/client';

@Injectable()
export class ModulAjarQuery extends DbService {
    async findAll() {
        return await this.prisma.modulAjar.findMany()
    }

    async findById(id: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id } })
    }

    async printById(id: string) {
        const modulAjar = await this.prisma.modulAjar.findUnique({
            where: { id },
            include: { jadwalAjar: true, rombelSemesterGuru: { include: { rombel: { select: { kategoriRombel: true, name: true } }, guru: true, semester: true } } }
        });
        if (!modulAjar) return null;

        const sekolah = await this.prisma.sekolah.findFirst();

        const { semester, rombel, guru } = modulAjar.rombelSemesterGuru;

        const jenisSemester = semester.jenisSemester === SemesterType.GANJIL ? '1' : '2';
        const tahunPelajaran = `${semester.tahunAjaranAwal}/${semester.tahunAjaranAkhir}`;
        const tanggalHari = ['tanggalHari1', 'tanggalHari2', 'tanggalHari3', 'tanggalHari4', 'tanggalHari5', 'tanggalHari6'];
        const kegiatanIntiHari = ['kegiatanIntiHari1', 'kegiatanIntiHari2', 'kegiatanIntiHari3', 'kegiatanIntiHari4', 'kegiatanIntiHari5', 'kegiatanIntiHari6'];

        let jadwalAjar = []
        if (modulAjar.jadwalAjar) {
            jadwalAjar = tanggalHari.map((tanggal, index) => ({
                id: modulAjar.jadwalAjar.id,
                tanggal: modulAjar.jadwalAjar[tanggal],
                kegiatanInti: modulAjar.jadwalAjar[kegiatanIntiHari[index]],
                idModulAjar: modulAjar.jadwalAjar.idModulAjar,
                idRombelSemesterGuru: modulAjar.jadwalAjar.idRombelSemesterGuru
            }));
        }

        return {
            semester: `Semester ${jenisSemester} Tahun Pelajaran ${tahunPelajaran}`,
            sekolah: sekolah.nama,
            namaKepsek: semester.namaKepsek,
            nipKepsek: semester.nipKepsek,
            namaGuru: guru.nama,
            nipGuru: guru.nip,
            kelompokUsia: rombel.kategoriRombel.kelompokUsia,
            rombel: rombel.name,
            modulAjar: { ...modulAjar, jadwalAjar }
        };
    }


    async findByIdAndRombel(id: string, idRombelSemesterGuru: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id, idRombelSemesterGuru } })
    }

    async findByIdRombel(idRombelSemesterGuru: string) {
        const rombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({ where: { id: idRombelSemesterGuru }, include: { rombel: { select: { id: true, name: true, kategoriRombel: true } }, semester: true } })
        if (!rombelSemesterGuru) throw new BadRequestException('Rombel tidak ditemukan')

        const modulAjar = await this.prisma.modulAjar.findMany({ where: { idRombelSemesterGuru }, include: { tujuanPembelajaran: true }, orderBy: { minggu: 'asc' } })
        return {
            semester: `${rombelSemesterGuru.semester.tahunAjaranAwal}-${rombelSemesterGuru.semester.tahunAjaranAkhir} (${rombelSemesterGuru.semester.jenisSemester})`,
            kelompokUsia: rombelSemesterGuru.rombel.kategoriRombel.kelompokUsia,
            rombel: rombelSemesterGuru.rombel.name,
            modulAjars: modulAjar,
        }
    }

    async checkIsMingguHasUsed(minggu: number, idTujuanPembelajaran: string, idRombelSemesterGuru: string): Promise<boolean> {
        const isMingguHasUsed = await this.prisma.modulAjar.findFirst({ where: { minggu, idTujuanPembelajaran, idRombelSemesterGuru } })
        return isMingguHasUsed ? true : false
    }

    async checkIsMingguHasUsedByIdsRombelSemesterGuru(minggu: number, idTujuanPembelajaran: string, idRombelSemesterGuru: string[]): Promise<boolean> {
        const isMingguHasUsed = await this.prisma.modulAjar.findFirst({ where: { minggu, idTujuanPembelajaran, idRombelSemesterGuru: { in: idRombelSemesterGuru } } })
        return isMingguHasUsed ? true : false
    }

    async create(payload: CreateModulAjarDto) {
        return await this.prisma.modulAjar.create({ data: payload })
    }

    async updateById(id: string, payload: UpdateModulAjarDto) {
        return await this.prisma.modulAjar.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.modulAjar.delete({ where: { id } })
    }
}