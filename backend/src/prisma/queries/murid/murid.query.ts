import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateMuridDto from '../../../murid/dto/create-murid.dto';
import { UpdateMuridDto } from '../../../murid/dto/update-murid.dto';
import { Agama, JenisKelamin, StatusAkun } from '@prisma/client';
import { createDateFromDDMMYYYY } from '../../../helpers/helper-date';
import BulkMuridDto from '../../../murid/dto/bulk-muri.dto';

@Injectable()
export class MuridQuery extends DbService {
    async findAll() {
        return await this.prisma.murid.findMany();
    }

    async findById(id: string) {
        return await this.prisma.murid.findUnique({
            where: {
                id,
            },
        });
    }

    async findByNis(nis: string) {
        return await this.prisma.murid.findUnique({
            where: {
                nis,
            },
        });
    }

    async findByNullIdRombel() {
        return await this.prisma.murid.findMany({
            where: {
                idRombel: null,
                status: StatusAkun.AKTIF,
            },
        });
    }

    async checkIsNisHasUsed(nis: string): Promise<boolean> {
        const isNisHasUsed = await this.prisma.murid.findFirst({ where: { nis } });
        return isNisHasUsed ? true : false;
    }

    async create(data: CreateMuridDto) {
        return await this.prisma.murid.create({ data });
    }

    async updateById(id: string, data: UpdateMuridDto) {
        return await this.prisma.murid.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteById(id: string) {
        return await this.prisma.murid.delete({ where: { id } });
    }

    async createMany(data: BulkMuridDto[]) {
        if (!data || data.length === 0) {
            throw new BadRequestException('Data cannot be empty');
        }

        try {
            const newData = []; // Menyimpan data yang valid dan tidak duplikat
            const duplicateNis = new Set(); // Menyimpan NIS duplikat untuk memberikan informasi kepada pengguna

            for (const murid of data) {
                if (!Object.values(JenisKelamin).includes(murid.jenisKelamin)) {
                    throw new BadRequestException(
                        `Siswa dengan NIS ${murid.nis} tidak valid: Jenis Kelamin tidak valid: ${murid.jenisKelamin}`,
                    );
                }

                if (murid.agama && !Object.values(Agama).includes(murid.agama)) {
                    throw new BadRequestException(
                        `Siswa dengan NIS ${murid.nis} tidak valid: Agama tidak valid: ${murid.agama}`,
                    );
                }

                const existingMurid = await this.prisma.murid.findFirst({
                    where: {
                        nis: murid.nis,
                    },
                });
                if (existingMurid) {
                    duplicateNis.add(murid.nis);
                } else {
                    murid.tanggalLahir = createDateFromDDMMYYYY(murid.tanggalLahir);
                    murid.tanggalMasuk = createDateFromDDMMYYYY(murid.tanggalMasuk);
                    if (!murid.tanggalLahir || !murid.tanggalMasuk)
                        throw new BadRequestException(
                            `Siswa dengan NIS ${murid.nis} tidak valid: Tanggal lahir atau tanggal masuk tidak valid`,
                        );
                    newData.push(murid);
                }
            }

            if (duplicateNis.size > 0) {
                throw new BadRequestException(
                    `Data duplikat: NIS (${[...duplicateNis].join(', ')})`,
                );
            }

            const result = await this.prisma.murid.createMany({ data: newData });
            console.log(`Created ${result.count} murids`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getStudentsSemesterRombelByIdRombelSemesterGuru(id: string) {
        const checkRombelSemesterGuru = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id
            }
        })
        if (!checkRombelSemesterGuru) {
            throw new BadRequestException('Rombel tidak ditemukan')
        }
        const originalData = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id
            },
            select: {
                rombel: {
                    select: {
                        id: true,
                        name: true,
                        murid: {
                            select: {
                                id: true,
                                nama: true,
                                nis: true,
                                tinggiBadan: true,
                                beratBadan: true,
                                lingkar: true,
                                rapor: {
                                    where: {
                                        idRombelSemesterGuru: id
                                    }
                                },
                                penilaianMingguan: {
                                    where: {
                                        idRombelSemesterGuru: id,
                                    },
                                },
                            }
                        }
                    }
                },
                semester: {
                    select: {
                        id: true,
                        tahunAjaranAwal: true,
                        tahunAjaranAkhir: true,
                        jenisSemester: true,
                    }
                },
            }
        })
        const tp = await this.prisma.tujuanPembelajaran.count();
        const cp = await this.prisma.capaianPembelajarn.findFirst();
        const newData = {
            ...originalData,
            rombel: {
                id: originalData.rombel.id,
                name: originalData.rombel.name,
            },
            semester: {
                id: originalData.semester.id,
                tahunAjaranAwal: originalData.semester.tahunAjaranAwal,
                tahunAjaranAkhir: originalData.semester.tahunAjaranAkhir,
                jenisSemester: originalData.semester.jenisSemester,
                name: `${originalData.semester.tahunAjaranAwal}-${originalData.semester.tahunAjaranAkhir} (${originalData.semester.jenisSemester})`

            },
            murid: originalData.rombel.murid.map(murid => {
                const penilaianMingguan = murid.penilaianMingguan.length === tp ? true : false;

                let templateRapor: {
                    catatanAgamaBudipekerti: any;
                    catatanJatiDiri: any;
                    catatanLiterasiSains: any;
                } = null;
                const categories = ["belum_berkembang", "mulai_berkembang", "sudah_berkembang"];
                if (penilaianMingguan) {
                    const nilaiMentah = murid.penilaianMingguan.reduce(
                        (acc, obj) => {
                            acc.nilaiAgamaBudipekerti[
                                obj.nilaiAgamaBudipekerti.toLowerCase()
                            ].push(obj.deskripsiAgamaBudipekerti);
                            acc.nilaiJatiDiri[obj.nilaiJatiDiri.toLowerCase()].push(
                                obj.deskripsiJatiDiri,
                            );
                            acc.nilaiLiterasiSains[obj.nilaiLiterasiSains.toLowerCase()].push(
                                obj.deskripsiLiterasiSains,
                            );
                            return acc;
                        },
                        {
                            nilaiAgamaBudipekerti: {
                                belum_berkembang: [],
                                mulai_berkembang: [],
                                sudah_berkembang: [],
                            },
                            nilaiJatiDiri: {
                                belum_berkembang: [],
                                mulai_berkembang: [],
                                sudah_berkembang: [],
                            },
                            nilaiLiterasiSains: {
                                belum_berkembang: [],
                                mulai_berkembang: [],
                                sudah_berkembang: [],
                            },
                        },
                    );

                    const { nilaiAgamaBudipekerti, nilaiJatiDiri, nilaiLiterasiSains } =
                        nilaiMentah;

                    templateRapor = {
                        catatanAgamaBudipekerti: categories.sort((a, b) => nilaiAgamaBudipekerti[b].length - nilaiAgamaBudipekerti[a].length)
                            .slice(0, 2)
                            .reduce((acc, category) => {
                                acc[category] = nilaiAgamaBudipekerti[category];
                                return acc;
                            }, {}),
                        catatanJatiDiri: categories.sort((a, b) => nilaiJatiDiri[b].length - nilaiJatiDiri[a].length)
                            .slice(0, 2)
                            .reduce((acc, category) => {
                                acc[category] = nilaiJatiDiri[category];
                                return acc;
                            }, {}),
                        catatanLiterasiSains: categories.sort((a, b) => nilaiLiterasiSains[b].length - nilaiLiterasiSains[a].length)
                            .slice(0, 2)
                            .reduce((acc, category) => {
                                acc[category] = nilaiLiterasiSains[category];
                                return acc;
                            }, {})
                    }
                }
                const pertumbuhan = `Berdasarkan hasil pengukuran pertumbuhan dan perkembangan ananda ${murid.nama} pada ${originalData.semester.tahunAjaranAwal}-${originalData.semester.tahunAjaranAkhir} (${originalData.semester.jenisSemester}) ini, yang sehat secara fisik, mental, sosial dan rohani, Adapun hasil pencapaian pertumbuhan ananda saat ini dengan berat badan ${murid.beratBadan} Kg, Lingkar Kepala Selebar ${murid.lingkar} Cm, dan TInggi Badan mencapai ${murid.tinggiBadan} Cm. Hal ini menunjukan bahwa Berat Badan ${murid.nama} ${getStatusPertemubuhan(murid.tinggiBadan, murid.beratBadan)} `;

                let resultNilaiAgamaBudipekerti: any = null
                let resultNilaiJatiDiri: any = null
                let resultNilaiLiterasiSains: any = null

                if (templateRapor?.catatanAgamaBudipekerti) {
                    const belumBerkembang = templateRapor?.catatanAgamaBudipekerti['belum_berkembang']
                        ? 'Di rumah, orangtua dapat mengajak ananda melakukan kegiatan-kegiatan yang masih memerlukan bimbingan lebih intens lagi. Hal yang perlu dikembangkan lagi, bahwa ' +
                        templateRapor?.catatanAgamaBudipekerti['belum_berkembang'].join(', ') +
                        ', dan hal ini supaya semua aspek perkembangan nilai agama dan budi pekerti yang lainnya dapat berkembang secara maksimal sebagaimana yang diharapkan.'
                        : null

                    const mulaiBerkembang = templateRapor?.catatanAgamaBudipekerti['mulai_berkembang']
                        ? `Pada semester nanti, guru dapat mengajak bahkan membiasakan ${murid.nama} dalam melakukan tindakan-tindakan yang mencerminkan perilaku positif, sehingga betul-betul akan menjadi karakter yang lebih baik lagi.  Adapun hal tersebut diantaranya dapat terlihat dari beberapa kegiatan yang sudah mulai muncul yaitu ` +
                        templateRapor?.catatanAgamaBudipekerti['mulai_berkembang'].join(', ') +
                        ', yang semua itu diharapkan akan lebih optimal lagi.'
                        : null

                    const sudahBerkembang = templateRapor?.catatanAgamaBudipekerti['sudah_berkembang']
                        ? `Pada Semester ini Perkembangan Aspek ${cp.capaianPembelajaranAgama} Ananda ${murid.nama} sudah menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ` +
                        templateRapor?.catatanAgamaBudipekerti['sudah_berkembang'].join(', ') +
                        ', dan semua pencapaian ini perlu dipertahankan sehingga menjadi suatu pembiasaan yang positif'
                        : null

                    resultNilaiAgamaBudipekerti = [sudahBerkembang, mulaiBerkembang, belumBerkembang]
                        .filter(Boolean)
                }

                if (templateRapor?.catatanJatiDiri) {
                    const belumBerkembang = templateRapor?.catatanJatiDiri['belum_berkembang']
                        ? 'Di rumah, orangtua dapat mengajak ananda melakukan kegiatan-kegiatan yang masih memerlukan bimbingan lebih intens lagi. Hal yang perlu dikembangkan lagi, bahwa ' +
                        templateRapor?.catatanJatiDiri['belum_berkembang'].join(', ') +
                        ', dan hal ini supaya semua aspek perkembangan jati diri lainnya dapat berkembang secara optimal.'
                        : null

                    const mulaiBerkembang = templateRapor?.catatanJatiDiri['mulai_berkembang']
                        ? `Pada semester nanti, guru dapat mengajak bahkan membiasakan ananda ${murid.nama} dalam melakukan tindakan-tindakan yang mencerminkan perilaku positif, sehingga betul-betul akan menjadi karakter yang lebih baik lagi.  Adapun hal tersebut diantaranya dapat terlihat dari beberapa kegiatan yang sudah mulai muncul yaitu  ` +
                        templateRapor?.catatanJatiDiri['mulai_berkembang'].join(', ') +
                        ', sehingga semua itu diharapkan akan lebih optimal lagi.'
                        : null

                    const sudahBerkembang = templateRapor?.catatanJatiDiri['sudah_berkembang']
                        ? `Pada Semester ini Perkembangan Aspek ${cp.capaianPembelajaranJatiDiri} Ananda ${murid.nama} sudah menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ` +
                        templateRapor?.catatanJatiDiri['sudah_berkembang'].join(', ') +
                        ', dan hal ini perlu dipertahankan bahkan menjadikan anak semakin memiliki jati diri yang baik dan kuat.'
                        : null

                    resultNilaiJatiDiri = [sudahBerkembang, mulaiBerkembang, belumBerkembang]
                        .filter(Boolean)
                }

                if (templateRapor?.catatanLiterasiSains) {
                    const belumBerkembang = templateRapor?.catatanLiterasiSains['belum_berkembang']
                        ? 'Di rumah, orangtua dapat mengajak ananda melakukan kegiatan-kegiatan yang masih memerlukan bimbingan lebih intens lagi. Hal yang perlu dikembangkan lagi, bahwa ' +
                        templateRapor?.catatanLiterasiSains['belum_berkembang'].join(', ') +
                        ', dan hal ini supaya semua aspek perkembangan ananda lainnya dapat berkembang secara maksimal lagi.'
                        : null

                    const mulaiBerkembang = templateRapor?.catatanLiterasiSains['mulai_berkembang']
                        ? `Pada semester nanti, guru dapat mengajak bahkan membiasakan ananda ${murid.nama} dalam melakukan tindakan-tindakan yang mencerminkan perilaku positif, sehingga betul-betul akan menjadi karakter yang lebih baik lagi.  Adapun hal tersebut diantaranya dapat terlihat dari beberapa kegiatan yang sudah mulai muncul yaitu ` +
                        templateRapor?.catatanLiterasiSains['mulai_berkembang'].join(', ') +
                        ', sehingga semua itu diharapkan akan lebih optimal lagi.'
                        : null

                    const sudahBerkembang = templateRapor?.catatanLiterasiSains['sudah_berkembang']
                        ? `Pada Semester ini Perkembangan Aspek ${cp.capaianPembelajaranLiterasiSains} Ananda ${murid.nama} sudah menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ` +
                        templateRapor?.catatanLiterasiSains['sudah_berkembang'].join(', ') +
                        ', dan hal ini perlu dipertahankan.'
                        : null

                    resultNilaiLiterasiSains = [sudahBerkembang, mulaiBerkembang, belumBerkembang]
                        .filter(Boolean)
                }

                return {
                    ...murid,
                    penilaianMingguan: penilaianMingguan,
                    nilaiAgamaBudipekerti: resultNilaiAgamaBudipekerti,
                    nilaiJatiDiri: resultNilaiJatiDiri,
                    nilaiLiterasiSains: resultNilaiLiterasiSains,
                    pertumbuhan,
                    rapor: murid.rapor,
                };
            })
        };

        return newData;
    }

    async findStudentByIdRombelSemesterGuru(idRombelSemesterGuru: string) {
        const checkRombelSemesterGuru =
            await this.prisma.rombelSemesterGuru.findUnique({
                where: {
                    id: idRombelSemesterGuru,
                },
            });
        if (!checkRombelSemesterGuru) {
            throw new BadRequestException('Rombel tidak ditemukan');
        }
        const originalData = await this.prisma.rombelSemesterGuru.findUnique({
            where: {
                id: idRombelSemesterGuru,
            },
            select: {
                rombel: {
                    select: {
                        id: true,
                        name: true,
                        murid: {
                            select: {
                                id: true,
                                nama: true,
                                nis: true,
                                foto: true,
                                analisisPenilaian: {
                                    where: {
                                        idRombelSemesterGuru: idRombelSemesterGuru
                                    },
                                    select: {
                                        id: true,
                                    }
                                }
                            },
                        },
                    },
                },
            },
        });

        return originalData.rombel?.murid || [];
    }

    async findOneStudentByIdRombelSemesterGuruAndIdMurid(id: string, idMurid: string) {
        const checkRombelSemesterGuru =
            await this.prisma.rombelSemesterGuru.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    semester: true,
                }
            });
        if (!checkRombelSemesterGuru) {
            throw new BadRequestException('Rombel tidak ditemukan');
        }
        const semester = `${checkRombelSemesterGuru.semester.tahunAjaranAwal}-${checkRombelSemesterGuru.semester.tahunAjaranAkhir} (${checkRombelSemesterGuru.semester.jenisSemester})`
        const tp = await this.prisma.tujuanPembelajaran.count();
        const murid = await this.prisma.murid.findUnique({
            where: {
                id: idMurid,
            },
            select: {
                id: true,
                nama: true,
                nis: true,
                foto: true,
                tinggiBadan: true,
                beratBadan: true,
                lingkar: true,
                rapor: {
                    where: {
                        idRombelSemesterGuru: id,
                    },
                },
                penilaianMingguan: {
                    where: {
                        idRombelSemesterGuru: id,
                    },
                }
            },
        })

        const penilaianMingguan = murid.penilaianMingguan.length === tp ? true : false;
        if (!penilaianMingguan) throw new BadRequestException('Lengkapi penilaian terlebih dahulu');
        let templateRapor: {
            catatanAgamaBudipekerti: any;
            catatanJatiDiri: any;
            catatanLiterasiSains: any;
        } = null;
        const categories = ["belum_berkembang", "mulai_berkembang", "sudah_berkembang"];
        if (penilaianMingguan) {
            const nilaiMentah = murid.penilaianMingguan.reduce(
                (acc, obj) => {
                    acc.nilaiAgamaBudipekerti[
                        obj.nilaiAgamaBudipekerti.toLowerCase()
                    ].push(obj.deskripsiAgamaBudipekerti);
                    acc.nilaiJatiDiri[obj.nilaiJatiDiri.toLowerCase()].push(
                        obj.deskripsiJatiDiri,
                    );
                    acc.nilaiLiterasiSains[obj.nilaiLiterasiSains.toLowerCase()].push(
                        obj.deskripsiLiterasiSains,
                    );
                    return acc;
                },
                {
                    nilaiAgamaBudipekerti: {
                        belum_berkembang: [],
                        mulai_berkembang: [],
                        sudah_berkembang: [],
                    },
                    nilaiJatiDiri: {
                        belum_berkembang: [],
                        mulai_berkembang: [],
                        sudah_berkembang: [],
                    },
                    nilaiLiterasiSains: {
                        belum_berkembang: [],
                        mulai_berkembang: [],
                        sudah_berkembang: [],
                    },
                },
            );

            const { nilaiAgamaBudipekerti, nilaiJatiDiri, nilaiLiterasiSains } =
                nilaiMentah;

            templateRapor = {
                catatanAgamaBudipekerti: categories.sort((a, b) => nilaiAgamaBudipekerti[b].length - nilaiAgamaBudipekerti[a].length)
                    .slice(0, 2)
                    .reduce((acc, category) => {
                        acc[category] = nilaiAgamaBudipekerti[category];
                        return acc;
                    }, {}),
                catatanJatiDiri: categories.sort((a, b) => nilaiJatiDiri[b].length - nilaiJatiDiri[a].length)
                    .slice(0, 2)
                    .reduce((acc, category) => {
                        acc[category] = nilaiJatiDiri[category];
                        return acc;
                    }, {}),
                catatanLiterasiSains: categories.sort((a, b) => nilaiLiterasiSains[b].length - nilaiLiterasiSains[a].length)
                    .slice(0, 2)
                    .reduce((acc, category) => {
                        acc[category] = nilaiLiterasiSains[category];
                        return acc;
                    }, {})
            }
        }
        const pertumbuhan = getStatusPertemubuhan(murid.tinggiBadan, murid.beratBadan);
        return {
            id: murid.id,
            nama: murid.nama,
            nis: murid.nis,
            tinggiBadan: murid.tinggiBadan,
            beratBadan: murid.beratBadan,
            lingkar: murid.lingkar,
            semester,
            penilaianMingguan: penilaianMingguan,
            nilaiAgamaBudipekerti: templateRapor?.catatanAgamaBudipekerti,
            nilaiJatiDiri: templateRapor?.catatanJatiDiri,
            nilaiLiterasiSains: templateRapor?.catatanLiterasiSains,
            pertumbuhan
            // rapor: murid.rapor,
        };
    }

}

function getStatusPertemubuhan(tb: number, bb: number): string {
    const data = (bb * 10000) / (tb * tb)

    if (data <= 17) {
        return 'kurang dan perlu ditambah.'
    } else if (data <= 29) {
        return 'ideal/normal dan perlu dipertahankan.'
    } else if (data <= 34) {
        return 'kegemukan dan perlu dikurangi.'
    } else {
        return 'obesitas dan sebaiknya dikonsultasikan kepada dokter'
    }
}
