import React, { useState } from 'react'
import { Button, Table, Select } from 'antd'

const { Option } = Select

const PenilaianView = ({ idRombelSemesterGuru }) => {
  const [selectedWeek, setSelectedWeek] = useState(1)

  const dummyData = [
    {
      id: 1,
      nis: '1234567890',
      nama: 'John Doe',
      nilaiAgamaBudipekerti: 'SUDAH_BERKEMBANG',
      deskripsiAgamaBudipekerti:
        'John adalah siswa yang memiliki pemahaman yang baik tentang nilai-nilai agama dan budipekerti.',
      nilaiJatiDiri: 'SUDAH_BERKEMBANG',
      deskripsiJatiDiri:
        'John telah menunjukkan perkembangan yang positif dalam memahami jati dirinya sebagai individu.',
      nilaiLiterasiSains: 'SUDAH_BERKEMBANG',
      deskripsiLiterasiSains:
        'John memiliki kemampuan literasi sains yang baik dan dapat menerapkan pengetahuannya dalam kehidupan sehari-hari.',
    },
    {
      id: 2,
      nis: '0987654321',
      nama: 'Jane Doe',
      nilaiAgamaBudipekerti: 'MULAI_BERKEMBANG',
      deskripsiAgamaBudipekerti:
        'Jane masih dalam tahap perkembangan dalam memahami nilai-nilai agama dan budipekerti.',
      nilaiJatiDiri: 'BELUM_BERKEMBANG',
      deskripsiJatiDiri:
        'Jane perlu bimbingan lebih lanjut untuk memahami jati dirinya sebagai individu.',
      nilaiLiterasiSains: 'BELUM_BERKEMBANG',
      deskripsiLiterasiSains:
        'Jane memerlukan bimbingan ekstra dalam meningkatkan kemampuan literasi sainsnya.',
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
      render: (text, record) => (
        <div>
          <b>{text}</b>
          <br /> {record.deskripsiAgamaBudipekerti}
        </div>
      ),
    },
    {
      title: 'Nilai Jati Diri',
      dataIndex: 'nilaiJatiDiri',
      key: 'nilaiJatiDiri',
      render: (text, record) => (
        <div>
          <b>{text}</b>
          <br /> {record.deskripsiJatiDiri}
        </div>
      ),
    },
    {
      title: 'Nilai Literasi Sains',
      dataIndex: 'nilaiLiterasiSains',
      key: 'nilaiLiterasiSains',
      render: (text, record) => (
        <div>
          <b>{text}</b>
          <br /> {record.deskripsiLiterasiSains}
        </div>
      ),
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

  const handleWeekChange = (value) => {
    setSelectedWeek(value)
    // Fetch data for the selected week
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
                    <i className="fa fa-calendar"></i> Data Penilaian Mingguan
                  </h3>
                  <div style={{ float: 'right' }}>
                    <b>Rombel:</b> XII IPA 1 | <b>Semester:</b> Genap
                  </div>
                </div>

                <div className="box-body">
                  <Select
                    defaultValue={1}
                    style={{ width: 120, marginBottom: 16 }}
                    onChange={handleWeekChange}
                  >
                    <Option value={1}>Minggu 1</Option>
                    <Option value={2}>Minggu 2</Option>
                    {/* Tambahkan opsi minggu lainnya sesuai kebutuhan */}
                  </Select>

                  <Table
                    dataSource={dummyData}
                    columns={columns}
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

export default PenilaianView
