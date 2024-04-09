'use client'
import { useState } from 'react'
import { Table, Button, Input, Tabs, Modal } from 'antd'
import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import TabInputSiswa from './TabInputStudent'
import TabUpdateSiswa from './TabUpdateStudent'
import { useGetAllStudentData } from '@/hooks/useStudent'
import { apiUrl } from '@/services/apiUrls'

const { TabPane } = Tabs

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
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus siswa!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await siswaService
          .delete(token, id)
          .then(() => {
            refetchStudents()
            Modal.success({
              title: 'Success',
              content: 'Data siswa telah dihapus.',
            })
          })
          .catch((error) => {
            Modal.error({
              content: error,
              title: 'Oops...',
            })
          })
      },
      onCancel: () => {
        console.log('Cancel')
      },
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
          <Button type="primary" onClick={() => handleUpdateSiswa(record)}>
            Edit
          </Button>
          <Button
            danger
            style={{ marginLeft: 8 }}
            onClick={() => handleDelete(record.id)}
          >
            Hapus
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
              <div className="box-body">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <TabPane tab="Lihat Siswa" key="view">
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
                  </TabPane>
                  <TabPane tab="Input Siswa" key="input">
                    <TabInputSiswa refetch={refetchStudents} />
                  </TabPane>
                  <TabPane tab="" key="update">
                    {selectedSiswa && (
                      <div>
                        <Button
                          onClick={() => {
                            setActiveTab('view')
                          }}
                        >
                          <i className="fa fa-arrow-left"></i> Kembali
                        </Button>
                        <TabUpdateSiswa
                          dataSiswa={selectedSiswa}
                          refetch={refetchStudents}
                        />
                      </div>
                    )}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentView
