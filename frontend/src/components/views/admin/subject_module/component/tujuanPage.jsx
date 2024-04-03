import React, { useState } from 'react'
import AddTujuanModal from './addTujuanModal'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import Swal from 'sweetalert2'
import cpTpService from '@/services/cp-tpService/cp-tp.service'

const TujuanPage = ({ cp, token, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus Tujuan pembelajaran ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cpTpService.deleteTp(token, id)
        refetch()
        Swal.fire(
          'Data Dihapus!',
          'Tujuan pembelajaran telah dihapus.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Dibatalkan',
          'Tidak ada perubahan pada data Tujuan pembelajaran ini.',
          'error'
        )
      }
    })
  }

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <button type="button" className="btn btn-success" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </button>
        </div>
        {!cp && (
          <EmptyDataIndicator message="Buat Capaian Pembelajaran terlebih dahulu" />
        )}

        {cp?.tujuanPembelajaran.length === 0 && (
          <EmptyDataIndicator message="Belum ada tujuan pembelajaran" />
        )}

        {cp?.tujuanPembelajaran.length > 0 && (
          <table id="cp" className="table table-hover">
            <thead>
              <tr>
                <th>Minggu</th>
                <th>NILAI AGAMA DAN BUDI PEKERTI</th>
                <th>JATI DIRI</th>
                <th>
                  DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN
                  SENI
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cp?.tujuanPembelajaran.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.tujuanPembelajaranAgama}</td>
                  <td>{item.tujuanPembelajaranJatiDiri}</td>
                  <td>{item.tujuanPembelajaranLiterasiSains}</td>
                  <td>
                    <a className="btn btn-success btn-sm">
                      <i className="icon fa fa-edit"></i>
                    </a>
                    <button
                      style={{
                        marginRight: '2px',
                        marginLeft: '2px',
                      }}
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="icon fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AddTujuanModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        token={token}
        refetch={refetch}
      />
    </div>
  )
}

export default TujuanPage
