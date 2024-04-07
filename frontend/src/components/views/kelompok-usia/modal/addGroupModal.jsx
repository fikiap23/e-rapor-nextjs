import { Modal, Form, Input, Button } from 'antd'
import useAuth from '@/hooks/useAuth'
import rombelService from '@/services/rombel.service'
import { useState } from 'react'
import Swal from 'sweetalert2'

const AddGroupModal = ({ isOpen, closeModal, refetch }) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const values = await form.validateFields()
      await rombelService
        .createKategori(token, values)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data kelompok usia rombel telah ditambahkan',
          })
          form.resetFields()
          refetch()
          closeModal()
          setIsLoading(false)
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan: ' + error.toString(),
          })
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan',
      })
    }
  }

  return (
    <Modal
      visible={isOpen}
      title="Tambah Data Kelompok Usia"
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Batal
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Inisial Kelompok Usia"
          name="name"
          rules={[{ required: true, message: 'Masukkan Inisial' }]}
        >
          <Input placeholder="Masukkan Inisital kelompok usia" />
        </Form.Item>
        <Form.Item
          label="Kelompok Usia"
          name="kelompokUsia"
          rules={[
            { required: true, message: 'Masukkan Rentang Kelompok Usia' },
          ]}
        >
          <Input placeholder="Masukkan Kelompok Usia, contoh: 2-3 Tahun" />
        </Form.Item>
        <Form.Item
          label="Kode"
          name="kode"
          rules={[{ required: true, message: 'Masukkan Kode' }]}
        >
          <Input placeholder="Masukkan Kode, contoh: A" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddGroupModal
