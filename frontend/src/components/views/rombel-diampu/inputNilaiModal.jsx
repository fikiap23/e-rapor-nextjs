'use client'
import { useState } from 'react'

const AddNilaiModal = ({ isOpen, closeModal }) => {
  const [formValues, setFormValues] = useState({
    anak: '',
    mataPelajaran: '',
    nilai: '',
    deskripsi: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dummy function for handling form submission
    console.log('Form values:', formValues)
    // Add logic for form submission, e.g., sending data to server
  }

  return (
    <div
      className={`modal fade ${isOpen ? 'in show-modal' : ''}`}
      id="add-nilai-modal"
    >
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
            <h4 className="modal-title">Input Nilai</h4>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label>Anak</label>
                  <select
                    required
                    name="anak"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--- Pilih Anak ---</option>
                    <option value="Anak 1">Anak 1</option>
                    {/* Add other options */}
                  </select>
                </div>
                <div className="form-group">
                  <label>Mata Pelajaran</label>
                  <select
                    required
                    name="mataPelajaran"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--- Pilih Mata Pelajaran ---</option>
                    <option value="Matematika">Matematika</option>
                    {/* Add other options */}
                  </select>
                </div>
                <div className="form-group">
                  <label>Nilai</label>
                  <select
                    required
                    name="nilai"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--- Pilih Nilai ---</option>
                    <option value="Belum Berkembang">Belum Berkembang</option>
                    {/* Add other options */}
                  </select>
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    required
                    name="deskripsi"
                    className="form-control"
                    placeholder="Masukkan Deskripsi"
                    rows="3"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="box-footer">
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

export default AddNilaiModal
