'use client'
import { useEffect, useState } from 'react'
import { useOneStudentByIdSemesterGuru } from '@/hooks/useOneStudentByIdSemesterGuru'
import { Button, Input, Modal, Space, Table, Tabs, Tag } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import Link from 'next/link'
import { CheckOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import RaportInput from './components/raportInput'
import RaportEdit from './components/raportEdit'
import raportService from '@/services/rapor.service'
import useAuth from '@/hooks/useAuth'

const RaporView = ({ idRombelSemesterGuru }) => {
  const { token } = useAuth()
  const [rombel, setRombel] = useState('')
  const [semester, setSemester] = useState('')
  const [murid, setMurid] = useState([])
  const [selectedMurid, setSelectedMurid] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeTab, setActiveTab] = useState('daftarSiswaTab')
  const {
    data: listRombelSemesterMurid,
    error,
    isFetching,
    refetch,
  } = useOneStudentByIdSemesterGuru(idRombelSemesterGuru)

  useEffect(() => {
    setRombel(listRombelSemesterMurid.rombel)
    setSemester(listRombelSemesterMurid.semester)
    setMurid(listRombelSemesterMurid.murid)
  })

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleBack = () => {
    setActiveTab('daftarSiswaTab')
  }

  const handleValidationRapor = (idRapor) => {
    Modal.confirm({
      title: 'Apakah Anda yakin akan memvalidasi rapor ini?',
      content:
        'Setelah validasi, rapor ini tidak dapat diubah kembali. Apakah Anda yakin?',
      okText: 'Ya, validasi rapor!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await raportService
          .validation(token, idRapor)
          .then(() => {
            Modal.success({
              title: 'Berhasil',
              content: 'Data rapor telah di validasi!',
            })
            refetch()
          })
          .catch((error) => {
            Modal.error({
              title: 'Oops...',
              content: 'Terjadi kesalahan: ' + error,
            })
          })
      },
    })
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
        return (
          String(record.nis).toLowerCase().includes(value.toLowerCase()) ||
          String(record.nama).toLowerCase().includes(value.toLowerCase())
        )
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
      title: 'Status Penilaian',
      dataIndex: 'penilaianMingguan',
      key: 'penilaianMingguan',
      render: (text, record) => {
        if (!record.penilaianMingguan) {
          return <Tag color="red">Belum lengkap</Tag>
        } else {
          return <Tag color="green">Sudah lengkap</Tag>
        }
      },
    },
    {
      title: 'Status Raport',
      dataIndex: 'statusSemester',
      key: 'statusSemester',
      render: (text, record) => {
        if (record.rapor && record.rapor[0]?.isValidated) {
          return <Tag color="green">Sudah Divalidasi</Tag>
        } else {
          return <Tag color="yellow">Belum Divalidasi</Tag>
        }
      },
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {record.rapor &&
            record.penilaianMingguan &&
            record.rapor.length === 0 &&
            !record.rapor[0]?.isValidated && (
              <Button
                type="primary"
                onClick={() => {
                  setSelectedMurid(record)
                  handleTabChange('inputCatatanRaportTab')
                }}
              >
                <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
                Input Catatan Raport
              </Button>
            )}

          {!record.penilaianMingguan && (
            <Link
              href={`/guru/penilaian/${idRombelSemesterGuru}`}
              target="_blank"
            >
              <Button style={{ backgroundColor: 'red', color: 'white' }}>
                Lengkapi Penilaian
              </Button>
            </Link>
          )}

          {record.rapor &&
            record.penilaianMingguan &&
            record.rapor.length !== 0 &&
            !record.rapor[0]?.isValidated && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedMurid(record)
                  setActiveTab('editCatatanRaportTab')
                }}
              >
                Edit Catatan Raport
              </Button>
            )}

          {record.rapor && record.rapor.length !== 0 && (
            <Link href={`/raport_print/${record.rapor[0].id}`} target="_blank">
              <Button
                style={{ backgroundColor: 'green', color: 'white' }}
                icon={<PrinterOutlined />}
              >
                Print
              </Button>
            </Link>
          )}

          {record.rapor &&
            record.rapor.length !== 0 &&
            !record.rapor[0]?.isValidated && (
              <Button
                icon={<CheckOutlined />}
                style={{ backgroundColor: 'grey', color: 'white' }}
                onClick={() => handleValidationRapor(record.rapor[0].id)}
              >
                Validasi
              </Button>
            )}
        </Space>
      ),
    },
  ]

  const handleSearch = (value) => {
    setSearchKeyword(value)
  }

  const handleChangeSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-book"></i> Input Raport
                  </h3>
                </div>

                <>
                  <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane key="daftarSiswaTab" style={{ marginTop: '-3%' }}>
                      <div className="callout callout-primary">
                        <Link href="/guru/rapor">
                          <button
                            className="btn btn-default"
                            style={{ marginBottom: '2%', marginTop: '1%' }}
                          >
                            <i className="fa fa-arrow-left"></i> Kembali
                          </button>
                        </Link>
                        <h4>
                          <i className="icon fa fa-info-circle"></i> Inputkan
                          Nilai Raport di Rombel {rombel?.name}
                        </h4>
                        <p>{`Tahun Ajaran ${semester?.name}`}</p>
                      </div>
                      <div className="box-body">
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
                            dataSource={murid}
                            loading={isFetching}
                            scroll={{ x: 1000 }}
                          />
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                  {activeTab === 'inputCatatanRaportTab' && selectedMurid && (
                    <RaportInput
                      murid={selectedMurid}
                      listMurid={murid}
                      semester={semester}
                      btnBack={handleBack}
                      refetch={refetch}
                      idRombelSemesterGuru={idRombelSemesterGuru[0]}
                    />
                  )}

                  {activeTab === 'editCatatanRaportTab' && selectedMurid && (
                    <RaportEdit
                      murid={selectedMurid}
                      btnBack={handleBack}
                      refetch={refetch}
                      idRombelSemesterGuru={idRombelSemesterGuru[0]}
                    />
                  )}
                </>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default RaporView
