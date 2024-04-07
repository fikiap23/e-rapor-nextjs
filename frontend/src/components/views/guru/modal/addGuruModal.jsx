import teacherService from '@/services/guru.service'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
const AddModal = ({ isOpen, closeModal, refetch, token }) => {
  const [nip, setNip] = useState('')
  const [nama, setNama] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleNipChange = (event) => {
    setNip(event.target.value)
  }

  const handleNamaChange = (event) => {
    setNama(event.target.value)
  }

  const handleJenisKelaminChange = (event) => {
    setJenisKelamin(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      const payload = {
        nip: nip,
        nama: nama,
        jenisKelamin: jenisKelamin,
      }

      await teacherService.create(payload, token)
      refetch()
      Swal.fire('Add Berhasil!', ` Data guru telah ditambahkan`, 'success')

      setNip('')
      setNama('')
      setJenisKelamin('')
      closeModal()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Swal.fire('Oops...', error, 'error')
      setIsLoading(false)
    }
  }

  return (
    <div className={`modal fade  ${isOpen ? 'in show-modal' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Guru</h4>
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div role="form">
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="nip">NIP atau NIK</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nip"
                    name="nip"
                    placeholder="Masukan Nip atau Nik"
                    value={nip}
                    onChange={handleNipChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    name="nama"
                    placeholder="Masukan Nama"
                    value={nama}
                    onChange={handleNamaChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Jenis Kelamin</label>
                  <select
                    required
                    name="jk"
                    className="form-control"
                    value={jenisKelamin}
                    onChange={handleJenisKelaminChange}
                  >
                    <option value="">--- Pilih Jenis Kelamin ---</option>
                    <option value="LAKI_LAKI">Pria</option>
                    <option value="PEREMPUAN">Wanita</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleSubmit} className="btn btn-primary">
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddModal
