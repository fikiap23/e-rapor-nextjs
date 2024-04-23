'use client'
import SchoolForm from './component/schoolForm'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import CreateSchoolForm from './component/createSchoolForm'
import { useEffect, useState } from 'react'
import sekolahService from '@/services/sekolah.service'

function SchoolView() {
  const { token } = useAuth()

  const [sekolahData, setSekolahData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchSekolahData = async () => {
      try {
        setIsFetching(true)
        const response = await sekolahService.getSekolah()
        if (response) {
          setSekolahData(response)
        } else {
          console.log('Data tidak ditemukan')
        }
        setIsFetching(false)
      } catch (error) {
        setIsFetching(false)
        console.error('Error:', error.message)
      }
    }
    fetchSekolahData()
  }, [])

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Portal Raudhatul Athfal
            !!!
          </h4>
          <p>
            Ini adalah portal Raudhatul Athfal. Sebagai Admin anda dapat
            mengelola data Raudhatul Athfal.
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              {!isFetching && !sekolahData && (
                <CreateSchoolForm token={token} />
              )}
              {isFetching && <Loading />}
              {!isFetching && sekolahData && (
                <SchoolForm sekolahData={sekolahData} token={token} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SchoolView
