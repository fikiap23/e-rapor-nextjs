import React, { useState } from 'react'
import { Modal, Select, Input, Button, DatePicker, Form } from 'antd'
import jadwalAjarService from '@/services/jadwal-ajar.service'

const { Option } = Select

const AddModal = ({ isOpen, closeModal, modulAjars, token, refetch }) => {
  const [form] = Form.useForm()
  const [jumlahKegiatan, setJumlahKegiatan] = useState(1) // State untuk jumlah kegiatan inti

  const handleSubmit = async () => {
    let payload
    await form.validateFields().then((values) => {
      // Mendapatkan nilai dari setiap kegiatan inti dan menyimpannya dalam bentuk array
      const kegiatanIntiValues = []
      for (let i = 1; i <= jumlahKegiatan; i++) {
        kegiatanIntiValues.push(values[`kegiatanInti${i}`])
      }
      payload = {
        idModulAjar: values.idModulAjar,
        tanggal: values.tanggal,
        kegiatanInti: kegiatanIntiValues,
      }
    })
    await jadwalAjarService
      .create(payload, token)
      .then(() => {
        Modal.success({
          title: 'Berhasil',
          content: 'Berhasil menambahkan jadwal ajar',
        })
        form.resetFields()
        refetch()
        closeModal()
      })
      .catch((err) => {
        Modal.error({
          content: err,
          title: 'Oops...',
        })
      })
  }

  const handleJumlahKegiatanChange = (value) => {
    setJumlahKegiatan(value)
  }

  return (
    <Modal
      visible={isOpen}
      title="Jadwal Ajar"
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Batal
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Simpan
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Modul Ajar"
          name="idModulAjar"
          rules={[{ required: true }]}
        >
          <Select placeholder="Pilih Modul Ajar">
            {modulAjars.map((modul, index) => (
              <Option key={index + 1} value={modul.id}>
                {`Minggu Ke-${modul.minggu} (${modul.topik})`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tanggal" name="tanggal" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Jumlah Kegiatan Inti"
          name="jumlahKegiatan"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Pilih Jumlah Kegiatan Inti"
            onChange={handleJumlahKegiatanChange}
            value={jumlahKegiatan}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* Input untuk setiap kegiatan inti */}
        {[...Array(jumlahKegiatan)].map((_, index) => (
          <Form.Item
            key={index}
            label={`Kegiatan Inti ${index + 1}`}
            name={`kegiatanInti${index + 1}`}
            rules={[{ required: true, message: 'Kegiatan Inti harus diisi' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder={`Masukkan Kegiatan Inti ${index + 1}`}
            />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}

export default AddModal
