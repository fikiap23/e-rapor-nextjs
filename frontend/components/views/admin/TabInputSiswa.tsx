function TabInputSiswa () {
    return (
        <div className="active tab-pane" id="input-siswa">
            <div className="box-body">
                <form role="form" action="/admin/siswa/create" method="POST">

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="nis" className="control-label">NIS</label>
                            <input type="number" name="nis" className="form-control" id="nis" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="nisn" className="control-label">NISN</label>
                            <input type="number" name="nisn" className="form-control" id="nisn" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="nama" className="control-label">Nama</label>
                            <input type="text" name="nama" className="form-control" id="nama" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Jenis Kelamin</label>
                            <select required name="jk" className="form-control">
                                <option value="">--- Pilih Jenis Kelamin ---</option>
                                <option value="pria">Pria</option>
                                <option value="wanita">Wanita</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="tmpt_lahir" className="control-label">Tempat Lahir</label>
                            <input type="text" name="tmpt_lahir" className="form-control" id="tmpt_lahir" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="tgl_lahir" className="control-label">Tgl Lahir</label>
                            <input type="date" name="tgl_lahir" className="form-control" id="tgl_lahir" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Agama</label>
                            <select required name="agama" className="form-control">
                                <option value="">--- Pilih Agama ---</option>
                                <option value="Islam">Islam</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="alamat" className="control-label">Alamat</label>
                            <input type="text" name="alamat" className="form-control" id="alamat" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="no_telp" className="control-label">No. Telp</label>
                            <input type="number" name="no_telp" className="form-control" id="no_telp" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="asal_sekolah" className="control-label">Sekolah Asal</label>
                            <input type="text" name="asal_sekolah" className="form-control" id="asal_sekolah" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="alamat_asal_sekolah" className="control-label">Alamat Sekolah Asal</label>
                            <input type="text" name="alamat_asal_sekolah" className="form-control" id="alamat_asal_sekolah" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="diterima_kelas" className="control-label">Diterima di kelas</label>
                            <select required name="diterima_kelas" id="diterima_kelas" className="form-control">
                                <option value="">--- Pilih Di Kelas ---</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="tgl_diterima" className="control-label">Diterima Tgl</label>
                            <input type="date" name="tgl_diterima" className="form-control" id="tgl_diterima" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="ortu_ayah" className="control-label">Nama Ayah</label>
                            <input type="text" name="ortu_ayah" className="form-control" id="ortu_ayah" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="ortu_ibu" className="control-label">Nama Ibu</label>
                            <input type="text" name="ortu_ibu" className="form-control" id="ortu_ibu" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="alamat_ortu" className="control-label">Alamat Ortu</label>
                            <input type="text" name="alamat_ortu" className="form-control" id="alamat_ortu" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="no_ortu" className="control-label">Telp Ortu</label>
                            <input type="number" name="no_ortu" className="form-control" id="no_ortu" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="pkj_ortu_ayah" className="control-label">Pekerjaan Ayah</label>
                            <input type="text" name="pkj_ortu_ayah" className="form-control" id="pkj_ortu_ayah" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="pkj_ortu_bu" className="control-label">Pekerjaan Ibu</label>
                            <input type="text" name="pkj_ortu_bu" className="form-control" id="pkj_ortu_bu" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="wali" className="control-label">Nama wali</label>
                            <input type="text" name="wali" className="form-control" id="wali" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="alamat_wali" className="control-label">Alamat Wali</label>
                            <input type="text" name="alamat_wali" className="form-control" id="alamat_wali" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="no_wali" className="control-label">No. Wali</label>
                            <input type="text" name="no_wali" className="form-control" id="no_wali" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="pkj_wali" className="control-label">Pekerjaan Wali</label>
                            <input type="text" name="pkj_wali" className="form-control" id="pkj_wali" />
                        </div>
                    </div>
                    <div className="box-footer">
                        <button type="submit" className="btn btn-primary pull-left">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TabInputSiswa