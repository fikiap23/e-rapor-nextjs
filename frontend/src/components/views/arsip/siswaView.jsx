'use client'
import TableArsipSiswa from './table/tableSiswa'

const ArsipSiswaView = ({ idRombelSemesterGuru }) => {
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

                <div className="box-body">
                  <>
                    <TableArsipSiswa
                      idRombelSemesterGuru={idRombelSemesterGuru}
                    />
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

export default ArsipSiswaView
