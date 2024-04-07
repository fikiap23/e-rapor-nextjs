'use client'
import { useState } from 'react'
import AddSemesterModal from './addSemesterModal'
import EditSemesterModal from './editSemesterModal'
import useAuth from '@/hooks/useAuth'
import { formatDate } from '@/lib/helperDate'
import semesterService from '@/services/semester.service'
import Swal from 'sweetalert2'
import { useGetAllSemesterData } from '@/hooks/useSemester'
import { Table, Button, Tag, Space, Input } from 'antd'
const SemesterView = () => {
  const { token } = useAuth()
  const [selectedSemester, setSelectedSemester] = useState({})
  const {
    data: listSemester,
    error: errorSemester,
    isFetching: isFetchingSemester,
    refetch: refetchSemester,
  } = useGetAllSemesterData(token)

  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const filteredSemesters = listSemester.filter((semester) =>
    Object.values(semester).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  const openModalAdd = () => {
    setIsOpenAddModal(true)
  }

  const openModalEdit = (semester) => {
    setSelectedSemester(semester)
    setIsOpenEditModal(true)
  }

  const closeModalAdd = () => {
    setIsOpenAddModal(false)
  }

  const closeModalEdit = () => {
    setIsOpenEditModal(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus semester!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await semesterService.delete(token, id)
        refetchSemester()
        Swal.fire('Data Dihapus!', 'Semester telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Dibatalkan',
          'Tidak ada perubahan pada data semester.',
          'error'
        )
      }
    })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tahun',
      dataIndex: ['tahunAjaranAwal', 'tahunAjaranAkhir'],
      key: 'tahun',
      render: (text, record) =>
        `${record.tahunAjaranAwal}-${record.tahunAjaranAkhir}`,
      sorter: (a, b) => a.tahunAjaranAwal - b.tahunAjaranAwal,
    },
    {
      title: 'Kepala Sekolah',
      dataIndex: 'namaKepsek',
      key: 'namaKepsek',
      sorter: (a, b) => a.namaKepsek.localeCompare(b.namaKepsek),
    },
    {
      title: 'NIP',
      dataIndex: 'nipKepsek',
      key: 'nipKepsek',
      sorter: (a, b) => a.nipKepsek.localeCompare(b.nipKepsek),
    },
    {
      title: 'Tgl Raport',
      dataIndex: 'tglBagiRapor',
      key: 'tglBagiRapor',
      render: (text, record) => formatDate(new Date(record.tglBagiRapor)),
      sorter: (a, b) => new Date(a.tglBagiRapor) - new Date(b.tglBagiRapor),
    },
    {
      title: 'Semester',
      dataIndex: 'jenisSemester',
      key: 'jenisSemester',
      sorter: (a, b) => a.jenisSemester.localeCompare(b.jenisSemester),
    },
    {
      title: 'Status',
      dataIndex: 'isAktif',
      key: 'status',
      filters: [
        { text: 'Aktif', value: true },
        { text: 'Nonaktif', value: false },
      ],
      onFilter: (value, record) => record.isAktif === value,
      render: (text, record) => (
        <Tag color={record.isAktif ? 'green' : 'red'}>
          {record.isAktif ? 'Aktif' : 'Nonaktif'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => openModalEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Hapus
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-calendar"></i> Data Semester
                  </h3>
                </div>

                <div className="box-body">
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={openModalAdd}
                    >
                      <i className="icon fa fa-plus"></i> Tambah
                    </button>
                  </div>
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <Input
                      placeholder="Cari semester..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      style={{ width: 200, marginRight: 10 }}
                    />
                  </div>

                  <Table
                    bordered
                    scroll={{ x: 1000 }}
                    columns={columns}
                    dataSource={filteredSemesters}
                    loading={isFetchingSemester}
                    pagination={{ pageSize: 10 }}
                    rowKey="id"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddSemesterModal
        token={token}
        isOpen={isOpenAddModal}
        closeModal={closeModalAdd}
        refetch={refetchSemester}
      />
      <EditSemesterModal
        isOpen={isOpenEditModal}
        closeModal={closeModalEdit}
        semesterData={selectedSemester}
        refetch={refetchSemester}
        token={token}
      />
    </>
  )
}
export default SemesterView
