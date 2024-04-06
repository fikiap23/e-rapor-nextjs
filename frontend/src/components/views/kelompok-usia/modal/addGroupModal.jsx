import useAuth from '@/hooks/useAuth'
import rombelService from '@/services/rombel.service'
import { useState } from 'react'
import Swal from 'sweetalert2'
const AddGroupModal = ({ isOpen, closeModal, refetch }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    kelompokUsia: '',
    kode: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      // Tambahkan logika untuk menyimpan data kelas
      await rombelService.createKategori(token, formValues)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data kelompok usia rombel telah ditambahkan',
      })
      // Reset form setelah submit
      setFormValues({
        name: '',
        kelompokUsia: '',
        kode: '',
      })
      refetch()
      closeModal()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    }
  }

  return (
    <div
      className={`modal fade ${isOpen ? 'in show-modal' : ''}`}
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
            <h4 className="modal-title">Tambah Data Kelompok Usia Rombel</h4>
          </div>
          <div className="modal-body">
            <div>
              <div className="box-body">
                <div className="form-group">
                  <label>Kelompok Usia Rombel</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Masukkan Nama"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Kelompok Usia</label>
                  <input
                    type="text"
                    className="form-control"
                    name="kelompokUsia"
                    placeholder="Masukkan Kelompok Usia"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Kode</label>
                  <input
                    type="text"
                    className="form-control"
                    name="kode"
                    placeholder="Masukkan Kode"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="box-footer">
                <button onClick={handleSubmit} className="btn btn-primary">
                  {isLoading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGroupModal
