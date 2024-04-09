'use client'
import Link from "next/link"
import { useState } from "react"
import DetailScoreModal from "./detailScoreModal"

const TableStudentValidation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const kelompokSiswa = [
        {
            id: 1,
            siswa: {
                nis: '1234567890',
                nama: 'John Doe',
            },
            statusNilai: 'Belum Diinput',
            statusValidation: 'No',
        },
        {
            id: 2,
            siswa: {
                nis: '0987654321',
                nama: 'Jane Doe',
            },
            statusNilai: 'Sudah Diinput',
            statusValidation: 'Yes',
        },
        {
            id: 3,
            siswa: {
                nis: '5432167890',
                nama: 'Alice Smith',
            },
            statusNilai: 'Belum Diinput',
            statusValidation: 'No',
        },
    ]

    return (
        <table className="table table-bordered table-striped" id="kelompok_siswa">
            <thead>
                <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">NIS</th>
                    <th className="text-center">Nama Siswa</th>
                    <th className="text-center">Status Nilai</th>
                    <th className="text-center">Status Validasi</th>
                    <th className="text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kelompokSiswa.map((item, index) => (
                    <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.siswa.nis}</td>
                        <td>{item.siswa.nama}</td>
                        <td>{item.statusNilai === 'Belum Diinput' ? 'Belum Diinput' : (
                            <button
                                onClick={() => <DetailScoreModal isOpen={true} closeModal={closeModal} />}
                                className="btn btn-info btn-sm"
                            >
                                Lihat
                            </button>
                        )}</td>
                        <td>{item.statusValidation === 'No' ? (
                            <button className="btn btn-sm btn-danger">belum</button>
                        ) : (
                            <button className="btn btn-success btn-sm">sudah</button>
                        )}</td>
                        <td>
                            {item.statusValidation === 'No' ? (
                                <button
                                    // href={`/guru/matpel/input-nilai/${item.id}/matpel/cek_matpel.id`}
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fa fa-edit"></i> Validasi Nilai
                                </button>
                            ) : (
                                <button
                                    // href={`/guru/matpel/input-nilai/${item.id}/matpel/cek_matpel.id`}
                                    className="btn btn-danger btn-sm"
                                >
                                    <i className="fa fa-edit"></i> Gagalkan Validasi
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default TableStudentValidation
