import RaportInput from '@/components/views/rapor/raportInput'
import React from 'react'

const RaportPage = () => {
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="nav-tabs-custom">
                <div className="box box-solid box-primary">
                  <div className="box-header">
                    <h3 className="box-title">
                      <i className="fa fa-book"></i> Input Catatan Raport
                    </h3>
                  </div>
                </div>
                <RaportInput></RaportInput>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default RaportPage
