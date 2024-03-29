import TableLecture from './tableLecture'

const LectureView = () => {
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-book"></i> Rombel Diampuh
                  </h3>
                </div>
                <div className="box-body">
                  <TableLecture />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default LectureView
