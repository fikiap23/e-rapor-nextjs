import React, { useState } from 'react'

const AddModal = ({ isOpen, closeModal }) => {
  const [nip, setNip] = useState('')
  const [nama, setNama] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')

  const handleNipChange = (event) => {
    setNip(event.target.value)
  }

  const handleNamaChange = (event) => {
    setNama(event.target.value)
  }

  const handleJenisKelaminChange = (event) => {
    setJenisKelamin(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Lakukan sesuatu dengan data yang disimpan
    // ...
    // Setelah itu, reset nilai input
    setNip('')
    setNama('')
    setJenisKelamin('')
    // Tutup modal
    closeModal()
  }

  const [minggu, setMinggu] = useState('')

  const handleMingguChange = (event) => {
    setMinggu(event.target.value)
  }

  return (
    <div className={`modal fade  ${isOpen ? 'in show-modal' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Modul Ajar</h4>
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="minggu">Minggu</label>
                  <select
                    className="form-control"
                    id="minggu"
                    name="minggu"
                    value={minggu}
                    onChange={handleMingguChange}
                    required
                  >
                    <option value="">Pilih Minggu</option>
                    {[...Array(14)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="nip">Topik</label>
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
                  <label htmlFor="nama">Sub Topik</label>
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
                  <label htmlFor="nama">Kata Kunci</label>
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
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddModal
