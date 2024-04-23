import { Modal, Form, Input, Select, Button } from 'antd'
import useAuth from '@/hooks/useAuth'
import teacherService from '@/services/guru.service'
import { useState } from 'react'

const { Option } = Select

const UpdateGuruModal = ({ isOpen, closeModal, refetch, teacherData }) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()
  form.setFieldsValue({
    nip: teacherData.nip,
    username: teacherData.username,
    password: '',
    nama: teacherData.nama,
    jenisKelamin: teacherData.jenisKelamin,
  })

  const handleSubmit = async () => {
    const values = await form.validateFields()
    setIsLoading(true)
    await teacherService
      .update(token, teacherData.id, { ...values, idUser: teacherData.idUser })
      .then((res) => {
        Modal.success({
          title: 'Update Berhasil!',
          content: 'Data guru telah diperbarui',
        })
        setIsLoading(false)
        form.resetFields()
        closeModal()
        refetch()
      })
      .catch((error) => {
        Modal.error({
          title: 'Oops...',
          content: 'Terjadi kesalahan: ' + error,
        })
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
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
          label="NIP atau NIK"
          rules={[{ required: true, message: 'Masukan Nip atau Nik' }]}
        >
          <Input type="number" placeholder="Masukan Nip atau Nik" />
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

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Masukkan Username' }]}
        >
          <Input placeholder="Masukkan Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: false,
              min: 6,
              message: 'Masukkan Password, min. 6 karakter',
            },
          ]}
        >
          <Input.Password placeholder="Masukkan Password" min={6} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateGuruModal
