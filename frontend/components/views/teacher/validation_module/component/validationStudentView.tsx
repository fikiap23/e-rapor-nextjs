import TableStudentValidation from "./tableStudentValidation"

const ValidationStudentView = () => {
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-book"></i> Validasi Nilai
                  </h3>
                </div>

                <div className="callout callout-primary">
                  <h4>
                    <i className="icon fa fa-info-circle"></i> Daftar Siswa di
                    Rombel A
                  </h4>
                  <p>Tahun Ajaran 2020-2021 Semester Ganjil</p>
                </div>

                <div className="box-body">
                  <TableStudentValidation />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ValidationStudentView
