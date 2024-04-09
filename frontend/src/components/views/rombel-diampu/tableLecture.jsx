'use client'
import { Button, Table, Tag, Modal, Input } from 'antd'

const TableLecture = ({ rombels, fetching }) => {
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
        <span>
          <Button
            type="primary"
            onClick={() => {
              const url = `/guru/rombel/${record.id}`;
              window.location.href = url;
            }}
            style={{ marginRight: 8 }}
          >
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i> Input Catatan Raport
          </Button>
        </span>
      ),
    },
  ]
  return (
    <Table
      columns={columns}
      dataSource={rombels}
      loading={fetching}
      scroll={{ x: 1000 }}
    />
  )
}

export default TableLecture
