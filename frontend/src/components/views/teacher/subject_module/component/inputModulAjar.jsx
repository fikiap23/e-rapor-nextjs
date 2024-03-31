import React, { useState } from 'react'
import { DynamicInput, useInputs } from './input/DynamicInput'
import useAuth from '@/hooks/useAuth'
import { useMapels } from '@/services/mapelService/useMapel'
import Swal from 'sweetalert2'
import modulAjarService from '@/services/modulAjarService/modul-ajar.service'

const InputModulAjar = ({ refetch }) => {
  const { token } = useAuth()
  const { data: mapels, isFetching: isFetchingMapels } = useMapels(token)
  const [formData, setFormData] = useState({
    minggu: '',
    topik: '',
    subtopik: '',
    startDate: '',
    endDate: '',
    capaianPembelajaran: '',
    idMapel: '',
  })
  const {
    inputs: tujuanPembelajaran,
    handleAddInput: handleAddTujuanPembelajaran,
    handleInputChange: handleChangeTujuanPembelajaran,
    handleRemoveInput: handleRemoveTujuanPembelajaran,
  } = useInputs({ label: 'Tujuan Pembelajaran' })

  const {
    inputs: tujuanKegiatan,
    handleAddInput: handleAddTujuanKegiatan,
    handleInputChange: handleChangeTujuanKegiatan,
    handleRemoveInput: handleRemoveTujuanKegiatan,
  } = useInputs({ label: 'Tujuan Kegiatan' })

  const [katakunci, setKataKunci] = useState('')
  const [alatBahan, setAlatBahan] = useState('')
  const [petaKonsep, setPetaKonsep] = useState('')

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const clearForm = () => {
    setFormData({
      minggu: '',
      topik: '',
      subtopik: '',
      startDate: '',
      endDate: '',
      capaianPembelajaran: '',
      idMapel: '',
    })

    setKataKunci('')
    setAlatBahan('')
    setPetaKonsep('')
  }

  const handleSubmit = (event) => {
    const payload = {
      ...formData,
      katakunci: katakunci.split(',').map((kata) => kata.trim()),
      alatBahan: alatBahan.split(',').map((alat) => alat.trim()),
      petaKonsep: petaKonsep.split(',').map((peta) => peta.trim()),
      tujuanPembelajaran: tujuanPembelajaran.map((tujuan) => tujuan.value),
      tujuanKegiatan: tujuanKegiatan.map((tujuan) => tujuan.value),
    }

    if (
      payload.minggu === '' ||
      payload.topik === '' ||
      payload.startDate === '' ||
      payload.endDate === '' ||
      payload.capaianPembelajaran === '' ||
      payload.idMapel === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data tidak boleh ada yang kosong',
        position: 'bottom-center',
      })
      return
    }
    try {
      modulAjarService
        .create(payload, token)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data modul telah ditambahkan',
            position: 'bottom-center',
          })
          refetch()
          clearForm()
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
  }

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="minggu">Minggu</label>
            <select
              className="form-control"
              id="minggu"
              name="minggu"
              value={formData.minggu}
              onChange={(e) => handleFormChange('minggu', e.target.value)}
              required
            >
              <option value="">Pilih Minggu</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          {!isFetchingMapels && (
            <div className="form-group">
              <label htmlFor="idMapel">Mata Pelajaran</label>
              <select
                className="form-control"
                id="idMapel"
                name="idMapel"
                value={formData.idMapel}
                onChange={(e) => handleFormChange('idMapel', e.target.value)}
                required
              >
                <option value="">Pilih Mata Pelajaran</option>
                {mapels.map((mapel, index) => (
                  <option key={mapel.id} value={mapel.id}>
                    {mapel.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="form-group" style={{ width: '30%' }}>
              <label htmlFor="startDate">Tanggal Mulai</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={(e) => handleFormChange('startDate', e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ width: '30%' }}>
              <label htmlFor="endDate">Tanggal Akhir</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={(e) => handleFormChange('endDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="topik">Topik</label>
            <input
              type="text"
              className="form-control"
              id="topik"
              name="topik"
              placeholder="Masukan Topik"
              value={formData.topik}
              onChange={(e) => handleFormChange('topik', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtopik">Sub Topik</label>
            <input
              type="text"
              className="form-control"
              id="subtopik"
              name="subtopik"
              placeholder="Masukan Sub Topik"
              value={formData.subtopik}
              onChange={(e) => handleFormChange('subtopik', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="katakunci">Kata Kunci</label>
            <input
              type="text"
              className="form-control"
              id="katakunci"
              name="katakunci"
              placeholder="Masukan Kata Kunci"
              value={katakunci}
              onChange={(e) => setKataKunci(e.target.value)}
              required
            />
            <small>Gunakan koma untuk memisahkan kata</small>
          </div>

          <div className="form-group">
            <label htmlFor="alatBahan">Alat dan Bahan</label>
            <input
              type="text"
              className="form-control"
              id="alatBahan"
              name="alatBahan"
              placeholder="Masukan Alat dan Bahan"
              value={alatBahan}
              onChange={(e) => setAlatBahan(e.target.value)}
              required
            />
            <small>Gunakan koma untuk memisahkan kata</small>
          </div>

          <div className="form-group">
            <label htmlFor="petaKonsep">Peta Konsep</label>
            <input
              type="text"
              className="form-control"
              id="petaKonsep"
              name="petaKonsep"
              placeholder="Masukan Peta Konsep"
              value={petaKonsep}
              onChange={(e) => setPetaKonsep(e.target.value)}
              required
            />
            <small>Gunakan koma untuk memisahkan kata</small>
          </div>

          <div className="form-group">
            <label>Capaian Pembelajaran</label>
            <textarea
              className="form-control"
              rows="5"
              name="capaianPembelajaran"
              placeholder="Masukkan Capaian"
              required
              value={formData.capaianPembelajaran}
              onChange={(e) =>
                handleFormChange('capaianPembelajaran', e.target.value)
              }
            />
          </div>

          {/* Form input TujuanPembelajaran */}
          {tujuanPembelajaran.map((input, index) => (
            <DynamicInput
              key={input.id}
              label={input.label}
              id={input.id}
              value={input.value}
              onChange={(e) =>
                handleChangeTujuanPembelajaran(index, e.target.value)
              }
              onAdd={() => handleAddTujuanPembelajaran(index)}
              onRemove={() => handleRemoveTujuanPembelajaran(index)}
              showRemoveButton={index > 0}
            />
          ))}
          <div
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: 'black',
              margin: '20px 0',
            }}
          ></div>
          {/* Form inputTujuanKegiatan */}
          {tujuanKegiatan.map((input, index) => (
            <DynamicInput
              key={input.id}
              label={input.label}
              id={input.id}
              value={input.value}
              onChange={(e) =>
                handleChangeTujuanKegiatan(index, e.target.value)
              }
              onAdd={() => handleAddTujuanKegiatan(index)}
              onRemove={() => handleRemoveTujuanKegiatan(index)}
              showRemoveButton={index > 0}
            />
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmit} className="btn btn-primary">
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputModulAjar
