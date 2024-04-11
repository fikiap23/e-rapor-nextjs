'use client'
import { Button, Table, Tag, Input, Space } from 'antd';
import { useState } from 'react';

const TableLecture = ({ rombels, fetching }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'Kelompok Usia',
      dataIndex: 'kelompokUsia',
      key: 'kelompokUsia',
      filteredValue: [searchKeyword],
      onFilter: (value, record) => {
        return String(record.semester).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.kelompokUsia.localeCompare(b.kelompokUsia),
    },
    {
      title: 'Rombel',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Tahun Ajaran',
      dataIndex: 'semester',
      key: 'semester',
      sorter: (a, b) => a.semester.localeCompare(b.semester),
    },
    {
      title: 'Status',
      dataIndex: 'statusSemester',
      key: 'statusSemester',
      render: (text, record) => (
        <Tag color={record.statusSemester ? 'green' : 'yellow'}>
          {record.statusSemester ? 'Aktif' : 'Tidak Aktif'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              const url = `/guru/rombel/${record.id}`;
              window.location.href = url;
            }}
          >
            <i className="fa fa-eye" style={{ marginRight: '8px' }}></i> Lihat Daftar Siswa
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const handleChangeSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  // // Filter data berdasarkan nilai pencarian
  // const filteredRombels = rombels.filter((rombel) =>
  //   rombel.name.toLowerCase().includes(searchKeyword.toLowerCase())
  // );

  return (
    <>
      <div style={{width: '30%'}}>
        <Input.Search
          placeholder="Cari data..."
          onSearch={handleSearch}
          onChange={handleChangeSearch}
          style={{ marginBottom: 16 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={rombels}
        loading={fetching}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default TableLecture;
