import React from 'react'
import { Form, Input, Select, DatePicker, Button, Modal } from 'antd'
import modulAjarService from '@/services/modul-ajar.service'
import RichTextEditor from '@/components/shared/editor/Editor'

const { Option } = Select

const InputModulAjar = ({ tujuanPembelajarans, refetch, token }) => {
  const [form] = Form.useForm()

  const clearForm = () => {
    form.resetFields()
  }

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      katakunci: values.katakunci.split(',').map((kata) => kata.trim()),
      alatBahan: values.alatBahan.split(',').map((alat) => alat.trim()),
      petaKonsep: values.petaKonsep.split(',').map((peta) => peta.trim()),
    }

    try {
      await modulAjarService
        .create(payload, token)
        .then((result) => {
          Modal.success({
            title: 'Berhasil',
            content: 'Data modul ajar telah ditambahkan',
            position: 'bottom-center',
          })
          clearForm()
          refetch()
        })
        .catch((error) => {
          Modal.error({
            title: 'Oops...',
            content: 'Terdapat kesalahan: ' + error,
            position: 'bottom-center',
          })
        })
    } catch (error) {
      Modal.error({
        title: 'Oops...',
        content: 'Terdapat kesalahan saat menambahkan data modul ajar',
        position: 'bottom-center',
      })
    }
  }

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Minggu"
            name="minggu"
            rules={[{ required: true, message: 'Pilih Minggu' }]}
          >
            <Select placeholder="Pilih Minggu">
              {tujuanPembelajarans.map((tp) => (
                <Option key={tp.id} value={tp.minggu}>
                  {tp.minggu}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Tanggal Mulai"
            name="startDate"
            rules={[{ required: true, message: 'Masukkan Tanggal Mulai' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Tanggal Akhir"
            name="endDate"
            rules={[{ required: true, message: 'Masukkan Tanggal Akhir' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Topik"
            name="topik"
            rules={[{ required: true, message: 'Masukkan Topik' }]}
          >
            <Input placeholder="Masukkan Topik" />
          </Form.Item>
          <Form.Item
            label="Sub Topik"
            name="subtopik"
            rules={[{ required: true, message: 'Masukkan Sub Topik' }]}
          >
            <Input placeholder="Masukkan Sub Topik" />
          </Form.Item>
          <Form.Item
            label="Kata Kunci"
            name="katakunci"
            rules={[{ required: true, message: 'Masukkan Kata Kunci' }]}
          >
            <Input placeholder="Masukkan Kata Kunci" />
          </Form.Item>
          <Form.Item
            label="Alat dan Bahan"
            name="alatBahan"
            rules={[{ required: true, message: 'Masukkan Alat dan Bahan' }]}
          >
            <Input placeholder="Masukkan Alat dan Bahan" />
          </Form.Item>
          <Form.Item
            label="Peta Konsep"
            name="petaKonsep"
            rules={[{ required: true, message: 'Masukkan Peta Konsep' }]}
          >
            <Input placeholder="Masukkan Peta Konsep" />
          </Form.Item>

          <Form.Item label="Tujuan Kegiatan" name="tujuanKegiatan">
            <RichTextEditor />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default InputModulAjar
