import React, { useState } from 'react'
import { Table } from 'antd'
import UploadExcelComponent from '@/components/shared/UploadExcel'
const UploadSiswaExcel = ({ token }) => {
  const [state, setState] = useState({
    tableData: [],
    tableHeader: [],
  })

  console.log(state.tableData)

  const handleSuccess = ({ results, header }) => {
    setState({
      ...state,
      tableData: results,
      tableHeader: header,
    })
  }
  return (
    <div className="app-container">
      <UploadExcelComponent uploadSuccess={handleSuccess} />
      <br />
      <Table
        bordered
        scroll={{ x: 1500 }}
        columns={state.tableHeader.map((item) => ({
          title: item,
          dataIndex: item,
          key: item,
          width: 195,
          align: 'center',
        }))}
        dataSource={state.tableData}
      />
    </div>
  )
}

export default UploadSiswaExcel
