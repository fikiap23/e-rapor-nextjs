'use client'
import Link from 'next/link'
import { useState } from 'react'
import LearningObjectivesInput from './input/learningObjectivesInput'
import LearningOutcomesInput from './input/activityGoalsInput'
import ConceptMapsInput from './input/conceptMapsInput'
import LearningAchievementsInput from './input/learningAchievementsInput'

function InputSubject() {
  const [activeTab, setActiveTab] = useState('learningObjectivesTab')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // console.log(tab);
  }

  const [minggu, setMinggu] = useState('')

  const handleMingguChange = (event) => {
    setMinggu(event.target.value)
  }

  const [date, setDate] = useState('')
  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const [dateResource, setDateResource] = useState('')
  const handleDateResourceChange = (event) => {
    setDateResource(event.target.value)
  }
  return (
    <div className="nav-tabs-custom">
      <ul className="nav nav-tabs">
        <li className={activeTab === 'learningObjectivesTab' ? 'active' : ''}>
          <Link
            href=""
            onClick={() => handleTabChange('learningObjectivesTab')}
          >
            Tujuan Pembelajaran
          </Link>
        </li>
        <li className={activeTab === 'learningAchievementsTab' ? 'active' : ''}>
          <Link
            href=""
            onClick={() => handleTabChange('learningAchievementsTab')}
          >
            Capaian Pembelajaran
          </Link>
        </li>
        <li className={activeTab === 'activityGoalsTab' ? 'active' : ''}>
          <Link href="" onClick={() => handleTabChange('activityGoalsTab')}>
            Tujuan Kegiatan
          </Link>
        </li>
        <li className={activeTab === 'conceptMapsTab' ? 'active' : ''}>
          <Link href="" onClick={() => handleTabChange('conceptMapsTab')}>
            Peta Konsep
          </Link>
        </li>
        <li className={activeTab === 'materialsTab' ? 'active' : ''}>
          <Link href="" onClick={() => handleTabChange('materialsTab')}>
            Alat dan Bahan
          </Link>
        </li>
        <li className={activeTab === 'learningResourcesTab' ? 'active' : ''}>
          <Link href="" onClick={() => handleTabChange('learningResourcesTab')}>
            Sumber
          </Link>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === 'learningObjectivesTab' && <LearningObjectivesInput />}
        {activeTab === 'learningAchievementsTab' && (
          <LearningAchievementsInput />
        )}
        {activeTab === 'activityGoalsTab' && <LearningOutcomesInput />}
        {activeTab === 'conceptMapsTab' && <ConceptMapsInput />}
        {activeTab === 'materialsTab' && (
          <div className="active tab-pane" id="input-siswa">
            <div className="box-body">
              <form role="form" action="/admin/siswa/create" method="POST">
                <div className="row">
                  <div className="form-group" style={{ width: '20%' }}>
                    <label htmlFor="minggu">Minggu</label>
                    <select
                      className="form-control"
                      id="minggu"
                      name="minggu"
                      value={minggu}
                      onChange={handleMingguChange}
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

                  <div className="form-group" style={{ width: '20%' }}>
                    <label htmlFor="date">Tanggal</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={date}
                      onChange={handleDateChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nis" className="control-label">
                      <i>
                        Gunakan koma(,) jika banyak sebagai contoh `Buku,
                        pensil`
                      </i>
                    </label>
                    <textarea
                      name="nis"
                      className="form-control"
                      placeholder="Masukan Alat dan Bahan"
                      id="nis"
                      required
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div className="box-footer">
              <button type="submit" className="btn btn-primary pull-left">
                Simpan
              </button>
            </div>
          </div>
        )}
        {activeTab === 'learningResourcesTab' && (
          <div className="active tab-pane" id="input-siswa">
            <div className="box-body">
              <form role="form" action="/admin/siswa/create" method="POST">
                <div className="row">
                  <div className="form-group" style={{ width: '20%' }}>
                    <label htmlFor="minggu">Minggu</label>
                    <select
                      className="form-control"
                      id="minggu"
                      name="minggu"
                      value={minggu}
                      onChange={handleMingguChange}
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

                  <div className="form-group" style={{ width: '20%' }}>
                    <label htmlFor="dateResource">Tanggal</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateResource"
                      name="dateResource"
                      value={dateResource}
                      onChange={handleDateResourceChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nis" className="control-label">
                      <i>
                        Gunakan koma(,) jika banyak sebagai contoh `Buku Anak
                        kelas 5, Buku LKS`
                      </i>
                    </label>
                    <textarea
                      name="nis"
                      className="form-control"
                      placeholder="Masukan Sumber"
                      id="nis"
                      required
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div className="box-footer">
              <button type="submit" className="btn btn-primary pull-left">
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputSubject
