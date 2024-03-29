function TabSchool() {
    return (
        <div style={{ padding: '15px' }} className="active tab-pane" id="input-sekolah">
            <div className="box-body">
                <form
                    role="form"
                    action="/admin/sekolah/create"
                    method="POST"
                >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="school_name" className="control-label">
                                    Nama Sekolah
                                </label>
                                <input
                                    type="text"
                                    name="school_name"
                                    className="form-control"
                                    id="school_name"
                                    value={"TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="school_address" className="control-label">
                                    Alamat Sekolah
                                </label>
                                <textarea
                                    name="school_address"
                                    className="form-control"
                                    id="school_address"
                                    value={"Jl. H. Baping No.100 Kelurahan Ciracas Kecamatan Ciracas Kota Jakarta Timur"}
                                    readOnly
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="no_telp_sekolah" className="control-label">
                                    No. Telp Sekolah
                                </label>
                                <input
                                    type="number"
                                    name="no_telp_sekolah"
                                    className="form-control"
                                    id="no_telp_sekolah"
                                    value={"082946246"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="npsn" className="control-label">
                                    NPSN
                                </label>
                                <input
                                    type="number"
                                    name="npsn"
                                    className="form-control"
                                    id="npsn"
                                    value={"2146517478"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ward" className="control-label">
                                    Kelurahan/Desa
                                </label>
                                <input
                                    type="text"
                                    name="ward"
                                    className="form-control"
                                    id="ward"
                                    value={"Cakung"}
                                    readOnly
                                />
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="subdistrict" className="control-label">
                                    Kecamatan
                                </label>
                                <input
                                    type="text"
                                    name="subdistrict"
                                    className="form-control"
                                    id="subdistrict"
                                    value={"Ujung Menteng"}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="pos" className="control-label">
                                    Kode Pos
                                </label>
                                <input
                                    type="number"
                                    name="pos"
                                    className="form-control"
                                    id="pos"
                                    value={"123"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="regency" className="control-label">
                                    Kabupaten
                                </label>
                                <input
                                    type="text"
                                    name="regency"
                                    className="form-control"
                                    id="regency"
                                    value={"JAKARTA"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="province" className="control-label">
                                    Provinsi
                                </label>
                                <input
                                    type="text"
                                    name="province"
                                    className="form-control"
                                    id="province"
                                    value={"DKI Jakarta"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="authorities" className="control-label">
                                    Nama Disdik
                                </label>
                                <input
                                    type="text"
                                    name="authorities"
                                    className="form-control"
                                    id="authorities"
                                    value={"DINAS PENDIDIKAN DKI JAKARTA (KOTA JAKARTA TIMUR)"}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="box-footer">
                        <button
                            type="submit"
                            className="btn btn-primary pull-left"
                        >
                            Simpan
                        </button>
                    </div> */}
                </form>
            </div >
        </div >
    )
}

export default TabSchool