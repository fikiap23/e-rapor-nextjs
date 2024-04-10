'use client'
import { useState, useEffect } from 'react'
import { Tabs, Button, Table, Modal, Space } from 'antd'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import InputModulAjar from './component/inputModulAjar'
import ActivitiesView from './component/activitiesView'
import modulAjarService from '@/services/modul-ajar.service'
import Loading from '@/components/shared/Loading'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import EditModulAjar from './component/editModulAjar'
import { useModulAjars } from '@/hooks/useModulAjar'
import { useCpTp } from '@/hooks/useCpTp'
import {
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
} from '@ant-design/icons'

const { TabPane } = Tabs

const ModulAjarView = () => {
  const [activeTab, setActiveTab] = useState('moduleTab')
  const [mingguTpUncreated, setMingguTpUncreated] = useState([])
  const [selectedModulAjar, setSelectedModulAjar] = useState(null)
  const { token } = useAuth()
  const {
    data: modulAjars,
    error: errorModulAjars,
    isFetching: isFetchingModulAjars,
    refetch: refetchModulAjars,
  } = useModulAjars(token)

  const {
    data: cpTps,
    error: errorCpTps,
    isFetching: isFetchingCpTps,
    refetch: refetchCpTps,
  } = useCpTp(token)

  useEffect(() => {
    if (!isFetchingCpTps && !isFetchingModulAjars) {
      const mingguModulAjar = modulAjars?.map((modulAjar) => {
        return modulAjar?.minggu
      })
      const tp = cpTps?.tujuanPembelajaran.filter(
        (tujuanPembelajaran) =>
          !mingguModulAjar.includes(tujuanPembelajaran?.minggu)
      )
      setMingguTpUncreated(tp)
    }
  }, [isFetchingCpTps, isFetchingModulAjars, cpTps, modulAjars])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleEdit = (data) => {
    setActiveTab('moduleEditTab')
    setSelectedModulAjar(data)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus data modul!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await modulAjarService.delete(token, id)
        Modal.success({
          content: 'Data modul telah dihapus.',
        })
        refetchModulAjars()
      },
      onCancel: () => {},
    })
  }

  const columns = [
    {
      title: 'Minggu',
      dataIndex: 'minggu',
      key: 'minggu',
    },
    {
      title: 'Topik',
      dataIndex: 'topik',
      key: 'topik',
    },
    {
      title: 'Sub Topik',
      dataIndex: 'subtopik',
      key: 'subtopik',
    },
    {
      title: 'Tujuan Kegiatan',
      dataIndex: 'tujuanKegiatan',
      key: 'tujuanKegiatan',
      render: (text, record, index) => (
        <div>
          {text.map((tujuan, idx) => (
            <p key={idx}>
              {idx + 1}. {tujuan}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: 'Aksi',
      key: 'id',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Hapus
          </Button>
          <Button
            style={{ backgroundColor: 'green', color: 'white' }}
            icon={<PrinterOutlined />}
          >
            Print
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-book"></i>{' '}
                  <span style={{ marginLeft: '10px' }}> Data Modul Ajar </span>
                </h3>
              </div>
              <div className="box-body">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <TabPane tab="Modul Ajar" key="moduleTab">
                    <div className="box-body table-responsive no-padding">
                      <div style={{ margin: '0 20px 20px 20px' }}>
                        <Button
                          type="primary"
                          onClick={() => handleTabChange('learningOutcomesTab')}
                        >
                          Tambah
                        </Button>
                      </div>

                      <Table
                        loading={isFetchingModulAjars}
                        columns={columns}
                        dataSource={modulAjars}
                        rowKey="id"
                        pagination={false}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Jadwal Ajar" key="activitiesTab">
                    <ActivitiesView />
                  </TabPane>
                </Tabs>
                {activeTab === 'learningOutcomesTab' && (
                  <InputModulAjar
                    refetch={refetchModulAjars}
                    tujuanPembelajarans={mingguTpUncreated}
                    token={token}
                  />
                )}
                {activeTab === 'moduleEditTab' && selectedModulAjar && (
                  <EditModulAjar
                    modulAjarData={selectedModulAjar}
                    refetch={refetchModulAjars}
                    token={token}
                    tujuanPembelajarans={mingguTpUncreated}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModulAjarView
