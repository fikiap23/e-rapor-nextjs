'use client'
import { Button, Input, Table, Tooltip } from 'antd'
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import rombelService from '@/services/rombel.service'
import useAuth from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import UpdateClassModal from './modal/updateClassModal'
import Link from 'next/link'

export default function TabTableClass({
  rombels,
  openModal,
  setRombels,
  isLoading,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRombel, setSelectedRombel] = useState(null)
  const { token } = useAuth()
  const [searchText, setSearchText] = useState('')

  const filteredRombels = rombels.filter((rombel) =>
    Object.values(rombel).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  const handleDelete = (idRombel) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data rombel akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        rombelService
          .deleteRombel(token, idRombel)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Data rombel telah dihapus',
              position: 'bottom-center',
            })
            setRombels((prevRombels) =>
              prevRombels.filter((rombel) => rombel.id !== idRombel)
            )
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
              position: 'bottom-center',
            })
          })
      }
    })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Kelompok Usia',
      dataIndex: 'kelompokUsia',
      key: 'kelompokUsia',
      sorter: (a, b) => a.kelompokUsia.localeCompare(b.kelompokUsia),
    },
    {
      title: 'Rombel',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Kuota',
      dataIndex: 'kuota',
      key: 'kuota',
      sorter: (a, b) => a.kuota - b.kuota,
      render: (text, record) => `${record.coutMurid}/${record.kuota}`,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <span style={{ display: 'flex', gap: '5px' }}>
          <Tooltip title="Lihat">
            <Link href={`/admin/rombel/read_student/${record.id}`}>
              <Button type="primary" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedRombel(record)
                setIsModalOpen(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Tambah Siswa">
            <Link href={`/admin/rombel/add_student/${record.id}`}>
              <Button type="primary" icon={<PlusOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Hapus">
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </span>
      ),
    },
  ]

  return (
    <div className="box-body">
      <div style={{ margin: '0 20px 20px 20px' }}>
        <button type="button" className="btn btn-success" onClick={openModal}>
          <i className="icon fa fa-plus"></i> Tambah
        </button>
      </div>
      <div style={{ margin: '0 20px 20px 20px' }}>
        <Input
          placeholder="Cari rombel..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
      </div>
      <Table
        dataSource={filteredRombels}
        columns={columns}
        rowKey="id"
        bordered
        scroll={{ x: 1000 }}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <UpdateClassModal
        setRombels={setRombels}
        selectedRombel={selectedRombel}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  )
}
