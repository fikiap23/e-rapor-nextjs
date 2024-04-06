'use client'
import sekolahService from '@/services/sekolahService/sekolah.service'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

function CreateSchoolForm({ token }) {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    noTelepon: '',
    npsn: '',
    kelurahan: '',
    nipKepsek: '',
    kecamatan: '',
    kodePos: '',
    kota: '',
    provinsi: '',
    namaDisdik: '',
    namaKapsek: '',
  })

  const handleSubmit = (event) => {
    try {
      sekolahService
        .create(token, formData)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data sekolah telah diperbarui',
            position: 'bottom-center',
          })

          window.location.reload()
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            position: 'bottom-center',
          })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        position: 'top-right',
      })
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="box-body">
      <h3>TAMBAH DATA SEKOLAH</h3>
      <div
        style={{
          height: '1px',
          width: '100%',
          backgroundColor: 'black',
          margin: '10px 0',
        }}
      ></div>
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nama" className="control-label">
                Nama Sekolah
              </label>
              <input
                type="text"
                name="nama"
                className="form-control"
                id="nama"
                value={formData.nama}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat" className="control-label">
                Alamat Sekolah
              </label>
              <textarea
                name="alamat"
                className="form-control"
                id="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="noTelepon" className="control-label">
                No. Telp Sekolah
              </label>
              <input
                type="number"
                name="noTelepon"
                className="form-control"
                id="noTelepon"
                value={formData.noTelepon}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="npsn" className="control-label">
                NPSN
              </label>
              <input
                type="number"
                name="npsn"
                className="form-control"
                id="npsn"
                value={formData.npsn}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="kelurahan" className="control-label">
                Kelurahan/Desa
              </label>
              <input
                type="text"
                name="kelurahan"
                className="form-control"
                id="kelurahan"
                value={formData.kelurahan}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nipKepsek" className="control-label">
                NIP Kepala Sekolah
              </label>
              <input
                type="text"
                name="nipKepsek"
                className="form-control"
                id="nipKepsek"
                value={formData.nipKepsek}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="kecamatan" className="control-label">
                Kecamatan
              </label>
              <input
                type="text"
                name="kecamatan"
                className="form-control"
                id="kecamatan"
                value={formData.kecamatan}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kodePos" className="control-label">
                Kode Pos
              </label>
              <input
                type="number"
                name="kodePos"
                className="form-control"
                id="kodePos"
                value={formData.kodePos}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="kota" className="control-label">
                Kabupaten
              </label>
              <input
                type="text"
                name="kota"
                className="form-control"
                id="kota"
                value={formData.kota}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="provinsi" className="control-label">
                Provinsi
              </label>
              <input
                type="text"
                name="provinsi"
                className="form-control"
                id="provinsi"
                value={formData.provinsi}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="namaDisdik" className="control-label">
                Nama Disdik
              </label>
              <input
                type="text"
                name="namaDisdik"
                className="form-control"
                id="namaDisdik"
                value={formData.namaDisdik}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="namaKapsek" className="control-label">
                Nama Kepala Sekolah
              </label>
              <input
                type="text"
                name="namaKapsek"
                className="form-control"
                id="namaKapsek"
                value={formData.namaKapsek}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="box-footer">
          <button onClick={handleSubmit} className="btn btn-primary pull-left">
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSchoolForm
