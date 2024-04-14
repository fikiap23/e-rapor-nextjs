'use client'
import { getBase64 } from '@/lib/helper'
import { apiUrl } from '@/services/apiUrls'
import sekolahService from '@/services/sekolah.service'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function SchoolForm({ sekolahData, token }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(sekolahData)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    setFormData(sekolahData)
    setFileList(
      sekolahData.logo
        ? [{ uid: '-1', url: `${apiUrl}/${sekolahData.logo}` }]
        : []
    )
  }, [sekolahData, formData])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  const handleSubmit = (event) => {
    let payload
    if (fileList[0]?.originFileObj) {
      const fotoBinary = fileList[0].originFileObj
      payload = {
        ...formData,
        logo: fotoBinary, // Menggunakan binary data foto
      }
    } else {
      payload = {
        ...formData,
      }
    }

    console.log(payload)
    try {
      sekolahService
        .update(token, payload)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data sekolah telah diperbarui',
            position: 'bottom-center',
          })
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            position: 'bottom-center',
          })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        position: 'top-right',
      })
    }
    setIsEditing(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="box-body">
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nama" className="control-label">
                Nama Sekolah
              </label>
              <input
                type="text"
                name="nama"
                className="form-control"
                id="nama"
                value={formData.nama}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamat" className="control-label">
                Alamat Sekolah
              </label>
              <textarea
                name="alamat"
                className="form-control"
                id="alamat"
                value={formData.alamat}
                readOnly={!isEditing}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="noTelepon" className="control-label">
                No. Telp Sekolah
              </label>
              <input
                type="number"
                name="noTelepon"
                className="form-control"
                id="noTelepon"
                value={formData.noTelepon}
                readOnly={!isEditing}
                onChange={handleInputChange}
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
                value={formData.npsn}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="kelurahan" className="control-label">
                Kelurahan/Desa
              </label>
              <input
                type="text"
                name="kelurahan"
                className="form-control"
                id="kelurahan"
                value={formData.kelurahan}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nipKepsek" className="control-label">
                NIP Kepala Sekolah
              </label>
              <input
                type="text"
                name="nipKepsek"
                className="form-control"
                id="nipKepsek"
                value={formData.nipKepsek}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="kecamatan" className="control-label">
                Kecamatan
              </label>
              <input
                type="text"
                name="kecamatan"
                className="form-control"
                id="kecamatan"
                value={formData.kecamatan}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kodePos" className="control-label">
                Kode Pos
              </label>
              <input
                type="number"
                name="kodePos"
                className="form-control"
                id="kodePos"
                value={formData.kodePos}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="kota" className="control-label">
                Kabupaten
              </label>
              <input
                type="text"
                name="kota"
                className="form-control"
                id="kota"
                value={formData.kota}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="provinsi" className="control-label">
                Provinsi
              </label>
              <input
                type="text"
                name="provinsi"
                className="form-control"
                id="provinsi"
                value={formData.provinsi}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="namaDisdik" className="control-label">
                Nama Disdik
              </label>
              <input
                type="text"
                name="namaDisdik"
                className="form-control"
                id="namaDisdik"
                value={formData.namaDisdik}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="namaKapsek" className="control-label">
                Nama Kepala Sekolah
              </label>
              <input
                type="text"
                name="namaKapsek"
                className="form-control"
                id="namaKapsek"
                value={formData.namaKapsek}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo" className="control-label">
                Logo Sekolah
              </label>
              <>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  accept="image/*"
                  multiple={true}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length > 0 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </>
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
