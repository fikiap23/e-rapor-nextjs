import React, { useState, useEffect } from 'react'
import { Modal, Select, Input, Button, DatePicker, Form } from 'antd'
import jadwalAjarService from '@/services/jadwal-ajar.service'
import moment from 'moment'

const { Option } = Select

const UpdateJadwalModal = ({
  isOpen,
  closeModal,
  modulAjars,
  token,
  refetch,
  defaultValues,
}) => {
  const [form] = Form.useForm()
  const [jumlahKegiatan, setJumlahKegiatan] = useState(null)

  useEffect(() => {
    form.setFieldsValue({
      idModulAjar: defaultValues.idModulAjar,
      tanggal: moment(defaultValues.tanggal),
      jumlahKegiatan: defaultValues.kegiatanInti.length,
    })
    setJumlahKegiatan(defaultValues.kegiatanInti.length)
    defaultValues.kegiatanInti.forEach((kegiatan, index) => {
      form.setFieldsValue({
        [`kegiatanInti${index + 1}`]: kegiatan,
      })
    })
  }, [defaultValues])

  const handleSubmit = async () => {
    let payload
    await form.validateFields().then((values) => {
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
      .update(defaultValues.id, payload, token)
      .then(() => {
        Modal.success({
          title: 'Berhasil',
          content: 'Berhasil mengupdate jadwal ajar',
        })
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
      title="Update Jadwal Ajar"
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

export default UpdateJadwalModal
