// components/addGuru.js
import React from 'react'

const AddGuruToRombelModal = ({ isOpen, closeModal }) => {
  // Data dummy untuk guru dan kelas
  const guru = [
    { id: 1, nama: 'Guru A' },
    { id: 2, nama: 'Guru B' },
    { id: 3, nama: 'Guru C' },
  ]

  const kelas = [
    { id: 1, nama: 'Rombel A' },
    { id: 2, nama: 'Rombel B' },
    { id: 3, nama: 'Rombel C' },
  ]
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
          <form role="form" action="/admin/set-wali-kelas" method="POST">
            <div className="modal-body">
              <div className="form-group">
                <label>Pilih Rombel</label>
                <select required name="KelasId" className="form-control">
                  <option value="" className="bg-blue"></option>
                  {kelas.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Pilih Guru</label>
                <select required name="GuruId" className="form-control">
                  <option value="" className="bg-blue"></option>
                  {guru.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
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
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  )
}

export default AddGuruToRombelModal
