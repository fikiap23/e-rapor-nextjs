'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import siswaService from '@/services/siswa.service'
import { useGetAllStudentData } from '@/hooks/useStudent'
import TabInputSiswa from '../siswa/TabInputStudent'
import TabUpdateSiswa from '../siswa/TabUpdateStudent'
import { useGetAllRombel } from '@/hooks/useRombel'
import { Table, Button, Tag, Space, Input } from 'antd'

const RaportStudentTable = () => {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState('view')
  const [searchKeyword, setSearchKeyword] = useState('')

  const {
    data: listStudent,
    error: errorStudent,
    isFetching: isFetchingStudent,
    refetch: refetchStudents,
  } = useGetAllStudentData(token)

  const {
    data: listRombel,
    error: errorRombel,
    isFetching: isFetchingRombel,
    refetch: refetchRombels,
  } = useGetAllRombel(token)

  console.log(listRombel)

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
      filteredValue: [searchKeyword],
      onFilter: (value, record) => {
        const nisMatch = String(record.nis).toLowerCase().includes(value.toLowerCase());
        const namaMatch = record.nama.toLowerCase().includes(value.toLowerCase());
        return nisMatch || namaMatch;
      },

      sorter: (a, b) => a.nis.localeCompare(b.nis),
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      render: (text) => text.toUpperCase(),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const url = `/guru/rapor/${record.id}`;
              window.location.href = url;
            }}
          >
            <i className="fa fa-edit" style={{ marginRight: '8px' }}></i>Input Catatan
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="nav-tabs-custom">
            <div
              className="form-group"
              style={{ width: '30%', display: 'flex' }}
            >
              <select
                // value={selectedTahun}
                // onChange={(e) => setSelectedTahun(e.target.value)}
                className="form-control"
              >
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
              </select>
              <select
                // value={selectedRombel}
                // onChange={(e) => setSelectedRombel(e.target.value)}
                className="form-control"
              >
                <option value="">Pilih Rombel</option>
                {listRombel?.map((rombel) => (
                  <option key={rombel.id} value={rombel.id}>
                    {rombel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="tab-content">
              <div className="box-body table-responsive no-padding">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/* You can add other filters or controls here */}
                  <div className="form-group" style={{ width: '30%' }}>
                    <Input.Search
                      placeholder="Cari data..."
                      onSearch={(value) => {
                        setSearchKeyword(value);
                      }}
                      onChange={(e) => {
                        setSearchKeyword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <Table
                  bordered
                  columns={columns}
                  dataSource={listStudent}
                  loading={isFetchingStudent}
                  pagination={{ pageSize: 10 }}
                  rowKey="id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RaportStudentTable
