import React, { useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const { Option } = Select

const InputPenilaianModal = ({
  idMurid,
  idRombelSemesterGuru,
  tp,
  isOpen,
  closeModal,
  refetch,
  token,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const payload = {
        idMurid: idMurid,
        idRombelSemesterGuru: idRombelSemesterGuru,
        ...values,
      }
      console.log('Form values:', payload)
      form.resetFields()
    } catch (error) {
      console.error('Failed to validate form', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Input Nilai"
      visible={isOpen}
      onCancel={closeModal}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nilai Agama Budipekerti"
          name="nilaiAgamaBudipekerti"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="BELUM_BERKEMBANG">BELUM BERKEMBANG</Option>
            <Option value="MULAI_BERKEMBANG">MULAI BERKEMBANG</Option>
            <Option value="SUDAH_BERKEMBANG">SUDAH BERKEMBANG</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Deskripsi Nilai Agama Budipekerti"
          name="deskripsiAgamaBudipekerti"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={tp?.tujuanPembelajaranAgamaBudipekerti}
          />
        </Form.Item>
        <Form.Item
          label="Nilai Jati Diri"
          name="nilaiJatiDiri"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="BELUM_BERKEMBANG">BELUM BERKEMBANG</Option>
            <Option value="MULAI_BERKEMBANG">MULAI BERKEMBANG</Option>
            <Option value="SUDAH_BERKEMBANG">SUDAH BERKEMBANG</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Deskripsi Nilai Jati Diri"
          name="deskripsiJatiDiri"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={tp?.tujuanPembelajaranJatiDiri}
          />
        </Form.Item>
        <Form.Item
          label="Nilai Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa dan Seni"
          name="nilaiLiterasiSains"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="BELUM_BERKEMBANG">BELUM BERKEMBANG</Option>
            <Option value="MULAI_BERKEMBANG">MULAI BERKEMBANG</Option>
            <Option value="SUDAH_BERKEMBANG">SUDAH BERKEMBANG</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Deskripsi Nilai Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa dan Seni"
          name="deskripsiLiterasiSains"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={tp?.tujuanPembelajaranLiterasiSains}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default InputPenilaianModal
