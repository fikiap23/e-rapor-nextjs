import React, { useEffect, useState } from 'react'
import { Button, Table, Dropdown, Menu, Tag, Modal } from 'antd'
import { MoreOutlined, PrinterOutlined } from '@ant-design/icons'
import { useMuridWithPenilaian } from '@/hooks/useMuridWithPenilaian'
import InputPenilaianModal from '../modal/inputNilaiModal'
import penilaianService from '@/services/penilaian.service'
import EditPenilaianModal from '../modal/editNilaiModal'
import Link from 'next/link'

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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [selectedIdMurid, setSelectedIdMurid] = useState(null)
  const [selectedNilai, setSelectedNilai] = useState(null)

  const handleOpenInputModal = (idMurid) => {
    setSelectedIdMurid(idMurid)
    setIsOpenInputModal(true)
  }

  const handleCloseInputModal = () => {
    setIsOpenInputModal(false)
  }

  const handleOpenEditModal = (nilai, idMurid) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content:
        'Anda akan mengubah data penilaian? Jika anda mengubah, maka data rapor anak ini akan ikut TERESET!',
      okText: 'Ya, ubah!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        setIsOpenEditModal(true)
        setSelectedNilai(nilai)
        setSelectedIdMurid(idMurid)
      },
      onCancel: () => {
        setIsOpenEditModal(false)
      },
    })
  }

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content:
        'Anda akan menghapus data penilaian? Jika anda menghapus, maka data rapor anak ini akan ikut TERHAPUS!',
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
      {record.penilaianMingguan && (
        <Menu.Item
          key="edit"
          onClick={() =>
            handleOpenEditModal(record.penilaianMingguan, record.id)
          }
        >
          Edit Nilai
        </Menu.Item>
      )}
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
                <b>
                  {penilaianMingguan.nilaiAgamaBudipekerti?.replace(/_/g, ' ')}
                </b>
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
                <b>{penilaianMingguan.nilaiJatiDiri?.replace(/_/g, ' ')}</b>
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
                <b>
                  {penilaianMingguan.nilaiLiterasiSains?.replace(/_/g, ' ')}
                </b>
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
      <Link
        href={`/assessment_input_print/${idRombelSemesterGuru}/${tp?.id}`}
        target="_blank"
      >
        <Button
          type="primary"
          style={{
            marginLeft: '10px',
            marginBottom: '10px',
            backgroundColor: 'green',
          }}
          icon={<PrinterOutlined />}
        >
          Print Penilaian
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={muridWithPenilaian}
        loading={isFetchingMuridWithPenilaian}
        pagination={{
          onChange: handlePaginationChange,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} dari ${total} data`,
        }}
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
      {isOpenEditModal && selectedIdMurid && selectedNilai && (
        <EditPenilaianModal
          isOpen={isOpenEditModal}
          closeModal={handleCloseEditModal}
          refetch={refetch}
          token={token}
          tp={tp}
          idMurid={selectedIdMurid}
          idRombelSemesterGuru={idRombelSemesterGuru}
          initialValues={selectedNilai}
        />
      )}
    </>
  )
}

export default MuridTable
