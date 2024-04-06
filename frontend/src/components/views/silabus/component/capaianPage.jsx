import cpTpService from '@/services/cp-tp.service'
import { useState } from 'react'
import Swal from 'sweetalert2'

function CapaianPage({ cp, refetch, token }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    capaianPembelajaranAgama: cp?.capaianPembelajaranAgama || '',
    capaianPembelajaranJatiDiri: cp?.capaianPembelajaranJatiDiri || '',
    capaianPembelajaranLiterasiSains:
      cp?.capaianPembelajaranLiterasiSains || '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSubmit = () => {
    if (
      !formData.capaianPembelajaranAgama ||
      !formData.capaianPembelajaranJatiDiri ||
      !formData.capaianPembelajaranLiterasiSains
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Semua kolom harus diisi',
        position: 'bottom-center',
      })
      return
    }
    try {
      cpTpService
        .updateCp(token, formData)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data Capaian Pembelajaran telah diperbarui',
            position: 'bottom-center',
          })
          refetch()
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
    setIsEditing(false)
  }
  return (
    <div className="active tab-pane" id="input-siswa">
      <div className="box-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label
                htmlFor="capaianPembelajaranAgama"
                className="control-label"
              >
                NILAI AGAMA DAN BUDI PEKERTI
              </label>
              <textarea
                name="capaianPembelajaranAgama"
                className="form-control"
                id="capaianPembelajaranAgama"
                rows="5"
                placeholder="Masukkan Capaian Pembelajaran..."
                readOnly={!isEditing}
                onChange={handleInputChange}
                value={formData.capaianPembelajaranAgama}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label
                htmlFor="capaianPembelajaranJatiDiri"
                className="control-label"
              >
                JATI DIRI
              </label>
              <textarea
                name="capaianPembelajaranJatiDiri"
                className="form-control"
                id="capaianPembelajaranJatiDiri"
                rows="5"
                placeholder="Masukkan Capaian Pembelajaran..."
                readOnly={!isEditing}
                onChange={handleInputChange}
                value={formData.capaianPembelajaranJatiDiri}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label
                htmlFor="capaianPembelajaranLiterasiSains"
                className="control-label"
              >
                DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI
              </label>
              <textarea
                name="capaianPembelajaranLiterasiSains"
                className="form-control"
                id="capaianPembelajaranLiterasiSains"
                rows="5"
                placeholder="Masukkan Capaian Pembelajaran..."
                readOnly={!isEditing}
                onChange={handleInputChange}
                value={formData.capaianPembelajaranLiterasiSains}
              ></textarea>
            </div>
          </div>
        </div>
        {/* Tombol Edit/Simpan */}
        <div className="box-footer">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="btn btn-primary pull-left"
            >
              Simpan
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary pull-left"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CapaianPage
