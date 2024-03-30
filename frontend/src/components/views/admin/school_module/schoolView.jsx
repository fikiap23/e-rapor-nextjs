'use client'
import { useState } from 'react'
import SchoolForm from './component/schoolForm'

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
            <div className="box box-solid box-primary">
              <SchoolForm></SchoolForm>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SchoolView
