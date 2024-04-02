'use client'
import useAuth from "@/hooks/useAuth";
import siswaService from "@/services/studentService/student.service";
import React, { useState } from "react";
import Swal from 'sweetalert2';

function RaportInput() {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        totalSakit: 0,
        totalIzin: 0,
        totalAlpa: 0,
        catatanAgamaBudipekerti: '',
        catatanJatiDiri: '',
        catatanLiterasiSains: '',
        catatanPertumbuhan: '',
        catatanPancasila: '',
        catatanGuru: '',
        idSemester: '',
        idMurid: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await Swal.fire({
                title: 'Apakah Catatan Sudah Benar?',
                text: 'Anda akan memasukan catatan!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, masukan!',
                cancelButtonText: 'Tidak, cek lagi',
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                // await siswaService.create(formData, token);
                setFormData({
                    ...formData,
                    totalSakit: 0,
                    totalIzin: 0,
                    totalAlpa: 0,
                    catatanAgamaBudipekerti: '',
                    catatanJatiDiri: '',
                    catatanLiterasiSains: '',
                    catatanPertumbuhan: '',
                    catatanPancasila: '',
                    catatanGuru: '',
                    idSemester: '',
                    idMurid: ''
                });
                Swal.fire('Data Ditambahkan!', 'Siswa telah ditambahkan.', 'success');
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire('Error', 'Ada masalah, silahkan simpan lagi', 'error');
        }
    };

    // NAMA LABEL
    const labels = {
        totalSakit: 'Total Sakit',
        totalIzin: 'Total Izin',
        totalAlpa: 'Total Alpa',
        catatanAgamaBudipekerti: 'Catatan Agama dan Budi Pekerti',
        catatanJatiDiri: 'Catatan Jati Diri',
        catatanLiterasiSains: 'Catatan Literasi Sains',
        catatanPertumbuhan: 'Catatan Pertumbuhan',
        catatanPancasila: 'Catatan Pancasila',
        catatanGuru: 'Catatan Guru',
        idSemester: 'ID Semester',
        idMurid: 'ID Murid'
    };

    const jenisKelaminOptions = ["LAKI-LAKI", "PEREMPUAN"];

    return (

        <div className="active tab-pane p-px" style={{ padding: '10px' }} id="input-siswa">
            <div className="box-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {Object.keys(formData).map((key, index) => (
                            <div className={`${key.includes('total') ? 'col-md-4' : 'col-md-8'}`} key={index}>
                                <div className="form-group">
                                    <label
                                        htmlFor={key}
                                        className={`control-label
                                        ${key === 'idSemester' ? "hide" : key === 'idMurid' ? "hide" : ""}`}>
                                        {labels[key]}
                                    </label>
                                    {key.includes('catatan') ? (
                                        <textarea
                                            name={key}
                                            className="form-control"
                                            id={key}
                                            onChange={handleChange}
                                            value={formData[key]}
                                            // required
                                        ></textarea>
                                    ) : (
                                        <input
                                            type={key.includes("total") ? "number" : "text"}
                                            min={key.includes('total') ? 0 : ''}
                                            name={key}
                                            className={`form-control ${key === 'idSemester' ? "hide" : key === 'idMurid' ? "hide" : ""}`}
                                            id={key}
                                            onChange={handleChange}
                                            value={formData[key]}
                                            // required
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="box-footer">
                        <button type="submit" className="btn btn-primary pull-left">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RaportInput;
