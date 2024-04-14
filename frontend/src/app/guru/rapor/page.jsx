'use client'
import useAuth from '@/hooks/useAuth'
import { useRombelDiampu } from '@/hooks/useRombelDiampu'
import { Button, Input, Space, Table, Tag } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

const LectureView = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error,
    isFetching,
    refetch,
  } = useRombelDiampu(token)

  const [searchKeyword, setSearchKeyword] = useState('')

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'Kelompok Usia',
      dataIndex: 'kelompokUsia',
      key: 'kelompokUsia',
      filteredValue: [searchKeyword],
      onFilter: (value, record) => {
        return String(record.semester)
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      sorter: (a, b) => a.kelompokUsia.localeCompare(b.kelompokUsia),
    },
    {
      title: 'Rombel',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Tahun Ajaran',
      dataIndex: 'semester',
      key: 'semester',
      sorter: (a, b) => a.semester.localeCompare(b.semester),
    },
    {
      title: 'Status',
      dataIndex: 'statusSemester',
      key: 'statusSemester',
      render: (text, record) => (
        <Tag color={record.statusSemester ? 'green' : 'yellow'}>
          {record.statusSemester ? 'Aktif' : 'Tidak Aktif'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Link href={`/guru/rapor/${record.id}`}>
            <Button type="primary">
              <i className="fa fa-eye" style={{ marginRight: '8px' }}></i> Input
              Nilai Raport
            </Button>
          </Link>
        </Space>
      ),
    },
  ]

  const handleSearch = (value) => {
    setSearchKeyword(value)
  }

  const handleChangeSearch = (e) => {
    setSearchKeyword(e.target.value)
  }
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-book"></i> Input Nilai Raport
                  </h3>
                </div>
                <div className="box-body">
                  <>
                    <div style={{ width: '30%' }}>
                      <Input.Search
                        placeholder="Cari data..."
                        onSearch={handleSearch}
                        onChange={handleChangeSearch}
                        style={{ marginBottom: 16 }}
                      />
                    </div>

                    <Table
                      columns={columns}
                      dataSource={listRombel}
                      loading={isFetching}
                      scroll={{ x: 1000 }}
                    />
                  </>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default LectureView
