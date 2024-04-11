import React, { useState } from 'react'
import { Button, Table, Modal } from 'antd'
import AddSubjectModal from './addSubjectModal'

const ActivitiesView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const activityDummy = [
    {
      id: 1,
      week: 'Minggu 1',
      day: 'Senin',
      date: '10 Juli 2024',
      activity: 'Modul Ajar 1',
    },
  ]

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Minggu',
      dataIndex: 'week',
      key: 'week',
    },
    {
      title: 'Hari',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Kegiatan Inti',
      dataIndex: 'activity',
      key: 'activity',
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
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <Button type="primary" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </Button>
        </div>
        <Table dataSource={activityDummy} columns={columns} />
      </div>
      {/* ADD MODUL AJAR */}
      <AddSubjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      ></AddSubjectModal>
    </div>
  )
}

export default ActivitiesView
