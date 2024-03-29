'use client'
import React, { useState } from 'react'

const AbsenceView = () => {
  const [data, setData] = useState([
    { id: 1, no: 1, nama: 'Siswa 1', s: 0, i: 0, a: 0, isChecked: false },
    { id: 2, no: 2, nama: 'Siswa 2', s: 0, i: 0, a: 0, isChecked: false },
    // Tambahkan data dummy lainnya sesuai kebutuhan
  ])

  const handleCheckboxChange = (index) => {
    const newData = [...data]
    newData[index].isChecked = !newData[index].isChecked
    setData(newData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const selectedData = data.filter((item) => item.isChecked)
    console.log(selectedData)
    // Tambahkan logika untuk mengirim data absen ke API
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-calendar"></i> Input Absen
                </h3>
              </div>
              <div className="box-body">
                <form onSubmit={handleSubmit}>
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Simpan"
                    />
                  </div>
                  <table className="table table-bordered table-striped mailbox-messages">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={() => {
                              const newData = [...data]
                              newData.forEach(
                                (item) => (item.isChecked = !item.isChecked)
                              )
                              setData(newData)
                            }}
                            checked={data.every((item) => item.isChecked)}
                          />
                        </th>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Sakit</th>
                        <th>Izin</th>
                        <th>Tanpa Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(index)}
                              checked={item.isChecked}
                            />
                          </td>
                          <td>{item.no}</td>
                          <td>{item.nama}</td>
                          <td>
                            <input
                              type="number"
                              min={0}
                              value={item.s}
                              onChange={(e) => {
                                const newData = [...data]
                                newData[index].s = e.target.value
                                setData(newData)
                              }}
                              disabled={!item.isChecked}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.i}
                              min={0}
                              onChange={(e) => {
                                const newData = [...data]
                                newData[index].i = e.target.value
                                setData(newData)
                              }}
                              disabled={!item.isChecked}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.a}
                              min={0}
                              onChange={(e) => {
                                const newData = [...data]
                                newData[index].a = e.target.value
                                setData(newData)
                              }}
                              disabled={!item.isChecked}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AbsenceView
