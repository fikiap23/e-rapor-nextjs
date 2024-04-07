'use client'
import useAuth from '@/hooks/useAuth'
import { useOneStudent } from '@/hooks/useOneStudent'
import raportService from '@/services/rapor.service'
import siswaService from '@/services/siswa.service'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

function RaportInput() {
  const { token } = useAuth()
  const idStudent = useParams()
  const {
    data: listStudent,
    error,
    isFetching,
    refetch,
  } = useOneStudent(token, idStudent.id)
  // console.log(listStudent);
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
    idSemester: 'dc117068-59c3-46e8-a551-e177fdb23414', //dummy
    idMurid: idStudent.id,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await Swal.fire({
        title: 'Apakah Catatan Sudah Benar?',
        text: 'Anda akan memasukan catatan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, masukan!',
        cancelButtonText: 'Tidak, cek lagi',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        await raportService.create(formData, token);
        // await siswaService.update(token, listStudent.id, { isPrint: "YES" });
        // setFormData({
        //   ...formData,
        //   totalSakit: 0,
        //   totalIzin: 0,
        //   totalAlpa: 0,
        //   catatanAgamaBudipekerti: '',
        //   catatanJatiDiri: '',
        //   catatanLiterasiSains: '',
        //   catatanPertumbuhan: '',
        //   catatanPancasila: '',
        //   catatanGuru: '',
        //   idSemester: '',
        //   idMurid: '',
        // })
        Swal.fire('Data Ditambahkan!', 'Siswa telah ditambahkan.', 'success')
      }
    } catch (error) {
      console.error('Error:', error.message)
      Swal.fire('Error', 'Ada masalah, silahkan simpan lagi', 'error')
    }
  }

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
    idMurid: 'ID Murid',
  }

  const jenisKelaminOptions = ['LAKI-LAKI', 'PEREMPUAN']

  return (
    <div
      className="active tab-pane p-px"
      style={{ padding: '10px' }}
      id="input-siswa"
    >
      <div className="box-body">
        <button
          className="btn btn-default"
          onClick={() => {
            window.history.back()
          }}
          style={{ marginBottom: '2%', marginTop: '-2%' }}
        >
          <i className="fa fa-arrow-left"></i> Kembali
        </button>
        <div className="box-body bg-danger" style={{ marginBottom: '20px' }}>
          <table>
            <tr>
              <td width={50}>Nama</td>
              <td width={20}>:</td>
              <td>{listStudent.nama}</td>
            </tr>
            <tr>
              <td>NIS</td>
              <td>:</td>
              <td>{listStudent.nis}</td>
            </tr>
          </table>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {Object.keys(formData).map((key, index) => (
              <div
                className={`${key.includes('total') ? 'col-md-4' : 'col-md-8'}`}
                key={index}
              >
                <div className="form-group">
                  <label
                    htmlFor={key}
                    className={`control-label
                                        ${key === 'idSemester'
                        ? 'hide'
                        : key === 'idMurid'
                          ? 'hide'
                          : ''
                      }`}
                  >
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
                      type={key.includes('total') ? 'number' : 'text'}
                      min={key.includes('total') ? 0 : ''}
                      name={key}
                      className={`form-control ${key === 'idSemester'
                        ? 'hide'
                        : key === 'idMurid'
                          ? 'hide'
                          : ''
                        }`}
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
  )
}

export default RaportInput
