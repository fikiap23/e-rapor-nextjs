'use client'
import { useState } from 'react'
const AddGroupModal = ({ isOpen, closeModal }) => {
  const [formValues, setFormValues] = useState({
    tahun: '',
    semester: '',
    kepala_sekolah: '',
    nip: '',
    tgl_raport: '',
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
      className={`modal fade  ${isOpen ? 'in show-modal' : ''}`}
      id="add-modal"
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
            <h4 className="modal-title">Tahun</h4>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label>Tahun</label>
                  <select
                    required
                    name="tahun"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--- Pilih Tahun ---</option>
                    <option value="2016-2017">2016-2017</option>
                    {/* Add other options */}
                  </select>
                </div>
                <div className="form-group">
                  <label>Semester</label>
                  <select
                    required
                    name="semester"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--- Pilih Semester ---</option>
                    <option value="Satu">Satu</option>
                    {/* Add other options */}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="kepala_sekolah">Kepala Sekolah</label>
                  <input
                    type="text"
                    className="form-control"
                    id="kepala_sekolah"
                    name="kepala_sekolah"
                    placeholder="Masukan Kepala Sekolah"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nip">NIP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nip"
                    name="nip"
                    placeholder="Masukan Nip"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputDatepickerTglLahir">
                    Tanggal Raport
                  </label>
                  <div className="input-group date">
                    <div className="input-group-addon">
                      <i className="fa fa-calendar"></i>
                    </div>
                    <input
                      type="date"
                      required
                      name="tgl_raport"
                      className="form-control pull-right"
                      id="inputDatepickerTglLahir"
                      onChange={handleChange}
                    />
                  </div>
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

export default AddGroupModal
