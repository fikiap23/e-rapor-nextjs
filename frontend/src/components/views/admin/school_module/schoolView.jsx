'use client'
import { useEffect, useState } from 'react'
import SchoolForm from './component/schoolForm'
import useAuth from '@/hooks/useAuth'
import { useSekolah } from '@/services/sekolahService/useSekolah'

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
              {error && (
                <div className="alert alert-danger">
                  {'Data sekolah tidak ditemukan.'}{' '}
                  <strong className="ml-2 text-white ">
                    {'Hubungi Teknisi'}
                  </strong>
                </div>
              )}
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
