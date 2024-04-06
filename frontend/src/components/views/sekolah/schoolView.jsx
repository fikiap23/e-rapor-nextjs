'use client'
import SchoolForm from './component/schoolForm'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import CreateSchoolForm from './component/createSchoolForm'
import { useSekolah } from '@/hooks/useSekolah'

function SchoolView() {
  const { token } = useAuth()
  const { data: sekolahData, error, isFetching } = useSekolah(token)
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
              {!isFetching && !sekolahData && (
                <CreateSchoolForm token={token} />
              )}
              {isFetching && <Loading />}
              {!isFetching && !error && sekolahData && (
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
