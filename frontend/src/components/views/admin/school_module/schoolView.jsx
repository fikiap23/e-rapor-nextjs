'use client'
import { useState } from 'react'
import SchoolForm from './component/schoolForm'
import useAuth from '@/hooks/useAuth'
import { useSekolah } from '@/services/sekolahService/useSekolah'

function SchoolView() {
  const [activeTab, setActiveTab] = useState('view')
  const { token } = useAuth()
  const { data: sekolahData, error, isFetching } = useSekolah(token)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Portal Sekolah !!!
          </h4>
          <p>
            Ini adalah portal sekolah. Sebagai Admin anda dapat mengelola data
            sekolah.
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              {isFetching && <div>Loading...</div>}
              {error && <div>{error}</div>}
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
