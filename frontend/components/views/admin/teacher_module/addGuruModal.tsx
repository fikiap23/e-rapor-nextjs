import React, { useState } from 'react'
import Modal from 'react-modal'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    margin: '0px',
    padding: '0px',
  },
}
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Modal"
      style={customStyles}
    >
      <div className="modal-dialog" style={{ margin: '0px', padding: '0' }}>
        <div className="modal-header">
          <h4 className="modal-title">Guru</h4>
          <button className="close" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form role="form" onSubmit={handleSubmit}>
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
                  <option value="pria">Pria</option>
                  <option value="wanita">Wanita</option>
                </select>
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
    </Modal>
  )
}

export default AddModal
