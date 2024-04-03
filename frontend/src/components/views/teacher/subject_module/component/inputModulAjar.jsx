import React, { useState } from 'react'
import { DynamicInput, useInputs } from './DynamicInput'

const InputModulAjar = () => {
  const [formData, setFormData] = useState({
    minggu: '',
    topic: '',
    subtopik: '',
    startDate: '',
    endDate: '',
    capaianPembelajaran: '',
    idTujuanPembelajaran: '',
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

  const [kataKunci, setKataKunci] = useState('')
  const [alatBahan, setAlatBahan] = useState('')
  const [petaKonsep, setPetaKonsep] = useState('')

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (event) => {
    const payload = {
      ...formData,
      kataKunci: kataKunci.split(',').map((kata) => kata.trim()),
      alatBahan: alatBahan.split(',').map((alat) => alat.trim()),
      petaKonsep: petaKonsep.split(',').map((peta) => peta.trim()),
      tujuanPembelajaran: tujuanPembelajaran.map((tujuan) => tujuan.value),
      tujuanKegiatan: tujuanKegiatan.map((tujuan) => tujuan.value),
    }
    console.log(payload)
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
              {[...Array(14)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

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
            <label htmlFor="topic">Topik</label>
            <input
              type="text"
              className="form-control"
              id="topic"
              name="topic"
              placeholder="Masukan Topik"
              value={formData.topic}
              onChange={(e) => handleFormChange('topic', e.target.value)}
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
              value={kataKunci}
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
