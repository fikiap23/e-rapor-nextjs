import React from 'react'
import { Table, Modal } from 'antd'
import { formatDateWithIndonesianMonthAndDay } from '@/lib/helperDate'

const JadwalAjarModal = ({ isOpen, closeModal, JadwalAjar }) => {
  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (text) => {
        const date = new Date(text)
        return <span>{formatDateWithIndonesianMonthAndDay(date)}</span>
      },
      width: 180,
    },
    {
      title: 'Kegiatan Inti',
      dataIndex: 'kegiatanInti',
      key: 'kegiatanInti',
      render: (kegiatanInti) => (
        <div>
          {kegiatanInti.map((kegiatan, index) => (
            <p key={index}> {`${index + 1}. ${kegiatan}`}</p>
          ))}
        </div>
      ),
    },
  ]

  return (
    <>
      <Modal
        visible={isOpen}
        title="Jadwal Ajar"
        width={800}
        onCancel={closeModal}
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={JadwalAjar?.formatedJadwal}
          pagination={false}
          bordered
          style={{ overflow: 'auto' }}
        />
      </Modal>
    </>
  )
}

export default JadwalAjarModal
