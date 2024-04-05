import React, { useState } from 'react'
import { DynamicInput, useInputs } from './DynamicInput'
import modulAjarService from '@/services/modulAjarService/modul-ajar.service'
import Swal from 'sweetalert2'

const InputModulAjar = ({ tujuanPembelajarans, refetch, token }) => {
  const [formData, setFormData] = useState({
    minggu: '',
    topik: '',
    subtopik: '',
    startDate: '',
    endDate: '',
    idTujuanPembelajaran: '',
  })

  const {
    inputs: tujuanKegiatan,
    handleAddInput: handleAddTujuanKegiatan,
    handleInputChange: handleChangeTujuanKegiatan,
    handleRemoveInput: handleRemoveTujuanKegiatan,
  } = useInputs({ label: 'Tujuan Kegiatan' })

  const [kataKunci, setKataKunci] = useState('')
  const [alatBahan, setAlatBahan] = useState('')
  const [petaKonsep, setPetaKonsep] = useState('')
  const [selectedTp, setSelectedTp] = useState(null)

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    if (field === 'minggu') {
      tujuanPembelajarans.forEach((tp) => {
        if (tp.minggu.toString() === value) {
          setSelectedTp(tp)
          setFormData({
            ...formData,
            [field]: tp.minggu,
            ['idTujuanPembelajaran']: tp.id,
          })
        }
      })
    } else {
      setFormData({
        ...formData,
        [field]: value,
      })
    }
  }

  const clearForm = () => {
    setFormData({
      minggu: '',
      topik: '',
      subtopik: '',
      startDate: '',
      endDate: '',
      idTujuanPembelajaran: '',
    })
    setKataKunci('')
    setAlatBahan('')
    setPetaKonsep('')
    setSelectedTp(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      ...formData,
      katakunci: kataKunci.split(',').map((kata) => kata.trim()),
      alatBahan: alatBahan.split(',').map((alat) => alat.trim()),
      petaKonsep: petaKonsep.split(',').map((peta) => peta.trim()),
      tujuanKegiatan: tujuanKegiatan.map((tujuan) => tujuan.value),
    }

    try {
      modulAjarService
        .create(payload, token)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data modul ajar telah ditambahkan',
            position: 'bottom-center',
          })
          clearForm()
          refetch()
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
        <form onSubmit={handleSubmit}>
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
                <option value="" disabled>
                  Pilih Minggu
                </option>
                {tujuanPembelajarans.map((tp) => (
                  <option key={tp.id} value={tp.minggu}>
                    {tp.minggu}
                  </option>
                ))}
              </select>
            </div>

            {selectedTp && (
              <div className="form-group">
                <label
                  htmlFor="tujuanPembelajaranAgamaBudipekerti"
                  className="control-label"
                >
                  Tujuan Pembelajaran Nilai Agama dan Budi Pekerti
                </label>
                <textarea
                  type="text"
                  name="tujuanPembelajaranAgamaBudipekerti"
                  rows="5"
                  className="form-control"
                  id="tujuanPembelajaranAgamaBudipekerti"
                  value={selectedTp.tujuanPembelajaranAgamaBudipekerti}
                  readOnly={true}
                />
              </div>
            )}

            {selectedTp && (
              <div className="form-group">
                <label
                  htmlFor="tujuanPembelajaranJatiDiri"
                  className="control-label"
                >
                  Tujuan Pembelajaran Jati Diri
                </label>
                <textarea
                  type="text"
                  name="tujuanPembelajaranJatiDiri"
                  rows="5"
                  className="form-control"
                  id="tujuanPembelajaranJatiDiri"
                  value={selectedTp.tujuanPembelajaranJatiDiri}
                  readOnly={true}
                />
              </div>
            )}

            {selectedTp && (
              <div className="form-group">
                <label
                  htmlFor="tujuanPembelajaranLiterasiSains"
                  className="control-label"
                >
                  Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa dan
                  Seni
                </label>
                <textarea
                  type="text"
                  name="tujuanPembelajaranLiterasiSains"
                  rows="5"
                  className="form-control"
                  id="tujuanPembelajaranLiterasiSains"
                  value={selectedTp.tujuanPembelajaranLiterasiSains}
                  readOnly={true}
                />
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
                  onChange={(e) =>
                    handleFormChange('startDate', e.target.value)
                  }
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
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InputModulAjar
