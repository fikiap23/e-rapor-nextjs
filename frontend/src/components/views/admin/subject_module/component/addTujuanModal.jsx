import React, { useState } from 'react'

const AddTujuanModal = ({ isOpen, closeModal }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault()
    // Tambahkan logika untuk menyimpan data tujuan pembelajaran
    console.log(formData)
    // Reset form setelah submit
    setFormData({
      minggu: '',
      tujuanPembelajaranJatiDiri: '',
      tujuanPembelajaranLiterasiSains: '',
      tujuanPembelajaranAgamaBudipekerti: '',
    })
    closeModal()
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
