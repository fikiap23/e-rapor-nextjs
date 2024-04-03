import cpTpService from '@/services/cp-tpService/cp-tp.service'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const AddTujuanModal = ({ isOpen, closeModal, token, refetch }) => {
  const [formData, setFormData] = useState({
    minggu: '',
    tujuanPembelajaranJatiDiri: '',
    tujuanPembelajaranLiterasiSains: '',
    tujuanPembelajaranAgamaBudipekerti: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const clearForm = () => {
    setFormData({
      minggu: '',
      tujuanPembelajaranJatiDiri: '',
      tujuanPembelajaranLiterasiSains: '',
      tujuanPembelajaranAgamaBudipekerti: '',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      !formData.minggu ||
      !formData.tujuanPembelajaranJatiDiri ||
      !formData.tujuanPembelajaranLiterasiSains ||
      !formData.tujuanPembelajaranAgamaBudipekerti
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
        .createTp(token, formData)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data tujuan pembelajaran telah diperbarui',
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
    <div className={`modal fade ${isOpen ? 'in show-modal' : ''}`}>
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
            <h4 className="modal-title">Tambah Tujuan Pembelajaran</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="minggu">Minggu</label>
                  <select
                    className="form-control"
                    id="minggu"
                    name="minggu"
                    value={formData.minggu}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Minggu</option>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tujuanPembelajaranAgamaBudipekerti">
                    NILAI AGAMA DAN BUDI PEKERTI
                  </label>
                  <textarea
                    rows={3}
                    type="text"
                    className="form-control"
                    id="tujuanPembelajaranAgamaBudipekerti"
                    name="tujuanPembelajaranAgamaBudipekerti"
                    value={formData.tujuanPembelajaranAgamaBudipekerti}
                    onChange={handleChange}
                    placeholder="Tuliskan Tujuan Pembelajaran..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tujuanPembelajaranJatiDiri">JATI DIRI</label>
                  <textarea
                    rows={3}
                    type="text"
                    className="form-control"
                    id="tujuanPembelajaranJatiDiri"
                    name="tujuanPembelajaranJatiDiri"
                    value={formData.tujuanPembelajaranJatiDiri}
                    onChange={handleChange}
                    placeholder="Tuliskan Tujuan Pembelajaran..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tujuanPembelajaranLiterasiSains">
                    DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN
                    SENI
                  </label>
                  <textarea
                    rows={3}
                    type="text"
                    className="form-control"
                    id="tujuanPembelajaranLiterasiSains"
                    name="tujuanPembelajaranLiterasiSains"
                    value={formData.tujuanPembelajaranLiterasiSains}
                    onChange={handleChange}
                    placeholder="Tuliskan Tujuan Pembelajaran..."
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

export default AddTujuanModal
