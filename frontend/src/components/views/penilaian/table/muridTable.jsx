import React from 'react'
import { Button, Table } from 'antd'
import { useMuridWithPenilaian } from '@/hooks/useMuridWithPenilaian'

const MuridTable = ({ idRombelSemesterGuru, tp }) => {
  // console.log(
  //   `This from murid table with idRombelSemesterGuru ${idRombelSemesterGuru}`
  // )
  // console.log(`This from murid table with tp ${tp.id}`)
  // console.log(`This from murid table with tp ${tp.minggu}`)
  // console.log(
  //   `This from murid table with tp ${tp.tujuanPembelajaranAgamaBudipekerti}`
  // )
  const { data: muridWithPenilaian, isFetching: isFetchingMuridWithPenilaian } =
    useMuridWithPenilaian(idRombelSemesterGuru, tp.id)
  console.log(muridWithPenilaian)
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
      children: [
        {
          title: tp?.tujuanPembelajaranAgamaBudipekerti,
          dataIndex: 'nilaiAgamaBudipekerti',
          key: 'nilaiAgamaBudipekerti',
          render: (text, record) => (
            <div>
              <b>{text}</b>
              <br /> {record.deskripsiAgamaBudipekerti}
            </div>
          ),
        },
      ],
    },
    {
      title: 'Nilai Jati Diri',
      dataIndex: 'nilaiJatiDiri',
      key: 'nilaiJatiDiri',
      children: [
        {
          title: tp?.tujuanPembelajaranJatiDiri,
          dataIndex: 'nilaiJatiDiri',
          key: 'nilaiJatiDiri',
          render: (text, record) => (
            <div>
              <b>{text}</b>
              <br /> {record.deskripsiJatiDiri}
            </div>
          ),
        },
      ],
    },
    {
      title: 'Nilai Literasi Sains',
      dataIndex: 'nilaiLiterasiSains',
      key: 'nilaiLiterasiSains',
      children: [
        {
          title: tp?.tujuanPembelajaranLiterasiSains,
          dataIndex: 'nilaiLiterasiSains',
          key: 'nilaiLiterasiSains',
          render: (text, record) => (
            <div>
              <b>{text}</b>
              <br /> {record.deskripsiLiterasiSains}
            </div>
          ),
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
    <Table
      columns={columns}
      dataSource={dummyData}
      scroll={{ x: 1000 }}
      bordered
    />
  )
}

export default MuridTable
