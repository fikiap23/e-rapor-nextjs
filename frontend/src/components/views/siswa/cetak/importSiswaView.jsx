import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
import XLSX from 'xlsx'
import UploadExcelComponent from '@/components/shared/UploadExcel'
import siswaService from '@/services/siswa.service'

const UploadSiswaExcel = ({ token, refetch }) => {
  const [state, setState] = useState({
    tableData: [],
    tableHeader: [],
    showSaveButton: false, // Menambahkan state untuk menampilkan tombol simpan
  })

  const handleSuccess = ({ results, header }) => {
    setState({
      ...state,
      tableData: results,
      tableHeader: header,
      showSaveButton: true, // Menampilkan tombol simpan setelah berhasil unggah
    })
  }

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        nisn: '1234567890',
        nis: '12345',
        nama: 'Nama Murid 1',
        jenisKelamin: 'LAKI_LAKI',
        tempatLahir: 'Tempat Lahir 1',
        tanggalLahir: '2000-01-01T00:00:00Z',
        agama: 'ISLAM',
        alamat: 'Alamat Murid 1',
        tanggalMasuk: '2024-01-01T00:00:00Z',
        tinggiBadan: 170,
        beratBadan: 60,
        namaAyah: 'Nama Ayah 1',
        namaIbu: 'Nama Ibu 1',
        pekerjaanAyah: 'Pekerjaan Ayah 1',
        pekerjaanIbu: 'Pekerjaan Ibu 1',
      },
      {
        nisn: '0987654321',
        nis: '54321',
        nama: 'Nama Murid 2',
        jenisKelamin: 'PEREMPUAN',
        tempatLahir: 'Tempat Lahir 2',
        tanggalLahir: '2001-02-02T00:00:00Z',
        agama: 'ISLAM',
        alamat: 'Alamat Murid 2',
        tanggalMasuk: '2024-02-02T00:00:00Z',
        tinggiBadan: 160,
        beratBadan: 50,
        namaAyah: 'Nama Ayah 2',
        namaIbu: 'Nama Ibu 2',
        pekerjaanAyah: 'Pekerjaan Ayah 2',
        pekerjaanIbu: 'Pekerjaan Ibu 2',
      },
    ]

    const header = Object.keys(templateData[0])

    const data = [
      header,
      ...templateData.map((item) => header.map((key) => item[key])),
    ]

    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'template_import_siswa.xlsx')
  }

  const handleSaveData = () => {
    Modal.confirm({
      title: 'Konfirmasi Simpan Data',
      content: 'Apakah Anda yakin ingin menyimpan data?',
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        console.log(state.tableData)
        await siswaService
          .createMany(token, state.tableData)
          .then(() => {
            refetch()
            setState({ ...state, showSaveButton: false, tableData: [] })
            Modal.success({
              title: 'Success',
              content: 'Data telah disimpan',
            })
          })
          .catch((error) => {
            Modal.error({
              content: error,
              title: 'Oops...',
            })
          })
      },
      onCancel() {},
    })
  }

  return (
    <div className="app-container">
      <UploadExcelComponent uploadSuccess={handleSuccess} />
      <br />
      <Button type="primary" onClick={handleDownloadTemplate}>
        Download Template Excel
      </Button>
      <br />
      <br />
      {state.showSaveButton && (
        <Button
          onClick={handleSaveData}
          style={{ marginBottom: 16, backgroundColor: 'green', color: 'white' }}
        >
          Simpan Data
        </Button>
      )}
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
