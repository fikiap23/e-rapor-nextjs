import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Modal, Col, Row } from 'antd'
import modulAjarService from '@/services/modul-ajar.service'
import RichTextEditor from '@/components/shared/editor/Editor'

const { Option } = Select

const UpdateModulAjar = ({
  dataToUpdate,
  tujuanPembelajarans,
  refetch,
  token,
  idRombelSemesterGuru,
}) => {
  const [form] = Form.useForm()
  const [selectedTp, setSelectedTp] = useState(null)
  const [jumlahKegiatan, setJumlahKegiatan] = useState(1)

  useEffect(() => {
    // Set initial form values based on dataToUpdate
    form.setFieldsValue({
      minggu: dataToUpdate.minggu,
      alokasiWaktu: dataToUpdate.alokasiWaktu,
      topik: dataToUpdate.topik,
      subtopik: dataToUpdate.subtopik,
      deskripsiUmum: dataToUpdate.deskripsiUmum,
      katakunci: dataToUpdate.katakunci.join(','),
      alatBahan: dataToUpdate.alatBahan.join(','),
      petaKonsep: dataToUpdate.petaKonsep.join(','),
      komponenInti: dataToUpdate.komponenInti,
      curahIdeKegiatan: dataToUpdate.curahIdeKegiatan,
      kegiatanPembukaan: dataToUpdate.kegiatanPembukaan,
      istirahat: dataToUpdate.istirahat,
      kegiatanPenutupan: dataToUpdate.kegiatanPenutupan,
      jumlahKegiatan: dataToUpdate.tujuanKegiatan.length,
      idTujuanPembelajaran: dataToUpdate.idTujuanPembelajaran,
    })
    setJumlahKegiatan(dataToUpdate.tujuanKegiatan.length)
    dataToUpdate.tujuanKegiatan.forEach((tujuanKegiatan, index) => {
      form.setFieldsValue({
        [`tujuanKegiatan${index + 1}`]: tujuanKegiatan,
      })
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
    let payload
    await form.validateFields().then((values) => {
      // Mendapatkan nilai dari setiap kegiatan inti dan menyimpannya dalam bentuk array
      const tujuanKegiatanValues = []
      for (let i = 1; i <= jumlahKegiatan; i++) {
        tujuanKegiatanValues.push(values[`tujuanKegiatan${i}`])
      }
      payload = {
        minggu: values.minggu,
        alokasiWaktu: values.alokasiWaktu,
        topik: values.topik,
        subtopik: values.subtopik,
        deskripsiUmum: values.deskripsiUmum,
        katakunci: values.katakunci.split(',').map((kata) => kata.trim()),
        alatBahan: values.alatBahan.split(',').map((alat) => alat.trim()),
        petaKonsep: values.petaKonsep.split(',').map((peta) => peta.trim()),
        komponenInti: values.komponenInti,
        curahIdeKegiatan: values.curahIdeKegiatan,
        kegiatanPembukaan: values.kegiatanPembukaan,
        istirahat: values.istirahat,
        kegiatanPenutupan: values.kegiatanPenutupan,
        idTujuanPembelajaran: selectedTp.id,
        idRombelSemesterGuru,
        tujuanKegiatan: tujuanKegiatanValues,
      }
    })

    try {
      await modulAjarService
        .update(dataToUpdate.id, payload, token)
        .then(() => {
          Modal.success({
            title: 'Success',
            content: 'Data modul ajar telah diupdate',
          })
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
  const handleJumlahKegiatanChange = (value) => {
    setJumlahKegiatan(value)
  }
  return (
    <div className="active tab-pane" id="activity">
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={handleFormChange}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
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
              label="Alokasi Waktu (Menit)"
              name="alokasiWaktu"
              rules={[{ required: true, message: 'Masukkan Alokasi Waktu' }]}
            >
              <Input type="number" />
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
              label="Deskripsi Umum"
              name="deskripsiUmum"
              rules={[{ required: true, message: 'Masukkan Deskripsi' }]}
            >
              <Input.TextArea />
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

            <Form.Item
              label="Jumlah Tujuan Kegiatan"
              name="jumlahKegiatan"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Pilih Jumlah Tujuan Kegiatan"
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
            {/* Input untuk setiap tujuan kegiatan */}
            {[...Array(jumlahKegiatan)].map((_, index) => (
              <Form.Item
                key={index}
                label={`Tujuan Kegiatan ${index + 1}`}
                name={`tujuanKegiatan${index + 1}`}
                rules={[
                  { required: true, message: 'Tujuan Kegiatan harus diisi' },
                ]}
              >
                <Input.TextArea
                  rows={2}
                  placeholder={`Masukkan Tujuan Kegiatan ${index + 1}`}
                />
              </Form.Item>
            ))}
            <Form.Item label="Komponen Inti" name="komponenInti">
              <RichTextEditor initialData={dataToUpdate?.komponenInti} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
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
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default UpdateModulAjar
