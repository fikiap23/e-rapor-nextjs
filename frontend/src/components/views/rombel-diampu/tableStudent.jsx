'use client'
import { useState } from 'react'
import AddNilaiModal from './inputNilaiModal'
import { Button, Table, Tag, Modal, Input } from 'antd'

const StudentTable = ({ siswa, fetching }) => {
  console.log(siswa.map(index => index.rapor.length));
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
      // sorter: (a, b) => a.nip.localeCompare(b.nip),
    },
    {
      title: 'Nama Siswa',
      dataIndex: 'nama',
      key: 'nama',
      // sorter: (a, b) => a.nama.localeCompare(b.nama),
    },
    {
      title: 'Status Raport',
      dataIndex: 'statusSemester',
      key: 'statusSemester',
      render: (text, record) => {
        if (record.rapor && record.rapor[0].length === 0) {
          return (
            <Tag color="green">
              Aktif
            </Tag>
          );
        } else {
          return (
            <Tag color="yellow">
              Tidak Aktif
            </Tag>
          );
        }
      },

    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => {
              const url = `/guru/rombel/${record.id}`;
              window.location.href = url;
            }}
            style={{ marginRight: 8 }}
          >
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i> Input Catatan Raport
          </Button>
        </span>
      ),
    },
  ]


  return (
    <>
      <Table
        columns={columns}
        dataSource={siswa}
        loading={fetching}
        scroll={{ x: 1000 }}
      />
    </>
  )
}

export default StudentTable
