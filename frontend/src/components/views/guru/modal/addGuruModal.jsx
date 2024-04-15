import { Modal, Form, Input, Select, Button } from 'antd'
import teacherService from '@/services/guru.service'
import { useState } from 'react'

const { Option } = Select

const AddModal = ({ isOpen, closeModal, refetch, token }) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    const values = await form.validateFields()
    setIsLoading(true)
    await teacherService
      .create(values, token)
      .then((result) => {
        refetch()
        Modal.success({
          title: 'Add Berhasil!',
          content: 'Data guru telah ditambahkan',
        })
        form.resetFields()
        setIsLoading(false)
        closeModal()
      })
      .catch((error) => {
        setIsLoading(false)
        Modal.error({
          title: 'Oops...',
          content: 'Terjadi kesalahan: ' + error,
        })
      })
  }

  return (
    <Modal
      visible={isOpen}
      title="Guru"
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Batal
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Simpan
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nip"
          label="NIP"
          rules={[{ required: true, message: 'Masukan NIP' }]}
        >
          <Input type="number" placeholder="Masukan NIP" />
        </Form.Item>
        <Form.Item
          name="nama"
          label="Nama"
          rules={[{ required: true, message: 'Masukan Nama' }]}
        >
          <Input type="text" placeholder="Masukan Nama" />
        </Form.Item>
        <Form.Item
          name="jenisKelamin"
          label="Jenis Kelamin"
          rules={[{ required: true, message: 'Pilih Jenis Kelamin' }]}
        >
          <Select placeholder="Pilih Jenis Kelamin">
            <Option value="L">Pria</Option>
            <Option value="P">Wanita</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddModal
