import React, { useState } from 'react'
import { Button, Table, Space, Input } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useGetAllRombelWithGuru } from '@/hooks/useRombelGuru'

const TableSemesterGuruRombel = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error: errorRombel,
    isFetching: isFetchingRombel,
    refetch: refetchRombel,
  } = useGetAllRombelWithGuru(token)

  const [searchText, setSearchText] = useState('')
  const filteredRombels = listRombel.filter((rombel) => {
    const rombelValues = Object.values(rombel)
    const guruValues = rombel?.guru ? Object.values(rombel.guru) : []

    return (
      rombelValues.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      guruValues.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchText.toLowerCase())
      )
    )
  })

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Rombel',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'NIP Guru',
      dataIndex: ['guru', 'nip'],
      key: 'nip',
      sorter: (a, b) => {
        const nipA = a.guru?.nip || ''
        const nipB = b.guru?.nip || ''
        return nipA.localeCompare(nipB)
      },
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Nama Guru',
      dataIndex: ['guru', 'nama'],
      key: 'nama',
      sorter: (a, b) => {
        const nameA = a.guru?.nama || ''
        const nameB = b.guru?.nama || ''
        return nameA.localeCompare(nameB)
      },
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      sorter: (a, b) => {
        const semesterA = a.semester || ''
        const semesterB = b.semester || ''
        return semesterA.localeCompare(semesterB)
      },
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<i className="fa fa-eye"></i>}>
            Lihat Penilaian
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div style={{ margin: '0 20px 20px 0px', width: '50%' }}>
        <Input.Search
          placeholder="Cari Data..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table
        scroll={{ x: 1000 }}
        dataSource={filteredRombels}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={isFetchingRombel}
      />
    </>
  )
}

export default TableSemesterGuruRombel
