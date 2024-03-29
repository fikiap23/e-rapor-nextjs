'use client'
import { useState } from 'react'

const DetailScoreModal = ({ isOpen, closeModal }) => {
  const [tingkat, setTingkat] = useState('')
  const [kuota, setKuota] = useState('')
  const [nama, setNama] = useState('')

  const kelompokUsia = [
    { id: 1, tingkat: 'Usia 2-3' },
    { id: 2, tingkat: 'Usia 3-4' },
    { id: 3, tingkat: 'Usia 4-5' },
    { id: 4, tingkat: 'Usia 5-6' },
    { id: 5, tingkat: 'Usia 6-7' },
    // Tambahkan kelompok usia lainnya sesuai kebutuhan
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    // Tambahkan logika untuk menyimpan data kelas
    console.log(`Tingkat: ${tingkat}, Nama: ${nama}`)
    // Reset form setelah submit
    setTingkat('')
    setNama('')
    setKuota('')
    closeModal()
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
            <h4 className="modal-title">Tambah Rombel</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="tingkat">Kelompok Usia</label>
                  <select
                    className="form-control"
                    id="tingkat"
                    name="tingkat"
                    value={tingkat}
                    onChange={(e) => setTingkat(e.target.value)}
                    required
                  >
                    <option value="">Pilih Kelompok Usia</option>
                    {kelompokUsia.map((item) => (
                      <option key={item.id} value={item.tingkat}>
                        {item.tingkat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nama">Rombel</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nama"
                    name="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nama">Kuota</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nama"
                    name="nama"
                    value={kuota}
                    onChange={(e) => setKuota(e.target.value)}
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

export default DetailScoreModal
