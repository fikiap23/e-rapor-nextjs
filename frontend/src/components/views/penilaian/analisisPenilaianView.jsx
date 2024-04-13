import React from 'react'
import { useRombelWithSemester } from '@/hooks/useRombelWithSemester'
import { Table, Button, Avatar } from 'antd'

const AnalisisPenilaianView = ({ idRombelSemesterGuru }) => {
  const { data: rombelWithSemester, isFetching: isFetchingRombelWithSemester } =
    useRombelWithSemester(idRombelSemesterGuru)

  const dataSource = [
    {
      id: '1',
      nama: 'Salsa Sabila',
      nis: '12345',
      foto: 'https://example.com/salsa.jpg',
    },
    {
      id: '2',
      nama: 'Muhammad Rusdi',
      nis: '54321',
      foto: 'https://example.com/rusdi.jpg',
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (foto) => <Avatar src={foto} />,
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
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
                  <Table dataSource={dataSource} columns={columns} />
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
