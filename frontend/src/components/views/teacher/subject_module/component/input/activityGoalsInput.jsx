'use client'
import { useState } from 'react'

function ActivityGoalsInput() {
  const [inputs, setInputs] = useState([{ id: 0, value: '' }])

  const handleInputChange = (index, event) => {
    const values = [...inputs]
    values[index].value = event.target.value
    setInputs(values)
  }

  const handleAddInput = (index) => {
    const values = [...inputs]
    values.splice(index + 1, 0, { id: index + 1, value: '' })
    setInputs(values)
  }

  const handleRemoveInput = (index) => {
    const values = [...inputs]
    values.splice(index, 1)
    setInputs(values)
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
    <div
      className="active tab-pane"
      id="input-subject"
      style={{ padding: '20px' }}
    >
      <div className="box-body">
        <form role="form" action="/admin/siswa/create" method="POST">
          <div className="row">
            <div className="form-group" style={{ width: '20%' }}>
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

            <div className="form-group" style={{ width: '20%' }}>
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
          </div>

          {inputs.map((input, index) => (
            <div className="row" key={input.id}>
              <div className="form-group">
                <label htmlFor={`input-${input.id}`} className="control-label">
                  Tujuan Kegiatan {index + 1}
                </label>
                <div className="input-group" style={{ width: '50%' }}>
                  <input
                    type="text"
                    name={`input-${input.id}`}
                    className="form-control"
                    value={input.value}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Masukan data"
                    required
                  />
                  <div className="input-group-append">
                    <button
                      style={{
                        marginTop: '10px',
                        backgroundColor: 'green',
                        borderRadius: '10px',
                      }}
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                      onClick={() => handleAddInput(index)}
                    >
                      <i
                        style={{ color: 'white' }}
                        className="fa fa-plus"
                        aria-hidden="true"
                      ></i>
                    </button>
                    {index > 0 && (
                      <button
                        style={{
                          marginTop: '10px',
                          marginLeft: '10px',
                          backgroundColor: 'red',
                          borderRadius: '10px',
                        }}
                        className="btn btn-sm btn-outline-secondary"
                        type="button"
                        onClick={() => handleRemoveInput(index)}
                      >
                        <i
                          style={{ color: 'white' }}
                          className="fa fa-trash"
                          aria-hidden="true"
                        ></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="box-footer">
            <button type="submit" className="btn btn-primary pull-left">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActivityGoalsInput
