import cpTpService from '@/services/cp-tp.service'
import React, { useState } from 'react'
import { Modal, Form, Input, Select, Button, message } from 'antd'

const AddTujuanModal = ({ isOpen, closeModal, token, refetch }) => {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields()
      await cpTpService
        .createTp(token, formData)
        .then(() => {
          message.success('Data tujuan pembelajaran telah ditambahkan')
          form.resetFields()
          refetch()
          closeModal()
        })
        .catch((error) => {
          message.error(error)
        })
    } catch (error) {
      message.error('Gagal menambahkan tujuan pembelajaran')
    }
  }

  return (
    <Modal
      title="Tambah Tujuan Pembelajaran"
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
          name="minggu"
          label="Minggu"
          rules={[{ required: true, message: 'Pilih Minggu' }]}
        >
          <Select placeholder="Pilih Minggu">
            {Array.from({ length: 20 }, (_, i) => (
              <Select.Option key={i + 1} value={i + 1}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tujuanPembelajaranAgamaBudipekerti"
          label="NILAI AGAMA DAN BUDI PEKERTI"
          rules={[{ required: true, message: 'Tuliskan Tujuan Pembelajaran' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Tuliskan Tujuan Pembelajaran..."
          />
        </Form.Item>
        <Form.Item
          name="tujuanPembelajaranJatiDiri"
          label="JATI DIRI"
          rules={[{ required: true, message: 'Tuliskan Tujuan Pembelajaran' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Tuliskan Tujuan Pembelajaran..."
          />
        </Form.Item>
        <Form.Item
          name="tujuanPembelajaranLiterasiSains"
          label="DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI"
          rules={[{ required: true, message: 'Tuliskan Tujuan Pembelajaran' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Tuliskan Tujuan Pembelajaran..."
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTujuanModal
