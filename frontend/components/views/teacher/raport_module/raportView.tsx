import React from 'react'
import RaportStudentTable from './raportStudentTable'

export default function RaportView() {
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-print"></i> Cetak Raport
                </h3>
              </div>

              <div className="box-body">
                <RaportStudentTable></RaportStudentTable>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
