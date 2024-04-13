'use client'
import React, { useState } from 'react'
import { useRombelWithSemester } from '@/hooks/useRombelWithSemester'
import { Table, Button, Input } from 'antd'
import { useSiswasByIdSemesterGuru } from '@/hooks/useSiswasByIdRombelSemesterGuru'
import { apiUrl } from '@/services/apiUrls'

const AnalisisPenilaianView = ({ idRombelSemesterGuru }) => {
  const { data: rombelWithSemester, isFetching: isFetchingRombelWithSemester } =
    useRombelWithSemester(idRombelSemesterGuru)

  const { data: siswas, isFetching: isFetchingSiswas } =
    useSiswasByIdSemesterGuru(idRombelSemesterGuru)

  const [searchText, setSearchText] = useState('')
  const filteredSiswa = siswas.filter((siswa) =>
    Object.values(siswa).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
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
      title: 'Aksi',
      key: 'aksi',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handlePrint(record)}
          icon={<i className="fa fa-print"></i>}
        >
          Cetak Analisis
        </Button>
      ),
    },
  ]

  const handlePrint = (record) => {
    // Implementasi logika untuk mencetak analisis
    console.log('Mencetak analisis untuk:', record)
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
                    <i className="fa fa-calendar"></i> Analisis Penilaian
                    Mingguan
                  </h3>
                  <div style={{ float: 'right' }}>
                    <b>Rombel: </b>
                    {rombelWithSemester?.rombel} | <b>Semester: </b>{' '}
                    {rombelWithSemester?.semester}
                  </div>
                </div>

                <div className="box-body">
                  <Input
                    placeholder="Cari siswa..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 200, margin: '10px' }}
                  />
                  <Table
                    dataSource={filteredSiswa}
                    columns={columns}
                    loading={isFetchingSiswas}
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

export default AnalisisPenilaianView
