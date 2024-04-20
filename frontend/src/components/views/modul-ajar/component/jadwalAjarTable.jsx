import React, { useState } from 'react'
import { Table, Tag, Modal, Button } from 'antd'
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
    },
    {
      title: 'Kegiatan Inti',
      dataIndex: 'kegiatanInti',
      key: 'kegiatanInti',
      render: (kegiatanInti) => (
        <span>
          {kegiatanInti.map((kegiatan, index) => (
            <Tag color="blue" key={index}>
              {kegiatan}
            </Tag>
          ))}
        </span>
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
        />
      </Modal>
    </>
  )
}

export default JadwalAjarModal
