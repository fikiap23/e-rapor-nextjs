import React, { useState } from 'react'
import AddTujuanModal from './addTujuanModal'

const TujuanPage = ({ tujuanData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const deleteSiswa = (id) => {
    handleDelete()
    console.log(`Menghapus tujuan pembelajaran dengan id ${id}`)
  }

  const tujuanDummy = [
    {
      tujuanPembelajaranAgama: 'Contoh tujuan pembelajaran agama 1',
      tujuanPembelajaranJatiDiri: 'Contoh tujuan pembelajaran jati diri 1',
      tujuanPembelajaranLiterasiSains:
        'Contoh tujuan pembelajaran literasi sains 1',
    },
    {
      tujuanPembelajaranAgama: 'Contoh tujuan pembelajaran agama 2',
      tujuanPembelajaranJatiDiri: 'Contoh tujuan pembelajaran jati diri 2',
      tujuanPembelajaranLiterasiSains:
        'Contoh tujuan pembelajaran literasi sains 2',
    },
    {
      tujuanPembelajaranAgama: 'Contoh tujuan pembelajaran agama 3',
      tujuanPembelajaranJatiDiri: 'Contoh tujuan pembelajaran jati diri 3',
      tujuanPembelajaranLiterasiSains:
        'Contoh tujuan pembelajaran literasi sains 3',
    },
  ]

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <button type="button" className="btn btn-success" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </button>
        </div>
        <table id="tujuanData" className="table table-hover">
          <thead>
            <tr>
              <th>Minggu</th>
              <th>NILAI AGAMA DAN BUDI PEKERTI</th>
              <th>JATI DIRI</th>
              <th>
                DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tujuanDummy.map((item, index) => (
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
                    onClick={() => deleteSiswa(index)}
                  >
                    <i className="icon fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTujuanModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  )
}

export default TujuanPage
