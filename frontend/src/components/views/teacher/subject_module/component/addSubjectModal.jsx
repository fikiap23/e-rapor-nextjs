import React, { useState } from 'react'

const AddModal = ({ isOpen, closeModal }) => {
  const [topic, setTopic] = useState('')
  const [sub, setSub] = useState('')
  const [keyword, setKeyword] = useState('')

  const handletopicChange = (event) => {
    setTopic(event.target.value)
  }

  const handlesubChange = (event) => {
    setSub(event.target.value)
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Lakukan sesuatu dengan data yang disimpan
    // ...
    // Setelah itu, reset nilai input
    setTopic('')
    setSub('')
    // Tutup modal
    closeModal()
  }

  const [minggu, setMinggu] = useState('')

  const handleMingguChange = (event) => {
    setMinggu(event.target.value)
  }

  const [date, setDate] = useState('')

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  return (
    <div className={`modal fade  ${isOpen ? 'in show-modal' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Modul Ajar</h4>
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="minggu">Minggu</label>
                  <select
                    className="form-control"
                    id="minggu"
                    name="minggu"
                    value={minggu}
                    onChange={handleMingguChange}
                    required
                  >
                    <option value="">Pilih Minggu</option>
                    {[...Array(14)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ width: '30%' }}>
                  <label htmlFor="date">Tanggal</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Topik</label>
                  <input
                    type="text"
                    className="form-control"
                    id="topic"
                    name="topic"
                    placeholder="Masukan Topik"
                    value={topic}
                    onChange={handletopicChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sub">Sub Topik</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sub"
                    name="sub"
                    placeholder="Masukan Sub Topik"
                    value={sub}
                    onChange={handlesubChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="keyword">Kata Kunci</label>
                  <input
                    type="text"
                    className="form-control"
                    id="keyword"
                    name="keyword"
                    placeholder="Masukan Kata Kunci"
                    value={keyword}
                    onChange={handleKeywordChange}
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

export default AddModal
