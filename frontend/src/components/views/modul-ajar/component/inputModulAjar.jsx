import React, { useState } from 'react'
import { Form, Input, Select, Button, DatePicker, Modal } from 'antd'
import modulAjarService from '@/services/modul-ajar.service'
import RichTextEditor from '@/components/shared/editor/Editor'

const { Option } = Select

const InputModulAjar = ({ tujuanPembelajarans, refetch, token }) => {
  const [form] = Form.useForm()
  const [selectedTp, setSelectedTp] = useState(null)

  const handleFormChange = (changedValues, allValues) => {
    if (changedValues.minggu) {
      const selected = tujuanPembelajarans.find(
        (tp) => tp.minggu.toString() === changedValues.minggu.toString()
      )
      setSelectedTp(selected)
    }
  }

  const clearForm = () => {
    form.resetFields()
    setSelectedTp(null)
  }

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      katakunci: values.katakunci.split(',').map((kata) => kata.trim()),
      alatBahan: values.alatBahan.split(',').map((alat) => alat.trim()),
      petaKonsep: values.petaKonsep.split(',').map((peta) => peta.trim()),
      idTujuanPembelajaran: selectedTp.id,
    }
    console.log(payload)

    try {
      await modulAjarService
        .create(payload, token)
        .then(() => {
          Modal.success({
            title: 'Success',
            content: 'Data modul ajar telah ditambahkan',
          })
          clearForm()
          refetch()
        })
        .catch((err) => {
          Modal.error({
            content: err,
            title: 'Oops...',
          })
        })
    } catch (error) {
      Modal.error({
        content: 'Terjadi kesalahan',
        title: 'Oops...',
      })
    }
  }

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <Form
          form={form}
          onFinish={handleSubmit}
          onValuesChange={handleFormChange}
          layout="vertical"
        >
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

          {selectedTp && (
            <>
              <Form.Item label="Tujuan Pembelajaran Nilai Agama dan Budi Pekerti">
                <Input.TextArea
                  value={selectedTp.tujuanPembelajaranAgamaBudipekerti}
                  readOnly
                  disabled
                  rows={5}
                />
              </Form.Item>

              <Form.Item label="Tujuan Pembelajaran Jati Diri">
                <Input.TextArea
                  value={selectedTp.tujuanPembelajaranJatiDiri}
                  readOnly
                  disabled
                  rows={5}
                />
              </Form.Item>

              <Form.Item label="Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa dan Seni">
                <Input.TextArea
                  value={selectedTp.tujuanPembelajaranLiterasiSains}
                  readOnly
                  disabled
                  rows={5}
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Tanggal Mulai"
            name="startDate"
            rules={[{ required: true, message: 'Tanggal Mulai harus diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Tanggal Akhir"
            name="endDate"
            rules={[{ required: true, message: 'Tanggal Akhir harus diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Topik"
            name="topik"
            rules={[{ required: true, message: 'Masukkan Topik' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sub Topik"
            name="subtopik"
            rules={[{ required: true, message: 'Masukkan Sub Topik' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kata Kunci"
            name="katakunci"
            rules={[{ required: true, message: 'Masukkan Kata Kunci' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Alat dan Bahan"
            name="alatBahan"
            rules={[{ required: true, message: 'Masukkan Alat dan Bahan' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Peta Konsep"
            name="petaKonsep"
            rules={[{ required: true, message: 'Masukkan Peta Konsep' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Isi Tujuan Kegiatan" name="tujuanKegiatan">
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
