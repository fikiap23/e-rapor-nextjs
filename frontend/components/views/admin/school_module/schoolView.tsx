'use client'
import { useState } from 'react'
import Link from 'next/link'

function SchoolView() {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab: any) => {
    setActiveTab(tab)
    // console.log(tab);
  }
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Portal Sekolah !!!
          </h4>
          <p>
            Ini adalah portal sekolah. Sebagai Admin anda dapat mengelola data
            sekolah.
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="nav-tabs-custom">
              <div className="tab-content">
                <ul className="nav nav-tabs">
                  <li className={activeTab === 'view' ? 'active' : ''}>
                    <Link href="" onClick={() => handleTabChange('view')}>
                      Lihat Sekolah
                    </Link>
                  </li>
                  <li className={activeTab === 'input' ? 'active' : ''}>
                    <Link href="" onClick={() => handleTabChange('input')}>
                      Edit Sekolah
                    </Link>
                  </li>
                </ul>
                <div className="active tab-pane" id="input-sekolah">
                  <div className="box-body">
                    <form
                      role="form"
                      action="/admin/sekolah/create"
                      method="POST"
                    >
                      <div className="row">
                        <div className="form-group">
                          <label
                            htmlFor="nama_sekolah"
                            className="control-label"
                          >
                            Nama Sekolah
                          </label>
                          <input
                            type="text"
                            name="nama_sekolah"
                            className="form-control"
                            id="nama_sekolah"
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <label
                            htmlFor="alamat_sekolah"
                            className="control-label"
                          >
                            Alamat Sekolah
                          </label>
                          <input
                            type="text"
                            name="alamat_sekolah"
                            className="form-control"
                            id="alamat_sekolah"
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <label
                            htmlFor="no_telp_sekolah"
                            className="control-label"
                          >
                            No. Telp Sekolah
                          </label>
                          <input
                            type="number"
                            name="no_telp_sekolah"
                            className="form-control"
                            id="no_telp_sekolah"
                          />
                        </div>
                      </div>
                      <div className="box-footer">
                        <button
                          type="submit"
                          className="btn btn-primary pull-left"
                        >
                          Simpan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SchoolView
