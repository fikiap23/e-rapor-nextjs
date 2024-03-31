'use client'
import AddSubjectModal from './addSubjectModal'
import { useState } from 'react'

const ActivitiesView = () => {
  const activityDummy = [
    { id: 1, week: 'Minggu 1', day: 'Senin', date: '10 Juli 2024' },
  ]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <button type="button" className="btn bg-green" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </button>
          {/* <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>*modul ajar belum lengkap sampai 14 minggu</span> */}
        </div>
        <table id="activity" className="table table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Minggu</th>
              <th>Hari</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activityDummy.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.week}</td>
                <td>{item.day}</td>
                <td>{item.date}</td>
                <td>
                  <a
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-primary btn-sm"
                  >
                    {/* <span className="glyphicon glyphicon-edit"></span> Edit */}
                    <i className="icon fa fa-edit"></i>
                  </a>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-info btn-sm"
                    // onClick={() => deleteSiswa(item.id)}
                  >
                    {/* <span className="glyphicon glyphicon-remove"></span> Delete */}
                    <i className="icon fa fa-eye"></i>
                  </button>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-danger btn-sm"
                    // onClick={() => deleteSiswa(item.id)}
                  >
                    {/* <span className="glyphicon glyphicon-remove"></span> Delete */}
                    <i className="icon fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ADD MODUL AJAR */}
      <AddSubjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      ></AddSubjectModal>
    </div>
  )
}

export default ActivitiesView
