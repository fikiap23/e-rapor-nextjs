'use client'
import { useEffect, useState } from 'react'
import AddNilaiModal from './inputNilaiModal'
import { Button, Table, Tag, Modal, Input, Tabs } from 'antd'
import { useParams } from 'next/navigation'
import RaportInput from '../rapor/raportInput'
import Link from 'next/link'
import {
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
} from '@ant-design/icons'
import RaportEdit from '../rapor/raportEdit'

const { TabPane } = Tabs
const StudentTable = ({ siswa, fetching }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('daftarSiswaTab')
  // const [dataUncreated, setDataUncreated] = useState([])
  const [idStudent, setIdStudent] = useState('');
  const [idSemester, setIdSemester] = useState('');
  const id = useParams()
  const idRombelSemesterGuru = id.id
  const [dataRaport, setDataRaport] = useState(null)

  const { murid, rombel, semester } = siswa;

  const dataSource = murid.map(data => ({
    ...data,
    rombel,
    tahunAjaran: semester,
  }));

  // console.log(idStudent);

  // useEffect(() => {
  //   if (!fetching) {
  //     const siswas = dataSource?.map((siswa) => {
  //       return console.log(siswa);
  //     })
  //     // const tp = cpTps?.tujuanPembelajaran.filter(
  //     //   (tujuanPembelajaran) =>
  //     //     !siswas.includes(tujuanPembelajaran?.minggu)
  //     // )
  //     // setMingguTpUncreated(tp)
  //   }
  // })



  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

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
      filteredValue: [searchKeyword],
      onFilter: (value, record) => {
        return String(record.nis).toLowerCase().includes(value.toLowerCase()) ||
          String(record.nama).toLowerCase().includes(value.toLowerCase())
      },
      sorter: (a, b) => a.nis.localeCompare(b.nis),
    },
    {
      title: 'Nama Siswa',
      dataIndex: 'nama',
      key: 'nama',
      render: (text) => text.toUpperCase(),
      sorter: (a, b) => a.nama.localeCompare(b.nama),
    },
    {
      title: 'Status Raport',
      dataIndex: 'statusSemester',
      key: 'statusSemester',
      render: (text, record) => {
        if (record.rapor && record.rapor.length === 0) {
          return (
            <Tag color="yellow">
              Belum Bisa Dicetak
            </Tag>
          );
        } else {
          return (
            <Tag color="green">
              Tersedia
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
          {record.rapor && record.rapor.length === 0 ? (
            <Button
              type="primary"
              onClick={() => {
                // const url = `/guru/rapor/${record.id}/${idRombelSemesterGuru}`;
                // window.location.href = url;
                setIdStudent(record.id)
                setIdSemester(record.tahunAjaran?.id)
                handleTabChange('inputCatatanRaportTab')
                // setIdRombelSemesterGuru(record.idRombelSemesterGuru)
                // console.log(record.tahunAjaran?.id);
              }}
              // onClick={() => handleTabChange('inputCatatanRaportTab')}
              style={{ marginRight: 8 }}
            >
              <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
              Input Catatan Raport
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Edit Catatan Raport
            </Button>
          )}


          {record.rapor && record.rapor.length !== 0 && (
            <Link href={`/module_print/${record.id}`} target="_blank">
              <Button
                style={{ backgroundColor: 'green', color: 'white' }}
                icon={<PrinterOutlined />}
              >
                Print
              </Button>
            </Link>
          )}
        </span>
      ),
    },
  ]

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const handleChangeSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleEdit = (data) => {
    setActiveTab('editCatatanRaportTab')
    setDataRaport(data)
  }

  return (
    <>
      {/* <div style={{ width: '30%' }}>
        <Input.Search
          placeholder="Cari data..."
          onSearch={handleSearch}
          onChange={handleChangeSearch}
          style={{ marginBottom: 16 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={fetching}
        scroll={{ x: 1000 }}
      /> */}
      <div className="box-body">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane key="daftarSiswaTab" style={{ marginTop: '-5%' }}>
            <div className="box-body table-responsive no-padding">
              <div style={{ margin: '0 20px 20px 20px' }}>
                <div style={{ width: '30%' }}>
                  <Input.Search
                    placeholder="Cari data..."
                    onSearch={handleSearch}
                    onChange={handleChangeSearch}
                    style={{ marginBottom: 16 }}
                  />
                </div>
              </div>

              <Table
                columns={columns}
                dataSource={dataSource}
                loading={fetching}
                scroll={{ x: 1000 }}
              />
            </div>
          </TabPane>
          {/* <TabPane tab="Jadwal Ajar" key="activitiesTab">
            <Table
              columns={columns}
              dataSource={dataSource}
              loading={fetching}
              scroll={{ x: 1000 }}
            />
          </TabPane> */}
        </Tabs>
        {activeTab === 'inputCatatanRaportTab' && (
          <RaportInput
            idStudent={idStudent}
            idSemester={idSemester}
          />
        )}

        {activeTab === 'editCatatanRaportTab' && dataRaport && (
          <RaportEdit
            data={dataRaport}
            fetching={fetching}
            idStudent={idStudent}
            idSemester={idSemester}
          />
        )}
      </div>
    </>
  )
}

export default StudentTable
