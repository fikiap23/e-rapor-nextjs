'use client'
import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import AddClassModal from './modal/addClassModal'
import TabTableClass from './tabTableClass'
import SetClass from './setClass'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import { useGetAllRombel } from '@/hooks/useRombel'

const { TabPane } = Tabs

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
                <div className="box-body">
                  <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="Kelola Rombel" key="view">
                      <TabTableClass
                        rombels={rombels}
                        openModal={openModal}
                        setRombels={setRombels}
                        isLoading={isFetchingSRombel}
                      />
                    </TabPane>
                    <TabPane tab="Lihat Rombel" key="view_rombel">
                      {isFetchingSRombel ? (
                        <Loading />
                      ) : (
                        <SetClass rombels={rombels} />
                      )}
                    </TabPane>
                  </Tabs>
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
