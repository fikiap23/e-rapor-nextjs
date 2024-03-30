import React, { useState } from 'react'

function SchoolForm() {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
    // Add logic here to enable editing of form fields
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsEditing(false)
  }

  return (
    <div className="box-body">
      <div>
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
                value={'TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL'}
                readOnly={!isEditing}
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
                value={
                  'Jl. H. Baping No.100 Kelurahan Ciracas Kecamatan Ciracas Kota Jakarta Timur'
                }
                readOnly={!isEditing}
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
                value={'082946246'}
                readOnly={!isEditing}
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
                value={'2146517478'}
                readOnly={!isEditing}
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
                value={'Cakung'}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="authorities" className="control-label">
                NIP Kepala Sekolah
              </label>
              <input
                type="text"
                name="nipKapsek"
                className="form-control"
                id="nipKapsek"
                value={'19890902'}
                readOnly={!isEditing}
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
                value={'Ujung Menteng'}
                readOnly={!isEditing}
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
                value={'123'}
                readOnly={!isEditing}
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
                value={'JAKARTA'}
                readOnly={!isEditing}
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
                value={'DKI Jakarta'}
                readOnly={!isEditing}
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
                value={'DINAS PENDIDIKAN DKI JAKARTA (KOTA JAKARTA TIMUR)'}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="authorities" className="control-label">
                Nama Kepala Sekolah
              </label>
              <input
                type="text"
                name="namaKapsek"
                className="form-control"
                id="namaKapsek"
                value={'SITI NURAINI'}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
        {/* Tombol Edit/Simpan */}
        <div className="box-footer">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="btn btn-primary pull-left"
            >
              Simpan
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary pull-left"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SchoolForm
