import rombelService from '@/services/rombelService/rombel.service'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UpdateGroupModal = ({
  isOpen,
  closeModal,
  setKategories,
  selectedKategori,
  token,
}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    kelompokUsia: '',
    kode: '',
  })
  useEffect(() => {
    if (selectedKategori) {
      setFormValues({
        name: selectedKategori.name,
        kelompokUsia: selectedKategori.kelompokUsia,
        kode: selectedKategori.kode,
      })
    }
  }, [selectedKategori])

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      // Tambahkan logika untuk menyimpan data kelas
      const result = await rombelService.updateKategori(
        token,
        selectedKategori.id,
        formValues
      )
      console.log(result)
      if (result.message == 'OK') {
        console.log('Data kelas diperbarui')
        setKategories((prevKategories) =>
          prevKategories.map((k) =>
            k.id === selectedKategori.id ? result.data : k
          )
        )
        toast.success('Kategori rombel telah diperbarui', {
          position: 'bottom-center',
        })
        closeModal()
      }

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
      id="update-modal"
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
            <h4 className="modal-title">Perbarui Data Kategori Rombel</h4>
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
                    value={formValues.name}
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
                    value={formValues.kelompokUsia}
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
                    value={formValues.kode}
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

export default UpdateGroupModal
