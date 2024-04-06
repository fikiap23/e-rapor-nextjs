import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

function TabInputSiswa() {
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    nisn: '',
    nis: '',
    nama: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    alamat: '',
    tanggalMasuk: '',
    tinggiBadan: '',
    beratBadan: '',
    foto: '',
    namaAyah: '',
    namaIbu: '',
    pekerjaanAyah: '',
    pekerjaanIbu: '',
    agama: 'ISLAM',
    status: 'AKTIF',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await Swal.fire({
        title: 'Apakah Data Sudah Benar?',
        text: 'Anda akan menambah siswa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, tambah!',
        cancelButtonText: 'Tidak, cek lagi',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        await siswaService.create(formData, token)
        setFormData({
          ...formData,
          nisn: '',
          nis: '',
          nama: '',
          jenisKelamin: '',
          tempatLahir: '',
          tanggalLahir: '',
          alamat: '',
          tanggalMasuk: '',
          tinggiBadan: '',
          beratBadan: '',
          foto: '',
          namaAyah: '',
          namaIbu: '',
          pekerjaanAyah: '',
          pekerjaanIbu: '',
        })
        Swal.fire('Data Ditambahkan!', 'Siswa telah ditambahkan.', 'success')
      }
    } catch (error) {
      console.error('Error:', error.message)
      Swal.fire('Error', 'NIS/NISN Sudah Terdaftar', 'error')
    }
  }

  // NAMA LABEL
  const labels = {
    nis: 'NIS',
    nisn: 'NISN',
    nama: 'Nama',
    jenisKelamin: 'Jenis Kelamin',
    tempatLahir: 'Tempat Lahir',
    tanggalLahir: 'Tanggal Lahir',
    alamat: 'Alamat',
    tanggalMasuk: 'Tanggal Masuk',
    tinggiBadan: 'Tinggi Badan',
    beratBadan: 'Berat Badan',
    foto: 'Foto',
    namaAyah: 'Nama Ayah',
    namaIbu: 'Nama Ibu',
    pekerjaanAyah: 'Pekerjaan Ayah',
    pekerjaanIbu: 'Pekerjaan Ibu',
    agama: 'Agama',
    status: 'Status',
  }

  const jenisKelaminOptions = ['LAKI-LAKI', 'PEREMPUAN']

  return (
    <div
      className="active tab-pane p-px"
      style={{ padding: '10px' }}
      id="input-siswa"
    >
      <div className="box-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {Object.keys(formData).map((key, index) => (
              <div className="col-md-6" key={index}>
                <div className="form-group">
                  <label
                    htmlFor={key}
                    className={`control-label
                                  ${
                                    labels[key].toLowerCase() === 'status'
                                      ? 'hide'
                                      : labels[key].toLowerCase() === 'agama'
                                      ? 'hide'
                                      : ''
                                  }`}
                  >
                    {labels[key]}
                  </label>
                  {key === 'jenisKelamin' ? (
                    <select
                      name={key}
                      className="form-control"
                      id={key}
                      onChange={handleChange}
                      value={formData[key]}
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      {jenisKelaminOptions.map((option, index) => (
                        <option key={index} value={option.replace('-', '_')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : key === 'alamat' ? (
                    <textarea
                      type={
                        key.includes('tanggal')
                          ? 'date'
                          : key.includes('nis')
                          ? 'number'
                          : key === 'jenisKelamin'
                          ? 'text'
                          : key === 'foto'
                          ? 'file'
                          : 'text'
                      }
                      name={key}
                      className={`form-control ${
                        key === 'status'
                          ? 'hide'
                          : key === 'agama'
                          ? 'hide'
                          : ''
                      }`}
                      id={key}
                      onChange={handleChange}
                      value={formData[key]}
                      required
                    ></textarea>
                  ) : (
                    <input
                      type={
                        key.includes('tanggal')
                          ? 'date'
                          : key.includes('nis')
                          ? 'number'
                          : key.includes('Badan')
                          ? 'number'
                          : key === 'jenisKelamin'
                          ? 'text'
                          : key === 'foto'
                          ? 'file'
                          : 'text'
                      }
                      name={key}
                      className={`form-control ${
                        key === 'status'
                          ? 'hide'
                          : key === 'agama'
                          ? 'hide'
                          : ''
                      }`}
                      id={key}
                      onChange={handleChange}
                      value={formData[key]}
                      required
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
  )
}

export default TabInputSiswa
