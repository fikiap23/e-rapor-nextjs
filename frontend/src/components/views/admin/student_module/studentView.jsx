'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import TabInputSiswa from './TabInputStudent'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import { useGetAllStudentData } from '@/services/studentService/useStudent'
import Loading from '@/components/shared/Loading'

const StudentView = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('view');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredDataStudent, setFilteredDataStudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    data: listStudent,
    error: errorStudent,
    isFetching: isFetchingStudent,
    refetch: refetchStudents,
  } = useGetAllStudentData(token)

  useEffect(() => {
    if (listStudent) {
      const sortedStudents = [...listStudent].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1
        }
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1
        }
        return 0
      })
      setFilteredDataStudent(sortedStudents.filter(filterStudent))
    }
  }, [listStudent, searchKeyword, sortBy, sortOrder, refreshTable]) // Jadikan refreshTable sebagai dependensi

  const filterStudent = (student) => {
    return (
      student.nis.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      student.nisn.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      student.nama.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const deleteSiswa = (id) => {
    handleDelete()
    console.log(`Menghapus siswa dengan id ${id}`)
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
        setRefreshTable(!refreshTable) // Memperbarui state untuk memuat ulang tabel
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  const handleFilterChange = (e) => {
    setSearchKeyword(e.target.value)
    setCurrentPage(1) // Reset halaman ke halaman pertama saat pencarian diubah
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const maxPaginationData = 10;
  const indexOfLastStudent = currentPage * maxPaginationData
  const indexOfFirstStudent = indexOfLastStudent - maxPaginationData
  const currentStudents = filteredDataStudent.slice(indexOfFirstStudent, indexOfLastStudent)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className={activeTab === 'view' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('view')}>
                    Lihat Siswa
                  </Link>
                </li>
                <li className={activeTab === 'input' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('input')}>
                    Input Siswa
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === 'view' && (
                  <div className="active tab-pane" id="activity">
                    <div className="box-body table-responsive no-padding">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '30%' }}>
                          <input
                            type="text"
                            id="filter"
                            className="form-control"
                            value={searchKeyword}
                            placeholder="Masukan pencarian"
                            onChange={handleFilterChange}
                          />
                        </div>

                        <div>
                          <button className="btn btn-primary" onClick={refetchStudents}><i className="fa fa-refresh"></i></button>
                        </div>
                      </div>
                      {isFetchingStudent ? (
                        <Loading></Loading>
                      ) : (
                        <>
                          <table id="siswa" className="table table-hover">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th onClick={() => handleSort('nis')}>Nis <i className="fa fa-sort"></i></th>
                                <th onClick={() => handleSort('nisn')}>Nisn <i className="fa fa-sort"></i></th>
                                <th onClick={() => handleSort('nama')}>Nama <i className="fa fa-sort"></i></th>
                                <th>Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!isFetchingStudent &&
                                currentStudents &&
                                currentStudents.map((item, index) => (
                                  <tr key={item.id}>
                                    <td>{indexOfFirstStudent + index + 1}</td>
                                    <td>{item.nis}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.nama.toUpperCase()}</td>
                                    <td>
                                      <a className="btn btn-success btn-sm">
                                        <i className="icon fa fa-edit"></i>
                                      </a>
                                      <button
                                        style={{
                                          marginRight: '2px',
                                          marginLeft: '2px',
                                        }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteSiswa(item.id)}
                                      >
                                        <i className="icon fa fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          {/* Pagination */}
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              {[...Array(Math.ceil(filteredDataStudent.length / maxPaginationData))].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                  <Link href="" className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === 'input' && <TabInputSiswa />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentView
