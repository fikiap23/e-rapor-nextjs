import { useState } from 'react'
import { Modal, Form, Input, Select, DatePicker, Switch, Button } from 'antd'
import Swal from 'sweetalert2'
import semesterService from '@/services/semester.service'

const { Option } = Select

const AddSemesterModal = ({ isOpen, closeModal, refetch, token }) => {
  const [form] = Form.useForm()
  const [isAktif, setIsAktif] = useState(false)

  const handleToggle = (checked) => {
    setIsAktif(checked)
  }

  const clearForm = () => {
    form.resetFields()
    setIsAktif(false)
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const data = { ...values, isAktif }
      await semesterService
        .create(data, token)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Data semester telah ditambahkan',
            position: 'bottom-center',
          })
          clearForm()
          refetch()
          closeModal()
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            position: 'bottom-center',
          })
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terdapat kesalahan saat menambahkan data semester',
        position: 'bottom-center',
      })
    }
  }

  return (
    <Modal
      title="Tambah Semester"
      visible={isOpen}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Batal
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Simpan
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="tahunAjaranAwal"
          label="Tahun Ajaran Awal"
          rules={[{ required: true, message: 'Tahun Ajaran Awal harus diisi' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="tahunAjaranAkhir"
          label="Tahun Ajaran Akhir"
          rules={[
            { required: true, message: 'Tahun Ajaran Akhir harus diisi' },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="jenisSemester"
          label="Semester"
          rules={[{ required: true, message: 'Semester harus dipilih' }]}
        >
          <Select placeholder="Pilih Semester">
            <Option value="GANJIL">Ganjil</Option>
            <Option value="GENAP">Genap</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="namaKepsek"
          label="Kepala Sekolah"
          rules={[
            { required: true, message: 'Nama Kepala Sekolah harus diisi' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nipKepsek"
          label="NIP"
          rules={[{ required: true, message: 'NIP harus diisi' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tglBagiRapor"
          label="Tanggal Bagi Raport"
          rules={[
            { required: true, message: 'Tanggal Bagi Raport harus diisi' },
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Status Aktif">
          <Switch checked={isAktif} onChange={handleToggle} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddSemesterModal
