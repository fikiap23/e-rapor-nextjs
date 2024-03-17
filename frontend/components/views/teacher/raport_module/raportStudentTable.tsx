// components/RaportTable.js
'use client'
import React, { useState } from 'react'

const RaportStudentTable = () => {
  const [selectedTahun, setSelectedTahun] = useState(2022)
  const [selectedRombel, setSelectedRombel] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const kelompok_siswa = [
    {
      SiswaId: 1,
      TahunId: 2022,
      Siswa: {
        nis: '123',
        nama: 'John Doe',
      },
      rombel: 'XII A',
    },
    {
      SiswaId: 2,
      TahunId: 2022,
      Siswa: {
        nis: '456',
        nama: 'Jane Doe',
      },
      rombel: 'XII B',
    },
    {
      SiswaId: 3,
      TahunId: 2022,
      Siswa: {
        nis: '789',
        nama: 'Alice Smith',
      },
      rombel: 'XII C',
    },
  ]

  const filteredSiswa = kelompok_siswa.filter(
    (item) =>
      item.TahunId === selectedTahun &&
      (selectedRombel === '' || item.rombel === selectedRombel) &&
      (searchTerm === '' ||
        item.Siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div>
        <select
          value={selectedTahun}
          onChange={(e) => setSelectedTahun(e.target.value)}
        >
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
        <select
          value={selectedRombel}
          onChange={(e) => setSelectedRombel(e.target.value)}
        >
          <option value="">Pilih Rombel</option>
          <option value="XII A">XII A</option>
          <option value="XII B">XII B</option>
          <option value="XII C">XII C</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-bordered table-striped" id="raport">
        <thead>
          <tr>
            <th>No</th>
            <th>NIS</th>
            <th>Nama</th>
            <th>Rombel</th>
            <th>Cetak</th>
          </tr>
        </thead>
        <tbody>
          {filteredSiswa.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.Siswa.nis}</td>
              <td>{item.Siswa.nama}</td>
              <td>{item.rombel}</td>
              <td>
                <a href={''} className="btn btn-success btn-sm" target="_blank">
                  <i className="fa fa-print"></i> Cetak Rapor
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RaportStudentTable
