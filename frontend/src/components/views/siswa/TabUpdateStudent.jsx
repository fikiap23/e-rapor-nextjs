import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter, useSearchParams } from 'next/navigation'

function formatDate(dateString) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const date = new Date(dateString)
  const day = days[date.getUTCDay()]
  const dateOfMonth = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  return `${day}, ${dateOfMonth} ${month} ${year}`
}

function TabUpdateSiswa() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idStudent = searchParams.get('id')
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

  useEffect(() => {
    if (idStudent) {
      fetchStudentData(idStudent)
    }
  }, [idStudent])

  const fetchStudentData = async (id) => {
    try {
      const response = await siswaService.getById(id, token)
      if (response.data) {
        setFormData(response.data)
      } else {
        console.log('Data tidak ditemukan')
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await Swal.fire({
        title: 'Apakah Data Sudah Benar?',
        text: 'Anda akan mengubah data siswa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, ubah!',
        cancelButtonText: 'Tidak, cek lagi',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        await siswaService.update(token, idStudent, formData)
        // window.history.back();
        console.log(formData)
        // router.push('/admin');
        Swal.fire('Data Diubah!', 'Data siswa telah diubah.', 'success')
      }
    } catch (error) {
      console.error('Error:', error.message)
      Swal.fire('Error', 'NIS/NISN Sudah Terdaftar', 'error')
    }
  }

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
  const statusOptions = ['AKTIF', 'TIDAK-AKTIF']

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
                  <label htmlFor={key}>
                    {key.includes('tanggal') ? (
                      <span>
                        {' '}
                        {labels[key]} Sebelumnya:{' '}
                        <b className="text-danger">
                          {formatDate(formData[key])}
                        </b>
                      </span>
                    ) : (
                      labels[key]
                    )}
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
                      <option value="">Pilih Status</option>
                      {jenisKelaminOptions.map((option, index) => (
                        <option key={index} value={option.replace('-', '_')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : key === 'status' ? (
                    <select
                      name={key}
                      className="form-control"
                      id={key}
                      onChange={handleChange}
                      value={formData[key]}
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      {statusOptions.map((option, index) => (
                        <option key={index} value={option.replace('-', '_')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={
                        key.includes('nis')
                          ? 'number'
                          : key.includes('tanggal')
                          ? 'date'
                          : 'text'
                      }
                      name={key}
                      className={`form-control ${
                        (key === 'id' && 'hidden') ||
                        (key === 'idRombel' && 'hidden')
                      }`}
                      value={formData[key]}
                      onChange={handleChange}
                      readOnly={key === 'agama'}
                      required={!key.includes('tanggal') && key !== 'idRombel'}
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

export default TabUpdateSiswa
