import { Modal, Form, Input, Button } from 'antd'
import rombelService from '@/services/rombel.service'
import { useEffect, useState } from 'react'

const UpdateGroupModal = ({
  isOpen,
  closeModal,
  refetch,
  selectedKategori,
  token,
}) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const { name, kelompokUsia, kode } = selectedKategori || {}

  useEffect(() => {
    form.setFieldsValue({ name, kelompokUsia, kode })
  }, [selectedKategori])

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const values = await form.validateFields()
      await rombelService
        .updateKategori(token, selectedKategori.id, values)
        .then((result) => {
          Modal.success({
            title: 'Berhasil!',
            content: 'Data kelompok usia rombel telah diperbarui',
          })
          refetch()
          closeModal()
          setIsLoading(false)
        })
        .catch((error) => {
          Modal.error({
            title: 'Oops...',
            content: 'Terjadi kesalahan: ' + error,
          })
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
      Modal.error({
        title: 'Oops...',
        content: 'Terjadi kesalahan',
      })
    }
  }

  return (
    <Modal
      visible={isOpen}
      title="Perbarui Data Kategori Rombel"
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
          label="Nama Kategori Rombel"
          name="name"
          rules={[{ required: true, message: 'Masukkan Nama' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kelompok Usia"
          name="kelompokUsia"
          rules={[{ required: true, message: 'Masukkan Kelompok Usia' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kode"
          name="kode"
          rules={[{ required: true, message: 'Masukkan Kode' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateGroupModal
