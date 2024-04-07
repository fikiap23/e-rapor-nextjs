import { Button, Modal, Table } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useOneRombel } from '@/hooks/useOneRombel'
import siswaService from '@/services/siswa.service'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function SeeStudentView({ id }) {
  const { token } = useAuth()
  const [siswas, setSiswas] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedSiswaId, setSelectedSiswaId] = useState(null)

  const {
    data: rombelData,
    isFetching: isFetchingRombel,
    error: errorRombel,
    refetch: refetchRombel,
  } = useOneRombel(token, id)

  useEffect(() => {
    if (rombelData) {
      setSiswas(rombelData?.murid)
    }
  }, [rombelData])

  const handleKeluarkanSiswa = (idSiswa) => {
    setModalVisible(true)
    setSelectedSiswaId(idSiswa)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    try {
      const payload = {
        idRombel: null,
      }
      siswaService
        .update(token, selectedSiswaId, payload)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Siswa telah dikeluarkan',
            position: 'bottom-center',
          })
          setModalVisible(false)
          setConfirmLoading(false)
          refetchRombel()
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            position: 'bottom-center',
          })
          setConfirmLoading(false)
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        position: 'top-right',
      })
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
    },
    {
      title: 'NiSN',
      dataIndex: 'nisn',
      key: 'nisn',
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleKeluarkanSiswa(record.id)}
        >
          Keluarkan Siswa
        </Button>
      ),
    },
  ]

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-home"></i> Data Rombel
                </h3>
              </div>
              <div className="box-body">
                <Button onClick={() => window.history.back()}>
                  <i className="fa fa-arrow-left"></i> Back
                </Button>
                <br />
                <br />
                {!isFetchingRombel && rombelData && (
                  <div className="callout callout-primary">
                    <h4>
                      <i className="icon fa fa-info-circle"></i>
                      {`Rombel ${rombelData.name}`}
                    </h4>
                    <p>{`Daftar Siswa di Rombel ${rombelData.name}`}</p>
                  </div>
                )}

                <div className="tab-pane " id="input-siswa">
                  <div className="box-body table-responsive no-padding">
                    <Table
                      columns={columns}
                      dataSource={siswas}
                      pagination={{ pageSize: 10 }}
                      loading={isFetchingRombel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        title="Konfirmasi Keluarkan Siswa"
        visible={modalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Anda yakin ingin mengeluarkan siswa dari rombel ini?</p>
      </Modal>
    </div>
  )
}
