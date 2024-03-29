'use client'
import { useState } from 'react'
import Link from 'next/link'
import TabSchool from './component/tabSchool'
import InputSchool from './component/InputSchool'

function SchoolView() {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
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
                <div className="tab-content">
                  {activeTab === 'view' && <TabSchool />}
                  {activeTab === 'input' && <InputSchool />}
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
