import { Button, Input, Modal, Table } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useOneRombel } from '@/hooks/useOneRombel'
import { useStudentsNullRombel } from '@/hooks/useStudenNullRombel'
import siswaService from '@/services/siswa.service'
import { useState } from 'react'

export default function AddStudentToClassView({ id }) {
  const { token } = useAuth()
  const {
    data: allSiswa,
    isFetching: isFetchingSiswa,
    error: errorSiswa,
    refetch: refetchSiswa,
  } = useStudentsNullRombel(token)

  const {
    data: rombelData,
    isFetching: isFetchingRombel,
    error: errorRombel,
    refetch: refetchRombel,
  } = useOneRombel(token, id)

  const [searchText, setSearchText] = useState('')
  const [startIndex, setStartIndex] = useState(0)
  const filteredSiswas = allSiswa.filter((siswa) =>
    Object.values(siswa).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  const handleAdd = (idSiswa) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Data siswa akan ditambahkan ke rombel ini.',
      onOk() {
        try {
          const payload = {
            idRombel: id,
          }
          siswaService
            .update(token, idSiswa, payload)
            .then((result) => {
              Modal.success({
                title: 'Success',
                content: 'Data siswa telah ditambahkan',
                position: 'bottom-center',
              })
              refetchSiswa()
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
      okText: 'Ya, tambahkan!',
      cancelText: 'Batal',
    })
  }
  const handlePaginationChange = (page, pageSize) => {
    setStartIndex(pageSize * (page - 1))
  }
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <span>{startIndex + index + 1}</span>,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
      sorter: (a, b) => a.nis.localeCompare(b.nis),
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
        <Button type="primary" onClick={() => handleAdd(record.id)}>
          Add Siswa
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
                    <p>{`Daftarkan Siswa di Rombel ${rombelData.name}`}</p>
                  </div>
                )}

                <div className="tab-pane " id="input-siswa">
                  <div className="box-body table-responsive no-padding">
                    <div style={{ margin: '0 20px 20px 20px' }}>
                      <Input.Search
                        placeholder="Cari siswa..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200, marginRight: 10 }}
                      />
                    </div>
                    <Table
                      columns={columns}
                      dataSource={filteredSiswas}
                      loading={isFetchingSiswa}
                      pagination={{
                        onChange: handlePaginationChange,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} dari ${total} anak`,
                      }}
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
