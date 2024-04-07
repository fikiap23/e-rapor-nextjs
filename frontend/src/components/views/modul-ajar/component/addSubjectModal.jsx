import React, { useState } from 'react'

const AddModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    minggu: '',
    tanggal: '',
    hari: '',
    kegiatanInti: '',
    idModulAjar: '',
  })
  const handleSubmit = (event) => {
    console.log(formData)

    // closeModal()
  }

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div
      className={`modal fade ${isOpen ? 'in show-modal' : ''}`}
      style={{ overflowY: 'auto' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Jadwal Ajar</h4>
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="box-body">
              <div className="form-group">
                <label htmlFor="idModulAjar">Modul Ajar</label>
                <select
                  className="form-control"
                  id="idModulAjar"
                  name="idModulAjar"
                  value={formData.idModulAjar}
                  onChange={(e) =>
                    handleFormChange('idModulAjar', e.target.value)
                  }
                  required
                >
                  <option value="">Pilih Modul Ajar</option>
                  {[...Array(14)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="hari">Hari</label>
                <select
                  className="form-control"
                  id="hari"
                  name="hari"
                  value={formData.hari}
                  onChange={(e) => handleFormChange('hari', e.target.value)}
                  required
                >
                  <option value="">Pilih Hari</option>
                  {['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'].map(
                    (item, index) => (
                      <option key={index + 1} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="form-group" style={{ width: '30%' }}>
                <label htmlFor="tanggal">Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={(e) => handleFormChange('tanggal', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Kegiatan Inti</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="kegiatanInti"
                  placeholder="Masukkan Capaian"
                  required
                  value={formData.kegiatanInti}
                  onChange={(e) =>
                    handleFormChange('kegiatanInti', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleSubmit} className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddModal
