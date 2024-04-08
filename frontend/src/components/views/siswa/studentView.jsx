'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Table, Button, Input } from 'antd'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import TabInputSiswa from './TabInputStudent'
import TabUpdateSiswa from './TabUpdateStudent'
import { useGetAllStudentData } from '@/hooks/useStudent'
import { apiUrl } from '@/services/apiUrls'

const StudentView = () => {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState('view')
  const [searchText, setSearchText] = useState('')
  const [selectedSiswa, setSelectedSiswa] = useState(null)
  const {
    data: listStudent,
    error: errorStudent,
    isFetching: isFetchingStudent,
    refetch: refetchStudents,
  } = useGetAllStudentData(token)
  const filteredSiswa = listStudent.filter((siswa) =>
    Object.values(siswa).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleUpdateSiswa = (siswa) => {
    setSelectedSiswa(siswa)
    setActiveTab('update')
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await siswaService.delete(token, id)
        refetchStudents()
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
      sorter: (a, b) => a.nis.localeCompare(b.nis),
    },
    {
      title: 'NISN',
      dataIndex: 'nisn',
      key: 'nisn',
      sorter: (a, b) => a.nisn.localeCompare(b.nisn),
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (text) => (
        <img
          src={text ? `${apiUrl}/${text}` : '/images/students.png'}
          alt={text}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            className="btn btn-success btn-sm"
            onClick={() => handleUpdateSiswa(record)}
          >
            <i className="icon fa fa-edit"></i>
          </Button>
          <Button
            style={{
              marginRight: '2px',
              marginLeft: '2px',
            }}
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(record.id)}
          >
            <i className="icon fa fa-trash"></i>
          </Button>
        </span>
      ),
    },
  ]

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-user"></i>{' '}
                  <span style={{ marginLeft: '10px' }}> Data Siswa </span>
                </h3>
              </div>
              <div className="nav-tabs-pills">
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
                  {activeTab === 'update' && (
                    <li className={activeTab === 'update' ? 'active' : ''}>
                      <Link href="" onClick={() => handleTabChange('update')}>
                        Edit Siswa
                      </Link>
                    </li>
                  )}
                </ul>
                <div className="tab-content">
                  {activeTab === 'view' && (
                    <div className="active tab-pane" id="activity">
                      <div className="box-body table-responsive no-padding">
                        <div style={{ margin: '0 20px 20px 20px' }}>
                          <Input
                            placeholder="Cari siswa..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 200, marginRight: 10 }}
                          />
                        </div>
                        <Table
                          columns={columns}
                          dataSource={filteredSiswa}
                          loading={isFetchingStudent}
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === 'input' && <TabInputSiswa />}
                  {activeTab === 'update' && selectedSiswa && (
                    <div>
                      <button
                        className="btn btn-default"
                        onClick={() => {
                          window.history.back()
                          handleTabChange('view')
                        }}
                      >
                        <i className="fa fa-arrow-left"></i> Kembali
                      </button>
                      <TabUpdateSiswa dataSiswa={selectedSiswa} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentView
