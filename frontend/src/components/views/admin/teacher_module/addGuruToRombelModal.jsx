// components/addGuru.js
import useAuth from '@/hooks/useAuth'
import rombelService from '@/services/rombelService/rombel.service'
import { useRombelsNotRelationWithGuru } from '@/services/rombelService/useRombelGuruNotRelation'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
const AddGuruToRombelModal = ({ isOpen, closeModal, refetch }) => {
  const [gurus, setGurus] = React.useState([])
  const [rombels, setRombels] = React.useState([])
  const [formData, setFormData] = React.useState({
    idRombel: '',
    idGuru: '',
  })

  const { token } = useAuth()
  const {
    data: listGuruRombel,
    error: errorGuruRombel,
    isFetching: isFetchingGuruRombel,
    refetch: refetchGuruRombel,
  } = useRombelsNotRelationWithGuru(token)

  useEffect(() => {
    if (listGuruRombel) {
      setGurus(listGuruRombel.gurus)
      setRombels(listGuruRombel.rombels)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = {
        idGuru: formData.idGuru,
      }
      try {
        rombelService
          .updateRombel(token, formData.idRombel, payload)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Data rombel telah diperbarui',
              position: 'bottom-center',
            })
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
    } catch (error) {
      console.log(error)
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
            <h4 className="modal-title">Pilih Guru dan Rombel</h4>
          </div>
          {!isFetchingGuruRombel && gurus && rombels && (
            <>
              <div className="modal-body">
                <div className="form-group">
                  <label>Pilih Rombel</label>
                  <select
                    required
                    name="idRombel"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, idRombel: e.target.value })
                    }
                  >
                    {rombels.length === 0 ? (
                      <option value="" disabled>
                        Tidak ada rombel yang kosong
                      </option>
                    ) : (
                      <>
                        <option value="" className="bg-blue"></option>
                        {rombels.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label>Pilih Guru</label>
                  <select
                    required
                    name="idGuru"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, idGuru: e.target.value })
                    }
                  >
                    {gurus.length === 0 ? (
                      <option value="" disabled>
                        Tidak ada data guru
                      </option>
                    ) : (
                      <>
                        <option value="" className="bg-blue"></option>
                        {gurus.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.nama}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default pull-left"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Simpan
                </button>
              </div>
            </>
          )}
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  )
}

export default AddGuruToRombelModal
