import React, { useState } from 'react'
import { Button, Input, Space, Table } from 'antd'
import Link from 'next/link'
import { EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { useArsipSiswasByIdSemesterGuru } from '@/hooks/useSiswaArsip'

const TableArsipSiswa = ({ idRombelSemesterGuru }) => {
  const { data: arsipSiswas, isFetching: isFetchingArsipSiswas } =
    useArsipSiswasByIdSemesterGuru(idRombelSemesterGuru)
  const [startIndex, setStartIndex] = useState(0)
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
          <Link
            href={`/assesment_analysis_print/${idRombelSemesterGuru}/${record.id}`}
            target="_blank"
          >
            <Button type="primary" icon={<EditOutlined />}>
              Cetak Analisis Nilai
            </Button>
          </Link>
          <Link href={`/raport_print/${record.rapor}`} target="_blank">
            <Button
              style={{ backgroundColor: 'green', color: 'white' }}
              icon={<PrinterOutlined />}
            >
              Cetak Raport
            </Button>
          </Link>
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
            {arsipSiswas?.namaRombel}
          </h4>
          <p>{`Tahun Ajaran ${arsipSiswas?.semester}`}</p>
        </div>
        <div style={{ width: '30%' }}>
          <Input.Search
            placeholder="Cari data..."
            style={{ marginBottom: 16 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={arsipSiswas?.murids}
          loading={isFetchingArsipSiswas}
          pagination={{
            onChange: handlePaginationChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} dari ${total} data`,
          }}
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  )
}

export default TableArsipSiswa
