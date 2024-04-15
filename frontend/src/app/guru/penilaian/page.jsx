'use client'
import useAuth from '@/hooks/useAuth'
import { useRombelDiampu } from '@/hooks/useRombelDiampu'
import { Button, Input, Space, Table, Tag } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

const RombelDiampuPage = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error,
    isFetching,
    refetch,
  } = useRombelDiampu(token)

  const [searchKeyword, setSearchKeyword] = useState('')

  const filteredRombel = listRombel.filter((rombel) =>
    Object.values(rombel).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  )

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
        <div>
          <Link href={`/guru/penilaian/${record.id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>
              <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>{' '}
              Input Penilaian Mingguan
            </Button>
          </Link>
          <Link href={`/guru/penilaian/analisis/${record.id}`}>
            <Button
              style={{
                marginRight: 8,
                backgroundColor: 'green',
                color: 'white',
              }}
              icon={<i className="fa fa-bar-chart"></i>}
            >
              Analisis Penilaian
            </Button>
          </Link>
        </div>
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
                    <i className="fa fa-book"></i> Input Penilaian Mingguan
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
                      dataSource={filteredRombel}
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

export default RombelDiampuPage
