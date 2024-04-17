'use client'
import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import CapaianPage from './component/capaianPage'
import TujuanPage from './component/tujuanPage'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import cpTpService from '@/services/cp-tp.service'

const { TabPane } = Tabs

const SubjecetView = () => {
  const [activeTab, setActiveTab] = useState('view')
  const { token } = useAuth()
  const [cpData, setCpData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCpData = async () => {
    try {
      setIsFetching(true)
      const response = await cpTpService.getCpTp()
      console.log(response)
      if (response) {
        setCpData(response?.data)
      }
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.error('Error:', error.message)
    }
  }
  useEffect(() => {
    if (isFetching) {
      fetchCpData()
    }
  }, [isFetching])

  const handleRefetch = () => {
    fetchCpData()
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-book"></i>{' '}
                  <span style={{ marginLeft: '10px' }}>
                    {' '}
                    Data Tujuan dan Capaian Pembelajaran
                  </span>
                </h3>
              </div>
              <div className="box-body">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <TabPane tab="Tujuan Pembelajaran" key="view">
                    {isFetching && <Loading />}
                    {!isFetching && (
                      <TujuanPage
                        cp={cpData}
                        token={token}
                        isLoading={isFetching}
                        refetch={handleRefetch}
                      />
                    )}
                  </TabPane>
                  <TabPane tab="Capaian Pembelajaran" key="input">
                    {isFetching && <Loading />}
                    {!isFetching && (
                      <CapaianPage
                        cp={cpData}
                        token={token}
                        refetch={handleRefetch}
                      />
                    )}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubjecetView
