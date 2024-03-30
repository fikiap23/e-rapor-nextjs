import React, { useState } from 'react'

const AddModal = ({ isOpen, closeModal }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    deskripsi: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <div className={`modal fade  ${isOpen ? 'in show-modal' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">Tambah Data Mata Pelajaran</h4>
          </div>
          <div className="modal-body">
            <div>
              <div className="box-body">
                <div className="form-group">
                  <label>Nama Mata Pelajaran</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Masukkan Nama Mata Pelajaran"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Capaian Pembelajaran</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    name="deskripsi"
                    placeholder="Masukkan Capaian"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="box-footer">
                <button onClick={handleSubmit} className="btn btn-primary">
                  Simpan
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
