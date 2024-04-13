import React from 'react'
import { Button, Table, Dropdown, Menu } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useMuridWithPenilaian } from '@/hooks/useMuridWithPenilaian'

const MuridTable = ({ idRombelSemesterGuru, tp }) => {
  const { data: muridWithPenilaian, isFetching: isFetchingMuridWithPenilaian } =
    useMuridWithPenilaian(idRombelSemesterGuru, tp.id)

  const menu = (record) => (
    <Menu>
      <Menu.Item key="edit">Edit Nilai</Menu.Item>
      <Menu.Item key="delete">Hapus Nilai</Menu.Item>
      <Menu.Item key="input">Input Nilai</Menu.Item>
    </Menu>
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
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button type="primary" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]
  return (
    <Table
      columns={columns}
      dataSource={muridWithPenilaian}
      loading={isFetchingMuridWithPenilaian}
      scroll={{ x: 1000 }}
      bordered
    />
  )
}

export default MuridTable
