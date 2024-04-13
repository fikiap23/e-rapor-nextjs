'use client'
import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'

const { Dragger } = Upload

const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    let hdr = 'UNKNOWN ' + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

const UploadExcel = (props) => {
  const [excelData, setExcelData] = useState({
    header: null,
    results: null,
  })

  const draggerProps = () => {
    return {
      name: 'file',
      multiple: false,
      accept: '.xlsx, .xls, .csv',
      onChange(info) {
        const { status } = info.file
        if (status === 'done') {
          message.success(`${info.file.name} berhasil diupload`)
        } else if (status === 'error') {
          message.error(`${info.file.name} gagal diupload`)
        }
      },
      beforeUpload(file) {
        if (!isExcel(file)) {
          message.error('Only .xlsx, .xls, .csv files tidak valid')
          return false
        }
      },
      customRequest(e) {
        readerData(e.file).then(() => {
          e.onSuccess()
        })
      },
    }
  }

  const readerData = (rawFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = getHeaderRow(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        generateData({ header, results })
        resolve()
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  const generateData = ({ header, results }) => {
    setExcelData({ header, results })
    props.uploadSuccess && props.uploadSuccess({ header, results })
  }

  return (
    <div>
      <Dragger {...draggerProps()}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Klik atau seret file Excel (.xlsx, .xls, .csv)
        </p>
      </Dragger>
    </div>
  )
}

UploadExcel.propTypes = {
  uploadSuccess: PropTypes.func.isRequired,
}

export default UploadExcel
