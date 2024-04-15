'use client'
import { useState } from 'react'
import { Tabs, Alert } from 'antd'
import ManageTeacher from './manageTeacher'
import TeacherTable from './teacherTable'

const { TabPane } = Tabs

const TeacherView = () => {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <Alert
          message="Informasi Penting !!!"
          description={
            <>
              <p>
                1. Untuk Login Akun Guru baru harap gunakan{' '}
                <b>username dan password: NIP </b>
              </p>

              <p>
                2. <b>PASTIKAN GURU SUDAH AKTIF!! </b>
              </p>
            </>
          }
          type="info"
          showIcon
        />
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-user"></i>{' '}
                  <span style={{ marginLeft: '10px' }}> Data Guru </span>
                </h3>
              </div>
              <div className="box-body">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <TabPane tab="Kelola Guru" key="view">
                    <ManageTeacher />
                  </TabPane>
                  <TabPane tab="Daftarkan Guru di Rombel" key="daftarkan_guru">
                    <TeacherTable />
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

export default TeacherView
