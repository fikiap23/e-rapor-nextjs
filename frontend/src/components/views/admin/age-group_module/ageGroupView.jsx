'use client'
import { useEffect, useState } from 'react'
import AddGroupModal from './modal/addGroupModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllKategoriRombel } from '@/services/rombelService/useKategoriRombel'
import UpdateGroupModal from './modal/updateGroupModal'

const AgeGroupView = () => {
  const { token } = useAuth()
  const {
    data: listKategoriRombel,
    error: errorKategoriRombel,
    isFetching: isFetchingKategoriRombel,
  } = useGetAllKategoriRombel(token)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [selectedKategori, setSelectedKategori] = useState(null)
  const [Kategories, setKategories] = useState([])

  useEffect(() => {
    setKategories(listKategoriRombel)
  }, [listKategoriRombel])

  const openModal = () => {
    setIsOpenAddModal(true)
  }

  const closeModal = () => {
    setIsOpenAddModal(false)
  }

  const openUpdateModal = (kategori) => {
    setSelectedKategori(kategori)
    setIsOpenUpdateModal(true)
  }

  const closeModalUpdate = () => {
    setIsOpenUpdateModal(false)
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
                    <i className="fa fa-calendar"></i> Data Kelompok Usia
                  </h3>
                </div>

                <div className="box-body">
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={openModal}
                    >
                      <i className="icon fa fa-plus"></i> Tambah
                    </button>
                  </div>
                  <table
                    className="table table-bordered table-striped"
                    id="tahun"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Kelompok Usia</th>
                        <th>Kode</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isFetchingKategoriRombel &&
                        Kategories &&
                        Kategories.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.kelompokUsia}</td>
                            <td>{item.kode}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => openUpdateModal(item)}
                              >
                                <i className="icon fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                style={{ marginLeft: '5px' }}
                              >
                                <i className="icon fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddGroupModal
        isOpen={isOpenAddModal}
        closeModal={closeModal}
        setKategories={setKategories}
      ></AddGroupModal>
      <UpdateGroupModal
        isOpen={isOpenUpdateModal}
        closeModal={closeModalUpdate}
        setKategories={setKategories}
        selectedKategori={selectedKategori}
        token={token}
      ></UpdateGroupModal>
    </>
  )
}
export default AgeGroupView
