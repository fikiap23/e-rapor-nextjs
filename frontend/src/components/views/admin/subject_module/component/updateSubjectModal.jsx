import mapelService from '@/services/mapelService/mapel.service'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
const UpdateSubjectModal = ({
  isOpen,
  closeModal,
  refetchMapel,
  token,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues)
    }
  }, [initialValues])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleToggle = () => {
    setFormValues({ ...formValues, isAktif: !formValues.isAktif })
  }

  const clearForm = () => {
    setFormValues(initialValues)
  }

  const handleSubmit = () => {
    try {
      mapelService
        .update(token, formValues.id, formValues)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data mapel telah diperbarui',
            position: 'bottom-center',
          })
          refetchMapel()
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
            <h4 className="modal-title">Update Data Mata Pelajaran</h4>
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
                    value={formValues.name}
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
                    value={formValues.deskripsi}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Status Aktif</label>
                  <br />
                  <div onClick={handleToggle} className="switch">
                    <input
                      type="checkbox"
                      checked={formValues.isAktif}
                      name="isAktif"
                    />
                    <span className="slider round"></span>
                  </div>
                </div>
              </div>
              <div className="box-footer">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  style={{ marginRight: '10px' }}
                >
                  Simpan
                </button>
                <button onClick={clearForm} className="btn btn-danger">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateSubjectModal
