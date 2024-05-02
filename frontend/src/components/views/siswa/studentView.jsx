'use client'
import { useState } from 'react'
import { Table, Button, Input, Tabs, Modal, Flex, Space, Tag } from 'antd'
import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import TabInputSiswa from './TabInputStudent'
import TabUpdateSiswa from './TabUpdateStudent'
import { useGetAllStudentData } from '@/hooks/useStudent'
import { apiUrl } from '@/services/apiUrls'
import * as XLSX from 'xlsx'
import { formatDate } from '@/lib/helperDate'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'
import UploadSiswaExcel from './cetak/importSiswaView'

const { TabPane } = Tabs

const StudentView = () => {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState('view')
  const [searchText, setSearchText] = useState('')
  const [selectedSiswa, setSelectedSiswa] = useState(null)
  const [startIndex, setStartIndex] = useState(0)
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

  const handleBack = () => {
    setActiveTab('view')
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

  const handleStatusChange = (siswa) => {
    const statusAkun = siswa.status === 'AKTIF' ? 'TIDAK_AKTIF' : 'AKTIF'
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: `Anda akan ${
        statusAkun === 'AKTIF' ? 'mengaktifkan' : 'mengnonaktifkan'
      } akun siswa!`,
      okText: `Ya, ${statusAkun === 'AKTIF' ? 'aktifkan' : 'nonaktifkan'}!`,
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await siswaService
          .update(token, siswa.id, { status: statusAkun })
          .then(() => {
            refetchStudents()
            Modal.success({
              title: 'Success',
              content: `Data siswa telah di${
                statusAkun === 'AKTIF' ? 'aktifkan' : 'nonaktifkan'
              }.`,
            })
          })
          .catch((error) => {
            Modal.error({
              content: error,
              title: 'Oops...',
            })
          })
      },
    })
  }

  const exportToExcel = () => {
    const dataToExport = filteredSiswa.map((siswa) => {
      return {
        NIS: siswa.nis,
        Nama: siswa.nama,
        'Anak Ke': siswa.anakKe,
        'Jenis Kelamin': siswa.jenisKelamin,
        'Tempat Lahir': siswa.tempatLahir,
        'Tanggal Lahir': formatDate(new Date(siswa.tanggalLahir)),
        Agama: siswa.agama,
        'Tinggi Badan': siswa.tinggiBadan,
        'Berat Badan': siswa.beratBadan,
        Lingkar: siswa.lingkar,
        'Nama Ayah': siswa.namaAyah,
        'Nama Ibu': siswa.namaIbu,
        'Pekerjaan Ayah': siswa.pekerjaanAyah,
        'Pekerjaan Ibu': siswa.pekerjaanIbu,
        'Tanggal Masuk': formatDate(new Date(siswa.tanggalMasuk)),
        Jalan: siswa.jalan,
        Kelurahan: siswa.kelurahan,
        Kecamatan: siswa.kecamatan,
        Kota: siswa.kota,
        Provinsi: siswa.provinsi,
        Status: siswa.status,
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Siswa')
    XLSX.writeFile(workbook, 'data_siswa.xlsx')
  }

  // Handle pagination change
  const handlePaginationChange = (page, pageSize) => {
    setStartIndex(pageSize * (page - 1))
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <span>{startIndex + index + 1}</span>,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
      sorter: (a, b) => a.nis.localeCompare(b.nis),
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
    {
      title: 'Jenis Kelamin',
      dataIndex: 'jenisKelamin',
      key: 'jenisKelamin',
      sorter: (a, b) => a.jenisKelamin.localeCompare(b.jenisKelamin),
      render: (text) => <span>{text === 'L' ? 'Laki-laki' : 'Perempuan'}</span>,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'AKTIF', value: 'AKTIF' },
        { text: 'TIDAK AKTIF', value: 'TIDAK_AKTIF' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => (
        <Tag color={text === 'AKTIF' ? 'green' : 'red'}>
          {' '}
          {text === 'AKTIF' ? 'AKTIF' : 'TIDAK AKTIF'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button
            icon={<icons.EditOutlined />}
            type="primary"
            onClick={() => handleUpdateSiswa(record)}
          >
            Edit
          </Button>
          <Button
            icon={<icons.UserOutlined />}
            onClick={() => handleStatusChange(record)}
          >
            {record.status === 'AKTIF' ? 'Nonaktifkan' : 'Aktifkan'}
          </Button>
          <Button
            icon={<icons.DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Hapus
          </Button>
        </Space>
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
                      <Flex
                        style={{
                          marginBottom: 10,
                          marginRight: 10,
                          marginLeft: 10,
                          justifyContent: 'space-between',
                        }}
                      >
                        <Input.Search
                          placeholder="Cari siswa..."
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          style={{ width: 200, marginRight: 10 }}
                        />
                        <Space size="middle">
                          <Button
                            onClick={setActiveTab.bind(this, 'import')}
                            icon={<icons.UploadOutlined />}
                            type="primary"
                          >
                            Import from Excel
                          </Button>

                          <Button
                            onClick={exportToExcel}
                            icon={
                              <Icon component={icons['FileExcelOutlined']} />
                            }
                            style={{ backgroundColor: 'green', color: 'white' }}
                          >
                            Export to Excel
                          </Button>
                        </Space>
                      </Flex>
                      <Table
                        columns={columns}
                        dataSource={filteredSiswa}
                        loading={isFetchingStudent}
                        pagination={{
                          onChange: handlePaginationChange,
                          showTotal: (total, range) =>
                            `${range[0]}-${range[1]} dari ${total} anak`,
                        }}
                        scroll={{ x: 1000 }}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Input Siswa" key="input">
                    <div style={{ padding: '0 20px' }}>
                      <TabInputSiswa refetch={refetchStudents} />
                    </div>
                  </TabPane>
                  <TabPane tab="" key="update">
                    {selectedSiswa && (
                      <div style={{ padding: '0 20px' }}>
                        <Button
                          onClick={() => setActiveTab('view')}
                          icon={<i className="fa fa-arrow-left"></i>}
                        >
                          Kembali
                        </Button>
                        <TabUpdateSiswa
                          btnBack={handleBack}
                          dataSiswa={selectedSiswa}
                          refetch={refetchStudents}
                        />
                      </div>
                    )}
                  </TabPane>
                  <TabPane tab="" key="import">
                    <UploadSiswaExcel token={token} refetch={refetchStudents} />
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
