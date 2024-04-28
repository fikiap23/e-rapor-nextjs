import React from 'react'
import { Button, Input, Space, Table, Tag } from 'antd'
import Link from 'next/link'
import { EditOutlined, PrinterOutlined } from '@ant-design/icons'

const TableArsipSiswa = () => {
  const rombel = 'A1'
  const semester = '2022/2023'
  const murid = [
    {
      index: 1,
      nis: '12345',
      nama: 'John Doe',
      penilaianMingguan: true,
      rapor: [{ isValidated: false, id: 1 }],
    },
    {
      index: 2,
      nis: '54321',
      nama: 'Jane Doe',
      penilaianMingguan: false,
      rapor: [],
    },
  ]

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
    },
    {
      title: 'Nama Siswa',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}>
            Cetak Analisis Nilai
          </Button>
          <Button
            style={{ backgroundColor: 'green', color: 'white' }}
            icon={<PrinterOutlined />}
          >
            Cetak Raport
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="box-body table-responsive no-padding">
        <div className="callout callout-primary">
          <Link href="/admin/arsip">
            <button
              className="btn btn-default"
              style={{ marginBottom: '2%', marginTop: '1%' }}
            >
              <i className="fa fa-arrow-left"></i> Kembali
            </button>
          </Link>
          <h4>
            <i className="icon fa fa-info-circle"></i> Data Penilaian Rombel{' '}
            {rombel}
          </h4>
          <p>{`Tahun Ajaran ${semester}`}</p>
        </div>
        <div style={{ width: '30%' }}>
          <Input.Search
            placeholder="Cari data..."
            style={{ marginBottom: 16 }}
          />
        </div>

        <Table columns={columns} dataSource={murid} />
      </div>
    </>
  )
}

export default TableArsipSiswa
