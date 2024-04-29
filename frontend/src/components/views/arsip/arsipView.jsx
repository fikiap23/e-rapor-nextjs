'use client'
import { Alert, Input } from 'antd'
import TableSemesterGuruRombel from './table/tableSemester'

const ArsipView = () => {
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-archive"></i> Arsip Penilaian
                  </h3>
                </div>
                <Alert
                  message="Informasi Penting !!!"
                  description={
                    <>
                      <p>
                        Arsip Penilaian adalah data-data nilai anak yang
                        tersimpan dan telah di validasi oleh Guru
                      </p>
                      <p>
                        Sebagai <b>Admin</b> anda dapat melihat data-data nilai
                        anak
                      </p>
                    </>
                  }
                  type="info"
                  showIcon
                />
                <div className="box-body">
                  <>
                    <TableSemesterGuruRombel />
                  </>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ArsipView
