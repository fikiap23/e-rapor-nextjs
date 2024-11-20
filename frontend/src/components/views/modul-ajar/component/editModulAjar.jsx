import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Modal, Col, Row } from 'antd'
import modulAjarService from '@/services/modul-ajar.service'
import RichTextEditor from '@/components/shared/editor/Editor'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select

const UpdateModulAjar = ({
  dataToUpdate,
  tujuanPembelajarans,
  refetch,
  token,
  idRombelSemesterGuru,
  back,
}) => {
  const [form] = Form.useForm()
  const [selectedTp, setSelectedTp] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Set initial form values based on dataToUpdate
    form.setFieldsValue({
      ...dataToUpdate,
    })
    setSelectedTp(dataToUpdate.tujuanPembelajaran)
  }, [dataToUpdate, form])

  const handleFormChange = (changedValues, allValues) => {
    if (changedValues.minggu) {
      const selected = tujuanPembelajarans.find(
        (tp) => tp.minggu.toString() === changedValues.minggu.toString()
      )
      setSelectedTp(selected)
    }
  }

  const handleSubmit = async (values) => {
    await form.validateFields()
    const payload = {
      ...values,
      idTujuanPembelajaran: selectedTp.id,
      idRombelSemesterGuru,
    }

    try {
      setLoading(true)
      await modulAjarService
        .update(dataToUpdate.id, payload, token)
        .then(() => {
          Modal.success({
            title: 'Success',
            content: 'Data modul ajar telah diperbarui',
          })
          setLoading(false)
          refetch()
          back()
        })
        .catch((err) => {
          setLoading(false)
          Modal.error({
            content: err,
            title: 'Oops...',
          })
        })
    } catch (error) {
      setLoading(false)
      Modal.error({
        content: 'Terjadi kesalahan',
        title: 'Oops...',
      })
    }
  }
  return (
    <div className="active tab-pane" id="activity">
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
            {tujuanPembelajarans?.map((tp) => (
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
          label="Topik"
          name="topik"
          rules={[{ required: true, message: 'Masukkan Topik' }]}
        >
          <Input placeholder="Contoh: Aku Hamba Allah" />
        </Form.Item>

        <Form.Item
          label="Sub Topik"
          name="subtopik"
          rules={[{ required: true, message: 'Masukkan Sub Topik' }]}
        >
          <Input placeholder="Contoh: Identitasku" />
        </Form.Item>

        <Form.Item
          label="Kata Kunci"
          name="katakunci"
          rules={[{ required: true, message: 'Masukkan Kata Kunci' }]}
        >
          <Input placeholder="Pisahkan kata kunci dengan koma. Contoh: Namaku, identitasku" />
        </Form.Item>

        <Form.List name="tujuanKegiatan">
          {(fields, { add, remove }) => (
            <>
              {fields.length === 0 && (
                <Form.Item
                  label="Tujuan Kegiatan"
                  name={[0]}
                  fieldKey={[0]}
                  rules={[
                    {
                      required: true,
                      message: 'Tujuan Kegiatan harus diisi',
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={2}
                    placeholder="Masukkan Tujuan Kegiatan"
                  />
                </Form.Item>
              )}
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

        <Form.Item
          label="Alat dan Bahan"
          name="alatBahan"
          rules={[{ required: true, message: 'Masukkan Alat dan Bahan' }]}
        >
          <Input.TextArea placeholder="Pisahkan alat dan bahan dengan koma. Contoh: Pena, pensil, buku" />
        </Form.Item>
        <Form.Item
          label="Sumber"
          name="sumber"
          rules={[{ required: true, message: 'Masukkan Sumber' }]}
        >
          <Input placeholder=" Contoh: Buku Anak Takzim 4-5 Tahun: Aku Hamba Allah" />
        </Form.Item>

        <Form.List name="petaKonsep">
          {(fields, { add, remove }) => (
            <>
              {fields.length === 0 && (
                <Form.Item
                  label="Peta Konsep"
                  name={[0]}
                  fieldKey={[0]}
                // rules={[
                //   {
                //     required: true,
                //     message: 'Peta Konsep harus diisi',
                //   },
                // ]}
                >
                  <Input.TextArea
                    rows={2}
                    placeholder="Masukkan Peta Konsep 1"
                  />
                </Form.Item>
              )}
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    style={{ margin: '0px' }}
                    label={`Peta Konsep ${index + 1}`}
                    name={[field.name]}
                    fieldKey={[field.fieldKey]}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Peta Konsep harus diisi',
                  //   },
                  // ]}
                  >
                    <Input placeholder={`Masukkan Peta Konsep ${index + 1}`} />
                  </Form.Item>
                  <Button
                    type="link"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
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
                  Tambah Peta Konsep
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="Alokasi Waktu (Menit)"
          name="alokasiWaktu"
          rules={[{ required: true, message: 'Masukkan Alokasi Waktu' }]}
        >
          <Input type="number" min={1} placeholder="Contoh: 60" />
        </Form.Item>

        <Form.Item
          label="Deskripsi Umum"
          name="deskripsiUmum"
          rules={[{ required: true, message: 'Masukkan Deskripsi' }]}
        >
          <Input.TextArea placeholder="Contoh: Anak diajak mengenal Tuhan" />
        </Form.Item>

        <Form.Item label="Curah Ide Kegiatan" name="curahIdeKegiatan">
          <RichTextEditor initialData={dataToUpdate?.curahIdeKegiatan} />
        </Form.Item>
        <Form.Item label="Kegiatan Pembukaan" name="kegiatanPembukaan">
          <RichTextEditor initialData={dataToUpdate?.kegiatanPembukaan} />
        </Form.Item>
        <Form.Item label="Istirahat" name="istirahat">
          <RichTextEditor initialData={dataToUpdate?.istirahat} />
        </Form.Item>
        <Form.Item label="Kegiatan Penutupan" name="kegiatanPenutupan">
          <RichTextEditor initialData={dataToUpdate?.kegiatanPenutupan} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateModulAjar
