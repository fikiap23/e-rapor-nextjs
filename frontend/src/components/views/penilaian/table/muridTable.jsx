import React, { useEffect, useState } from 'react'
import { Button, Table, Dropdown, Menu, Tag, Modal } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useMuridWithPenilaian } from '@/hooks/useMuridWithPenilaian'
import InputPenilaianModal from '../modal/inputNilaiModal'
import penilaianService from '@/services/penilaian.service'

const MuridTable = ({ idRombelSemesterGuru, tp, token }) => {
  const {
    data: muridWithPenilaian,
    isFetching: isFetchingMuridWithPenilaian,
    refetch,
  } = useMuridWithPenilaian(idRombelSemesterGuru, tp.id)

  useEffect(() => {
    refetch()
  }, [idRombelSemesterGuru, tp.id])

  const [isOpenInputModal, setIsOpenInputModal] = useState(false)
  const [selectedIdMurid, setSelectedIdMurid] = useState(null)

  const handleOpenInputModal = (idMurid) => {
    setSelectedIdMurid(idMurid)
    setIsOpenInputModal(true)
  }

  const handleCloseInputModal = () => {
    setIsOpenInputModal(false)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus data penilaian!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await penilaianService
          .delete(token, id)
          .then(() => {
            Modal.success({
              title: 'Berhasil',
              content: 'Data penilaian telah dihapus!',
            })
            refetch()
          })
          .catch((err) => {
            Modal.error({
              title: 'Gagal',
              content: err,
            })
          })
      },
      onCancel: () => {},
    })
  }

  const menu = (record) => (
    <Menu>
      {record.penilaianMingguan && <Menu.Item key="edit">Edit Nilai</Menu.Item>}
      {record.penilaianMingguan && (
        <Menu.Item
          key="delete"
          onClick={() => handleDelete(record.penilaianMingguan?.id)}
        >
          Hapus Nilai
        </Menu.Item>
      )}
      {!record.penilaianMingguan && (
        <Menu.Item key="input" onClick={() => handleOpenInputModal(record.id)}>
          Input Nilai
        </Menu.Item>
      )}
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
      dataIndex: 'penilaianMingguan',
      key: 'nilaiAgamaBudipekerti',
      children: [
        {
          title: tp?.tujuanPembelajaranAgamaBudipekerti,
          dataIndex: 'penilaianMingguan',
          key: 'nilaiAgamaBudipekerti',
          render: (penilaianMingguan) =>
            penilaianMingguan ? (
              <div>
                <b>{penilaianMingguan.nilaiAgamaBudipekerti}</b>
                <br /> {penilaianMingguan.deskripsiAgamaBudipekerti}
              </div>
            ) : (
              <Tag color="warning">Nilai belum diinput</Tag>
            ),
        },
      ],
    },
    {
      title: 'Nilai Jati Diri',
      dataIndex: 'penilaianMingguan',
      key: 'nilaiJatiDiri',
      children: [
        {
          title: tp?.tujuanPembelajaranJatiDiri,
          dataIndex: 'penilaianMingguan',
          key: 'nilaiJatiDiri',
          render: (penilaianMingguan) =>
            penilaianMingguan ? (
              <div>
                <b>{penilaianMingguan.nilaiJatiDiri}</b>
                <br /> {penilaianMingguan.deskripsiJatiDiri}
              </div>
            ) : (
              <Tag color="warning">Nilai belum diinput</Tag>
            ),
        },
      ],
    },
    {
      title:
        'Nilai Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa dan Seni',
      dataIndex: 'penilaianMingguan',
      key: 'nilaiLiterasiSains',
      children: [
        {
          title: tp?.tujuanPembelajaranLiterasiSains,
          dataIndex: 'penilaianMingguan',
          key: 'nilaiLiterasiSains',
          render: (penilaianMingguan) =>
            penilaianMingguan ? (
              <div>
                <b>{penilaianMingguan.nilaiLiterasiSains}</b>
                <br /> {penilaianMingguan.deskripsiLiterasiSains}
              </div>
            ) : (
              <Tag color="warning">Nilai belum diinput</Tag>
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
    <>
      <Table
        columns={columns}
        dataSource={muridWithPenilaian}
        loading={isFetchingMuridWithPenilaian}
        scroll={{ x: 1000 }}
        bordered
      />

      {isOpenInputModal && selectedIdMurid && (
        <InputPenilaianModal
          isOpen={isOpenInputModal}
          closeModal={handleCloseInputModal}
          refetch={refetch}
          token={token}
          tp={tp}
          idMurid={selectedIdMurid}
          idRombelSemesterGuru={idRombelSemesterGuru}
        />
      )}
    </>
  )
}

export default MuridTable
