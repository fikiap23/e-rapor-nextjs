import { Button, Input, Modal, Table } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useOneRombel } from '@/hooks/useOneRombel'
import siswaService from '@/services/siswa.service'
import { useEffect, useState } from 'react'

export default function SeeStudentView({ id }) {
  const { token } = useAuth()
  const [siswas, setSiswas] = useState([])

  const {
    data: rombelData,
    isFetching: isFetchingRombel,
    error: errorRombel,
    refetch: refetchRombel,
  } = useOneRombel(token, id)
  const [searchText, setSearchText] = useState('')
  const filteredSiswas = siswas?.filter((siswa) =>
    Object.values(siswa).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  useEffect(() => {
    if (rombelData) {
      setSiswas(rombelData?.murid)
    }
  }, [rombelData])

  const handleKeluarkanSiswa = (idSiswa) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Siswa akan dikeluarkan ke rombel ini.',
      onOk() {
        try {
          siswaService
            .removeRombel(token, idSiswa)
            .then((result) => {
              Modal.success({
                title: 'Success',
                content: 'Siswa telah dikeluarkan',
                position: 'bottom-center',
              })
              refetchRombel()
            })
            .catch((error) => {
              Modal.error({
                content: error,
                title: 'Oops...',
                position: 'top-right',
              })
            })
        } catch (error) {
          Modal.error({
            content: 'Terjadi kesalahan',
            title: 'Oops...',
            position: 'top-right',
          })
        }
      },
      onCancel() {
        // Do nothing
      },
      okText: 'Ya, keluarkan!',
      cancelText: 'Batal',
    })
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
      sorter: (a, b) => a.nis.localeCompare(b.nis),
    },
    {
      title: 'NiSN',
      dataIndex: 'nisn',
      key: 'nisn',
      sorter: (a, b) => a.nisn.localeCompare(b.nisn),
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      sorter: (a, b) => a.nama.localeCompare(b.nama),
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
                    <div style={{ margin: '0 20px 20px 20px' }}>
                      <Input
                        placeholder="Cari siswa..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200, marginRight: 10 }}
                      />
                    </div>
                    <Table
                      columns={columns}
                      dataSource={filteredSiswas}
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
    </div>
  )
}
