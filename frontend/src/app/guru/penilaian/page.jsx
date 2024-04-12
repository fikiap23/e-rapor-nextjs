'use client'
import useAuth from '@/hooks/useAuth'
import { useRombelDiampu } from '@/hooks/useRombelDiampu'
import { Button, Table, Tag } from 'antd'
import Link from 'next/link'

const RombelDiampuView = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error,
    isFetching,
    refetch,
  } = useRombelDiampu(token)

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
      // sorter: (a, b) => a.nip.localeCompare(b.nip),
    },
    {
      title: 'Rombel',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.nama.localeCompare(b.nama),
    },
    {
      title: 'Tahun Ajaran',
      dataIndex: 'semester',
      key: 'semester',
      // sorter: (a, b) => a.nama.localeCompare(b.nama),
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
        <Link href={`/guru/penilaian/${record.id}`}>
          <Button type="primary" style={{ marginRight: 8 }}>
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i> Input
            Penilaian Mingguan
          </Button>
        </Link>
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
                    <i className="fa fa-book"></i> Input Modul Ajar
                  </h3>
                </div>
                <div className="box-body">
                  <Table
                    columns={columns}
                    dataSource={listRombel}
                    loading={isFetching}
                    scroll={{ x: 1000 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default RombelDiampuView
