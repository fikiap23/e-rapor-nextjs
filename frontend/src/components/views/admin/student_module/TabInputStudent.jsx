import React, { useState } from "react";

function TabInputSiswa() {
    const [formData, setFormData] = useState({
        nis: '',
        nisn: '',
        nama: '',
        jk: '',
        tmptLahir: '',
        tglLahir: '',
        agama: '',
        alamat: '',
        noTelp: '',
        asalSekolah: '',
        alamatAsalSekolah: '',
        diterimaKelas: '',
        tglDiterima: '',
        ortuAyah: '',
        ortuIbu: '',
        alamatOrtu: '',
        noOrtu: '',
        pkjOrtuAyah: '',
        pkjOrtuIbu: '',
        wali: '',
        alamatWali: '',
        noWali: '',
        pkjWali: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
    };

    // Label untuk setiap input
    const labels = {
        nis: 'NIS',
        nisn: 'NISN',
        nama: 'Nama',
        jk: 'Jenis Kelamin',
        tmptLahir: 'Tempat Lahir',
        tglLahir: 'Tanggal Lahir',
        agama: 'Agama',
        alamat: 'Alamat',
        noTelp: 'Nomor Telepon',
        asalSekolah: 'Sekolah Asal',
        alamatAsalSekolah: 'Alamat Sekolah Asal',
        diterimaKelas: 'Diterima di Kelas',
        tglDiterima: 'Tanggal Diterima',
        ortuAyah: 'Nama Ayah',
        ortuIbu: 'Nama Ibu',
        alamatOrtu: 'Alamat Orang Tua',
        noOrtu: 'Nomor Telepon Orang Tua',
        pkjOrtuAyah: 'Pekerjaan Ayah',
        pkjOrtuIbu: 'Pekerjaan Ibu',
        wali: 'Nama Wali',
        alamatWali: 'Alamat Wali',
        noWali: 'Nomor Telepon Wali',
        pkjWali: 'Pekerjaan Wali'
    };

    return (
        <div className="active tab-pane" id="input-siswa">
            <div className="box-body">
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key, index) => (
                        <div className="row" key={index}>
                            <div className="form-group">
                                <label htmlFor={key} className="control-label">{labels[key]}</label>
                                <input
                                    type={key.includes("tgl") ? "date" : key.includes("nis") ? "number" : "text"}
                                    name={key}
                                    className="form-control"
                                    id={key}
                                    onChange={handleChange}
                                    value={formData[key]}
                                    required
                                />
                            </div>
                        </div>
                    ))}
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

export default TabInputSiswa;
