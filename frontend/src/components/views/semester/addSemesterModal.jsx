'use client'
import { useState } from 'react'
import semesterService from '@/services/semester.service'
import Swal from 'sweetalert2'
const AddSemesterModal = ({ isOpen, closeModal, refetch, token }) => {
  const [formValues, setFormValues] = useState({
    tahunAjaranAwal: '',
    tahunAjaranAkhir: '',
    jenisSemester: '',
    namaKepsek: '',
    nipKepsek: '',
    tglBagiRapor: '',
    isAktif: false,
  })

  const handleToggle = () => {
    setFormValues({ ...formValues, isAktif: !formValues.isAktif })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const clearForm = () => {
    setFormValues({
      tahunAjaranAwal: '',
      tahunAjaranAkhir: '',
      jenisSemester: '',
      namaKepsek: '',
      nipKepsek: '',
      tglBagiRapor: '',
      isAktif: false,
    })
  }

  const handleSubmit = () => {
    try {
      semesterService
        .create(formValues, token)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data semester telah ditambahkan',
            position: 'bottom-center',
          })
          clearForm()
          refetch()
          closeModal()
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            position: 'bottom-center',
          })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        position: 'top-right',
      })
    }
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
            <div className="box-body ">
              <div className="form-group">
                <label>Tahun Ajaran Awal</label>
                <input
                  type="number"
                  required
                  name="tahunAjaranAwal"
                  className="form-control"
                  value={formValues.tahunAjaranAwal}
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
                  value={formValues.tahunAjaranAkhir}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Semester</label>
                <select
                  required
                  name="jenisSemester"
                  className="form-control"
                  value={formValues.jenisSemester}
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
                  value={formValues.namaKepsek}
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
                  value={formValues.nipKepsek}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDatepickerTglLahir">Tanggal Raport</label>
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
                    value={formValues.tglBagiRapor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status Aktif</label>
                <br />
                <div onClick={handleToggle} className="switch">
                  <input
                    type="checkbox"
                    name="isAktif"
                    value={formValues.isAktif}
                    onChange={handleChange}
                  />
                  <span className="slider round"></span>
                </div>
              </div>
            </div>
            <div className="box-footer">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSemesterModal
