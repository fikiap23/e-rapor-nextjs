'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import CapaianPage from './component/capaianPage'
import TujuanPage from './component/tujuanPage'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import cpTpService from '@/services/cp-tp.service'

const SubjecetView = () => {
  const [activeTab, setActiveTab] = useState('view')
  const { token } = useAuth()
  const [cpData, setCpData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCpData = async () => {
    try {
      setIsFetching(true)
      const response = await cpTpService.getCpTp()
      console.log(response)
      if (response) {
        setCpData(response?.data)
      }
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.error('Error:', error.message)
    }
  }
  useEffect(() => {
    if (isFetching) {
      fetchCpData()
    }
  }, [isFetching])

  const handleRefetch = () => {
    fetchCpData()
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-book"></i>{' '}
                  <span style={{ marginLeft: '10px' }}>
                    {' '}
                    Data Tujuan dan Capaian Pembelajaran
                  </span>
                </h3>
              </div>
              <div className="box-body">
                <div className="nav-tabs-pills">
                  <ul className="nav nav-tabs">
                    <li className={activeTab === 'view' ? 'active' : ''}>
                      <Link href="" onClick={() => handleTabChange('view')}>
                        Tujuan Pembelajaran
                      </Link>
                    </li>
                    <li className={activeTab === 'input' ? 'active' : ''}>
                      <Link href="" onClick={() => handleTabChange('input')}>
                        Capaian Pembelajaran
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {isFetching && <Loading />}
                    {!isFetching && (
                      <div className="tab-content">
                        {activeTab === 'view' && (
                          <TujuanPage
                            cp={cpData}
                            token={token}
                            isLoading={isFetching}
                            refetch={handleRefetch}
                          />
                        )}
                        {activeTab === 'input' && (
                          <CapaianPage
                            cp={cpData}
                            token={token}
                            refetch={handleRefetch}
                          />
                        )}
                      </div>
                    )}
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

export default SubjecetView
