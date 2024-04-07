import { Button, Modal, Table } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useOneRombel } from '@/hooks/useOneRombel'
import { useStudentsNullRombel } from '@/hooks/useStudenNullRombel'
import siswaService from '@/services/siswa.service'
import Swal from 'sweetalert2'

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
              Swal.fire({
                icon: 'success',
                title: 'Data siswa telah ditambahkan',
                position: 'bottom-center',
              })
              refetchSiswa()
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                position: 'bottom-center',
              })
            })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
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
                    <Table
                      columns={columns}
                      dataSource={allSiswa}
                      pagination={{ pageSize: 10 }}
                      loading={isFetchingSiswa}
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
