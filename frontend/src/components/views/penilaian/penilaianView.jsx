import React from 'react'
import { Button, Table } from 'antd'

const PenilaianView = ({ idRombelSemesterGuru }) => {
  const dummyData = [
    {
      id: 1,
      nis: '1234567890',
      nama: 'Nama Siswa 1',
      BELUM_BERKEMBANG: '70',
      MULAI_BERKEMBANG: '80',
      SUDAH_BERKEMBANG: '90',
    },
    {
      id: 2,
      nis: '0987654321',
      nama: 'Nama Siswa 2',
      BELUM_BERKEMBANG: '65',
      MULAI_BERKEMBANG: '75',
      SUDAH_BERKEMBANG: '85',
    },
    // Tambahkan data siswa lainnya sesuai kebutuhan
  ]

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Nilai Agama Budipekerti',
      dataIndex: 'nilaiAgamaBudipekerti',
      key: 'nilaiAgamaBudipekerti',
      children: [
        {
          title: 'Belum Berkembang',
          dataIndex: 'BELUM_BERKEMBANG',
          key: 'BELUM_BERKEMBANG',
        },
        {
          title: 'Mulai Berkembang',
          dataIndex: 'MULAI_BERKEMBANG',
          key: 'MULAI_BERKEMBANG',
        },
        {
          title: 'Sudah Berkembang',
          dataIndex: 'SUDAH_BERKEMBANG',
          key: 'SUDAH_BERKEMBANG',
        },
      ],
    },
    {
      title: 'Nilai Jati Diri',
      dataIndex: 'nilaiJatiDiri',
      key: 'nilaiJatiDiri',
      children: [
        {
          title: 'Belum Berkembang',
          dataIndex: 'BELUM_BERKEMBANG',
          key: 'BELUM_BERKEMBANG',
        },
        {
          title: 'Mulai Berkembang',
          dataIndex: 'MULAI_BERKEMBANG',
          key: 'MULAI_BERKEMBANG',
        },
        {
          title: 'Sudah Berkembang',
          dataIndex: 'SUDAH_BERKEMBANG',
          key: 'SUDAH_BERKEMBANG',
        },
      ],
    },
    {
      title: 'Nilai Literasi Sains',
      dataIndex: 'nilaiLiterasiSains',
      key: 'nilaiLiterasiSains',
      children: [
        {
          title: 'Belum Berkembang',
          dataIndex: 'BELUM_BERKEMBANG',
          key: 'BELUM_BERKEMBANG',
        },
        {
          title: 'Mulai Berkembang',
          dataIndex: 'MULAI_BERKEMBANG',
          key: 'MULAI_BERKEMBANG',
        },
        {
          title: 'Sudah Berkembang',
          dataIndex: 'SUDAH_BERKEMBANG',
          key: 'SUDAH_BERKEMBANG',
        },
      ],
    },
    {
      title: 'Aksi',
      key: 'action',
      render: () => (
        <span>
          <Button
            type="primary"
            icon={<i className="icon fa fa-edit"></i>}
            style={{ marginRight: '2px', marginLeft: '2px' }}
          />
          <Button
            type="info"
            icon={<i className="icon fa fa-eye"></i>}
            style={{ marginRight: '2px', marginLeft: '2px' }}
          />
          <Button
            type="danger"
            icon={<i className="icon fa fa-trash"></i>}
            style={{ marginRight: '2px', marginLeft: '2px' }}
          />
        </span>
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
                    <i className="fa fa-calendar"></i> Data Penilaian Mingguan
                  </h3>
                </div>

                <div className="box-body">
                  <Table
                    dataSource={dummyData}
                    columns={columns}
                    scroll={{ x: 1500 }}
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

export default PenilaianView
