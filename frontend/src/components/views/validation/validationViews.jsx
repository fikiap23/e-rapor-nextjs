import TableValidation from "./component/tableValidation"

const ValidationView = () => {
    return (
        <>
            <div className="content-wrapper">
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-solid box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">
                                        <i className="fa fa-bookmark"></i> Validasi Nilai
                                    </h3>
                                </div>
                                <div className="box-body">
                                    <TableValidation />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ValidationView
