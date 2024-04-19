import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  Row,
  Col,
  Image,
  Modal,
} from 'antd'
import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '@/lib/helper'
const { Option } = Select

function TabInputSiswa({ refetch }) {
  const { token } = useAuth()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      // Mengambil binary data foto dari getBase64
      let payload
      if (fileList[0]?.originFileObj) {
        const fotoBinary = fileList[0].originFileObj
        payload = {
          ...values,
          foto: fotoBinary, // Menggunakan binary data foto
        }
      } else {
        payload = {
          ...values,
        }
      }

      Modal.confirm({
        title: 'Apakah Data Sudah Benar?',
        content: 'Anda akan menambah siswa!',
        okText: 'Ya, tambah!',
        cancelText: 'Tidak, cek lagi',
        onOk: async () => {
          try {
            setIsLoading(true)
            await siswaService.create(payload, token)
            form.resetFields()
            setFileList([])
            setIsLoading(false)
            refetch()
            Modal.success({
              title: 'Data Ditambahkan!',
              content: 'Siswa telah ditambahkan.',
            })
          } catch (err) {
            setIsLoading(false)
            Modal.error({
              title: 'Error',
              content: err,
            })
          }
        },
        onCancel: () => {
          setIsLoading(false)
        },
      })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      Modal.error({
        title: 'Error',
        content: 'Terjadi kesalahan',
      })
    }
  }

  const jenisKelaminOptions = ['L', 'P']
  const agamaOptions = [
    'ISLAM',
    'KRISTEN',
    'KATOLIK',
    'HINDU',
    'BUDHA',
    'KONGHUCU',
  ]

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <h4>Identitas Siswa</h4>
          <Form.Item
            label="NIS"
            name="nis"
            rules={[{ required: true, message: 'Masukkan NIS' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Nama Lengkap"
            name="nama"
            rules={[{ required: true, message: 'Masukkan Nama' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Jenis Kelamin"
            name="jenisKelamin"
            rules={[{ required: true, message: 'Pilih Jenis Kelamin' }]}
          >
            <Select>
              {jenisKelaminOptions.map((option, index) => (
                <Option key={index} value={option}>
                  {option === 'L' ? 'Laki-laki' : 'Perempuan'}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Agama"
            name="agama"
            rules={[{ required: true, message: 'Pilih Agama' }]}
          >
            <Select>
              {agamaOptions.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Anak Ke-"
            name="anakKe"
            rules={[{ required: true, message: 'Masukkan Anak Ke' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Tempat Lahir"
            name="tempatLahir"
            rules={[{ required: true, message: 'Masukkan Tempat Lahir' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tanggal Lahir"
            name="tanggalLahir"
            rules={[{ required: true, message: 'Pilih Tanggal Lahir' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <h4>Identitas Orang Tua</h4>
          <Form.Item
            label="Nama Ayah"
            name="namaAyah"
            rules={[{ required: true, message: 'Masukkan Nama Ayah' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pekerjaan Ayah"
            name="pekerjaanAyah"
            rules={[{ required: true, message: 'Masukkan Pekerjaan Ayah' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nama Ibu"
            name="namaIbu"
            rules={[{ required: true, message: 'Masukkan Nama Ibu' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Pekerjaan Ibu"
            name="pekerjaanIbu"
            rules={[{ required: true, message: 'Masukkan Pekerjaan Ibu' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <h4>Alamat Orang Tua</h4>
          <Form.Item
            label="Jalan"
            name="jalan"
            rules={[{ required: true, message: 'Masukkan Jalan' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Kelurahan"
            name="kelurahan"
            rules={[{ required: true, message: 'Masukkan Kelurahan' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Kecamatan"
            name="kecamatan"
            rules={[{ required: true, message: 'Masukkan Kecamatan' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Kota"
            name="kota"
            rules={[{ required: true, message: 'Masukkan Kota' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Provinsi"
            name="provinsi"
            rules={[{ required: true, message: 'Masukkan Provinsi' }]}
          >
            <Input type="text" />
          </Form.Item>

          <h4>Timbangan</h4>
          <Form.Item
            label="Tinggi Badan"
            name="tinggiBadan"
            rules={[{ required: true, message: 'Masukkan Tinggi Badan' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Berat Badan"
            name="beratBadan"
            rules={[{ required: true, message: 'Masukkan Berat Badan' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Lingkar"
            name="lingkar"
            rules={[{ required: true, message: 'Masukkan Lingkar' }]}
          >
            <Input type="number" />
          </Form.Item>

          <h4>Data Sekolah</h4>
          <Form.Item
            label="Tanggal Masuk"
            name="tanggalMasuk"
            rules={[{ required: true, message: 'Pilih Tanggal Masuk' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Foto"
            name="foto"
            rules={[{ message: 'Upload Foto' }]}
            valuePropName="fileList" // Menyimpan fileList ke dalam form field "foto"
            getValueFromEvent={(e) => e.fileList}
          >
            <>
              <Upload
                listType="picture-card"
                fileList={fileList}
                accept="image/*"
                multiple={true}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length > 0 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TabInputSiswa
