import useAuth from '@/hooks/useAuth'
import rombelService from '@/services/rombelService/rombel.service'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddGroupModal = ({ isOpen, closeModal, setKategories }) => {
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
      const result = await rombelService.createKategori(token, formValues)
      if (result.message === 'CREATED') {
        setKategories((prevGurus) => [...prevGurus, result.data])
        toast.success('Kategori rombel telah ditambahkan', {
          position: 'bottom-center',
        })
      }
      // Reset form setelah submit
      setFormValues({
        name: '',
        kelompokUsia: '',
        kode: '',
      })
      closeModal()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(error, {
        position: 'bottom-center',
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
            <h4 className="modal-title">Tambah Data Kategori Rombel</h4>
          </div>
          <div className="modal-body">
            <div>
              <div className="box-body">
                <div className="form-group">
                  <label>Nama Kategori Rombel</label>
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
