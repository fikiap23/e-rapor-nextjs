import { Modal, Form, Input, Button, Select } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useGetAllKategoriRombel } from '@/hooks/useKategoriRombel'
import rombelService from '@/services/rombel.service'
import React, { useState } from 'react'

const { Option } = Select

const AddClassModal = ({ isOpen, closeModal, setRombels }) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()
  const { data: listKategoriRombel } = useGetAllKategoriRombel(token)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const values = await form.validateFields()
      const payload = {
        idKategoriRombel: values.idKategoriRombel,
        name: values.noRombel,
        kuota: values.kuota,
      }
      await rombelService
        .createRombel(token, payload)
        .then((result) => {
          Modal.success({
            title: 'Berhasil',
            position: 'bottom-center',
            content: 'Data rombel telah ditambahkan',
          })
          setRombels((prevRombels) => [...prevRombels, result.data])
          form.resetFields()
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
    }
  }

  return (
    <Modal
      visible={isOpen}
      title="Tambah Rombel"
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
          Simpan
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Kelompok Usia"
          name="idKategoriRombel"
          rules={[{ required: true, message: 'Pilih Kelompok Usia' }]}
        >
          <Select
            placeholder="Pilih Kelompok Usia"
            onChange={(value) => {
              const selectedKelompokUsia = listKategoriRombel.find(
                (item) => item.id === value
              )
              form.setFieldsValue({
                kodeKelompokUsia: selectedKelompokUsia?.kode || '',
                noRombel: selectedKelompokUsia?.kode || '',
              })
            }}
          >
            {listKategoriRombel.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.kelompokUsia}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kode Kelompok Usia" name="kodeKelompokUsia">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="No Rombel"
          name="noRombel"
          rules={[{ required: true, message: 'Masukkan no rombel!' }]}
        >
          <Input placeholder="Contoh: A1" />
        </Form.Item>
        <Form.Item
          label="Kuota"
          name="kuota"
          rules={[{ required: true, message: 'Masukkan kuota rombel!' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddClassModal
