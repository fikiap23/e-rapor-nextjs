'use client'
import { useState } from 'react'
import AddClassModal from './addClassModal'
import Link from 'next/link'
import TabTableClass from './tabTableClass'
import TabInputStudent from './addStudentToClassView'

export default function ClassView() {
  const Rombel = [
    { id: 1, tingkat: 'Usia 2-3', rombel: 'Rombel A1', kuota: 10, terisi: 5 },
    { id: 2, tingkat: 'Usia 3-4', rombel: 'Rombel B1', kuota: 20, terisi: 10 },
    { id: 3, tingkat: 'Usia 4-5', rombel: 'Rombel C1', kuota: 30, terisi: 15 },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab: any) => {
    setActiveTab(tab)
    // console.log(tab);
  }
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div
            className="flash-data"
            data-flashdata=""
            data-flashstatus=""
          ></div>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-home"></i> Data Rombel
                  </h3>
                </div>
                <div className="nav-tabs-pills">
                  <ul className="nav nav-tabs">
                    <li className={activeTab === 'view' ? 'active' : ''}>
                      <Link href="" onClick={() => handleTabChange('view')}>
                        Kelola Rombel
                      </Link>
                    </li>
                    <li className={activeTab === 'input' ? 'active' : ''}></li>
                  </ul>
                  {activeTab === 'view' && (
                    <TabTableClass rombel={Rombel} openModal={openModal} />
                  )}
                  {activeTab === 'input' && <TabInputStudent rombel={Rombel} />}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* add class */}
        <AddClassModal
          isOpen={isModalOpen}
          closeModal={closeModal}
        ></AddClassModal>
      </div>
    </>
  )
}
