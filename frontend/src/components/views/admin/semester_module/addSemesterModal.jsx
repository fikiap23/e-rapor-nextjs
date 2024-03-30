'use client'
import { useState } from 'react'
import semesterService from '@/services/semesterService/semester.service'
import useAuth from '@/hooks/useAuth'

const AddSemesterModal = ({ isOpen, closeModal }) => {
  const { token } = useAuth()
  const [formValues, setFormValues] = useState({
    tahunAjaranAwal: '',
    tahunAjaranAkhir: '',
    jenisSemester: '',
    namaKepsek: '',
    nipKepsek: '',
    tglBagiRapor: '',
    isAktif: false,
  })

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormValues({
      ...formValues,
      [name]: checked, // Ubah nilai sesuai dengan status checkbox
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Dummy function for handling form submission
    console.log('Form values:', formValues)
    // Add logic for form submission, e.g., sending data to server
    await semesterService.create(formValues, token)
  }

  return (
    <div
      className={`modal fade overscroll-auto scroll-auto  ${
        isOpen ? 'in show-modal' : ''
      }`}
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
          <div className="modal-body ">
            <form role="form" onSubmit={handleSubmit}>
              <div className="box-body ">
                <div className="form-group">
                  <label>Tahun Ajaran Awal</label>
                  <input
                    type="number"
                    required
                    name="tahunAjaranAwal"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tahun Ajaran Akhir</label>
                  <input
                    type="number"
                    required
                    name="tahunAjaranAkhir"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Semester</label>
                  <select
                    required
                    name="jenisSemester"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--- Pilih Semester ---</option>
                    <option value="GANJIL">Ganjil</option>
                    <option value="GENAP">Genap</option>
                    {/* Add other options */}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="namaKepsek">Kepala Sekolah</label>
                  <input
                    type="text"
                    className="form-control"
                    id="namaKepsek"
                    name="namaKepsek"
                    placeholder="Masukkan Nama Kepala Sekolah"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nipKepsek">NIP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nipKepsek"
                    name="nipKepsek"
                    placeholder="Masukkan NIP"
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
                      name="tglBagiRapor"
                      className="form-control pull-right"
                      id="tglBagiRapor"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group flex gap-3">
                  <label htmlFor="isAktif"> Status Aktif</label>
                  <input
                    type="checkbox"
                    name="isAktif"
                    checked={formValues.isAktif}
                    onChange={handleCheckboxChange}
                    className="w-6 h-6 border-solid border-2 border-sky-500"
                  />
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

export default AddSemesterModal
