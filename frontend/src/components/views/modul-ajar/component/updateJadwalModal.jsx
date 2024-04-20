'use client'
import React, { useEffect } from 'react'
import { Modal, Select, Input, Button, DatePicker, Form } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import jadwalAjarService from '@/services/jadwal-ajar.service'
import moment from 'moment'

const { Option } = Select

const UpdateModal = ({
  isOpen,
  closeModal,
  modulAjars,
  token,
  refetch,
  initialValues,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    // Set initial form values based on dataToUpdate
    form.setFieldsValue({
      ...initialValues,
      tanggal: moment(initialValues?.tanggalHari1),
    })
  }, [initialValues, form])

  const handleSubmit = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()

    const tanggalList = {}

    // generate 6 days from start date
    for (let i = 0; i < 6; i++) {
      const date = new Date(values.tanggal)
      date.setDate(date.getDate() + (i + 1))
      const formattedDate = date.toISOString().slice(0, 10)
      tanggalList['tanggalHari' + (i + 1)] = formattedDate
    }

    const payload = {
      ...values,
      idModulAjar: values.idModulAjar,
      ...tanggalList,
    }
    delete payload.tanggal
    delete payload.modulAjar

    await jadwalAjarService
      .update(initialValues.id, payload, token) // Assuming you have an update method in your service
      .then(() => {
        Modal.success({
          title: 'Berhasil',
          content: 'Berhasil memperbarui jadwal ajar',
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

  return (
    <Modal
      visible={isOpen}
      title="Update Jadwal Ajar"
      width={800}
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
            {modulAjars.map((modul) => (
              <Option key={modul.id} value={modul.id}>
                {`Minggu Ke-${modul.minggu} (${modul.topik})`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tanggal" name="tanggal" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              marginBottom: '25px ',
              padding: '5px 10px',
            }}
          >
            <label
              htmlFor=""
              style={{
                textDecorationLine: 'underline',
                textUnderlineOffset: '5px',
                marginBottom: '8px',
              }}
            >
              Kegiatan Inti Hari ke {index + 1}
            </label>
            <Form.List name={`kegiatanIntiHari${index + 1}`}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item
                        style={{ margin: '0px' }}
                        label={`Tujuan Kegiatan ${index + 1}`}
                        name={[field.name]}
                        fieldKey={[field.fieldKey]}
                        rules={[
                          {
                            required: true,
                            message: 'Tujuan Kegiatan harus diisi',
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={2}
                          placeholder={`Masukkan Tujuan Kegiatan ${index + 1}`}
                        />
                      </Form.Item>
                      <Button
                        type="link"
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                        style={{ marginBottom: '10px' }}
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Tambah Tujuan Kegiatan
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        ))}
      </Form>
    </Modal>
  )
}

export default UpdateModal
