'use client'
import React, { useEffect, useState } from 'react'

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

  const [riwayat, setRiwayat] = useState(kelompok_siswa);
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);

  useEffect(() => {
    setIndexOfFirstItem((currentPage - 1) * itemsPerPage);
  }, [currentPage]);

  const handleSort = (key: any) => {
    const sortedRiwayat = [...riwayat].sort((a, b) => {
      const valueA = a[key].nama.toUpperCase();
      const valueB = b[key].nama.toUpperCase();
      return sortAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
    setRiwayat(sortedRiwayat);
    setSortAscending(!sortAscending);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 10;
  const filteredRiwayat = riwayat.filter(data =>
    data.Siswa.nama.toLowerCase().includes(filter.toLowerCase()) ||
    data.Siswa.nis.toLowerCase().includes(filter.toLowerCase()) ||
    data.rombel.toLowerCase().includes(filter.toLowerCase())
    // data.MataPelajaran.nama.toLowerCase().includes(filter.toLowerCase()) ||
    // data.Kelas.nama.toLowerCase().includes(filter.toLowerCase())
  );

  const currentRiwayat = filteredRiwayat.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <div className="form-group" style={{ width: '30%' }}>
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
        </div>
        <div className="form-group" style={{ width: '30%' }}>
          {/* <label htmlFor="filter">Cari:</label> */}
          <input
            type="text"
            id="filter"
            className="form-control"
            value={filter}
            placeholder='Masukan pencarian'
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <table className="table table-bordered table-striped" id="raport">
        <thead>
          <tr>
            <th>No</th>
            {/* <th onClick={() => handleSort('SiswaId')}>No <i className="fa fa-sort"></i></th> */}
            <th onClick={() => handleSort('Siswa')}>Nis <i className="fa fa-sort"></i></th>
            <th onClick={() => handleSort('Siswa')}>Nama <i className="fa fa-sort"></i></th>
            {/* <th onClick={() => handleSort('rombel')}>Rombel <i className="fa fa-sort"></i></th> */}
            <th>Rombel</th>
            <th>Cetak</th>
          </tr>
        </thead>
        <tbody>
          {currentRiwayat.map((item, index) => (
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
