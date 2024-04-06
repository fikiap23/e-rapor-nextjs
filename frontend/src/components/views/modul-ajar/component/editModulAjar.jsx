import React, { useState, useEffect } from 'react'
import { DynamicInput, useInputs } from './DynamicInput'
import modulAjarService from '@/services/modul-ajar.service'
import Swal from 'sweetalert2'
import { formatDate } from '@/lib/helperDate'

const EditModulAjar = ({
  modulAjarData,
  tujuanPembelajarans,
  refetch,
  token,
}) => {
  const [formData, setFormData] = useState({
    minggu: modulAjarData.minggu,
    topik: modulAjarData.topik,
    subtopik: modulAjarData.subtopik,
    startDate: formatDate(new Date(modulAjarData.startDate)),
    endDate: formatDate(new Date(modulAjarData.endDate)),
    idTujuanPembelajaran: modulAjarData.idTujuanPembelajaran,
  })
  console.log(modulAjarData)

  const {
    inputs: tujuanKegiatan,
    handleAddInput: handleAddTujuanKegiatan,
    handleInputChange: handleChangeTujuanKegiatan,
    handleRemoveInput: handleRemoveTujuanKegiatan,
  } = useInputs({
    label: 'Tujuan Kegiatan',
  })

  const [kataKunci, setKataKunci] = useState(modulAjarData.katakunci.join(', '))
  const [alatBahan, setAlatBahan] = useState(modulAjarData.alatBahan.join(', '))
  const [petaKonsep, setPetaKonsep] = useState(
    modulAjarData.petaKonsep.join(', ')
  )
  const [selectedTp, setSelectedTp] = useState(null)

  useEffect(() => {
    tujuanPembelajarans.forEach((tp) => {
      if (tp.minggu.toString() === modulAjarData.minggu.toString()) {
        setSelectedTp(tp)
      }
    })
  }, [tujuanPembelajarans, modulAjarData.minggu])

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
        .update(modulAjarData.id, payload, token)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data modul ajar telah diperbarui',
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
                <option value={modulAjarData.minggu}>
                  {modulAjarData.minggu}
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

            {/* Other form elements */}
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

            <div className="form-group">
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

export default EditModulAjar
