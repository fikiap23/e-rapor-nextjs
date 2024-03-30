'use client'
import { useEffect, useState } from 'react'
import AddClassModal from './modal/addClassModal'
import Link from 'next/link'
import TabTableClass from './tabTableClass'
import SetClass from './setClass'
import useAuth from '@/hooks/useAuth'
import { useGetAllRombel } from '@/services/rombelService/useRombel'

export default function ClassView() {
  const [rombels, setRombels] = useState([])
  const { token } = useAuth()
  const {
    data: listRombel,
    error: errorSRombel,
    isFetching: isFetchingSRombel,
  } = useGetAllRombel(token)

  useEffect(() => {
    setRombels(listRombel)
  }, [listRombel])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab) => {
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
                    <li className={activeTab === 'view_rombel' ? 'active' : ''}>
                      <Link
                        href=""
                        onClick={() => handleTabChange('view_rombel')}
                      >
                        Lihat Rombel
                      </Link>
                    </li>
                  </ul>
                  {activeTab === 'view' &&
                    (isFetchingSRombel ? (
                      <div>Loading...</div>
                    ) : (
                      <TabTableClass rombel={rombels} openModal={openModal} />
                    ))}
                  {activeTab === 'view_rombel' &&
                    (isFetchingSRombel ? (
                      <div>Loading...</div>
                    ) : (
                      <SetClass rombels={rombels} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* add class */}
        <AddClassModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          setRombels={setRombels}
        ></AddClassModal>
      </div>
    </>
  )
}
