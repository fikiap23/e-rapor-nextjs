'use client'
import useAuth from '@/hooks/useAuth'
import rombelService from '@/services/rombelService/rombel.service'
import { useGetAllKategoriRombel } from '@/services/rombelService/useKategoriRombel'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddClassModal = ({ isOpen, closeModal, setRombels }) => {
  const [kelompokUsia, setKelompokUsia] = useState('')
  const [kuota, setKuota] = useState('')
  const [kodeKelompokUsia, setKodeKelompokUsia] = useState('')
  const [selectedKelompokUsia, setSelectedKelompokUsia] = useState('')
  const [noRombel, setNoRombel] = useState('')
  const { token } = useAuth()
  const { data: listKategoriRombel } = useGetAllKategoriRombel(token)

  const handleSubmit = () => {
    const payload = {
      idKategoriRombel: selectedKelompokUsia.id,
      kuota: kuota,
      name: noRombel,
    }
    try {
      rombelService
        .createRombel(token, payload)
        .then((result) => {
          toast.success('Data rombel telah ditambahkan', {
            position: 'bottom-center',
          })
          setRombels((prevRombels) => [...prevRombels, result.data])
          closeModal()
        })
        .catch((error) => {
          toast.error(error, {
            position: 'bottom-center',
          })
        })
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
      })
    }
  }

  const handleKelompokUsiaChange = (e) => {
    setNoRombel('')
    const selectedKelompokUsia = listKategoriRombel.find(
      (item) => item.id === e.target.value
    )
    setSelectedKelompokUsia(selectedKelompokUsia)
    setKelompokUsia(e.target.value)
    setKodeKelompokUsia(selectedKelompokUsia.kode)
    setNoRombel(selectedKelompokUsia.kode + noRombel)
  }

  return (
    <div className={`modal fade ${isOpen ? 'in show-modal' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">Tambah Rombel</h4>
          </div>
          <div className="modal-body">
            <div className="box-body">
              <div className="form-group">
                <label htmlFor="kelompokUsia">Kelompok Usia</label>
                <select
                  className="form-control"
                  id="kelompokUsia"
                  name="kelompokUsia"
                  value={kelompokUsia}
                  onChange={handleKelompokUsiaChange}
                  required
                >
                  <option value="">Pilih Kelompok Usia</option>
                  {listKategoriRombel.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.kelompokUsia}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="kodeKelompokUsia">Kode Kelompok Usia</label>
                <input
                  type="text"
                  className="form-control"
                  id="kodeKelompokUsia"
                  name="kodeKelompokUsia"
                  value={kodeKelompokUsia}
                  readOnly
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="noRombel">No Rombel</label>
                <input
                  type="text"
                  className="form-control"
                  id="noRombel"
                  name="noRombel"
                  value={noRombel}
                  onChange={(e) => setNoRombel(e.target.value)}
                />
                <small className="form-text text-muted">
                  Contoh: A1, A2, B2
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="kuota">Kuota</label>
                <input
                  type="number"
                  className="form-control"
                  id="kuota"
                  name="kuota"
                  value={kuota}
                  onChange={(e) => setKuota(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleSubmit} className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddClassModal
