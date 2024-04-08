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
} from 'antd'
import useAuth from '@/hooks/useAuth'
import siswaService from '@/services/siswa.service'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { apiUrl } from '@/services/apiUrls'
import { getBase64 } from '@/lib/helper'
const { Option } = Select

const TabUpdateSiswa = ({ dataSiswa }) => {
  const { token } = useAuth()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    form.setFieldsValue({
      id: dataSiswa.id,
      nisn: dataSiswa.nisn,
      nis: dataSiswa.nis,
      nama: dataSiswa.nama,
      tempatLahir: dataSiswa.tempatLahir,
      tanggalLahir: moment(dataSiswa.tanggalLahir),
      alamat: dataSiswa.alamat,
      noHp: dataSiswa.noHp,
      agama: dataSiswa.agama,
      jenisKelamin: dataSiswa.jenisKelamin,
      namaAyah: dataSiswa.namaAyah,
      namaIbu: dataSiswa.namaIbu,
      pekerjaanAyah: dataSiswa.pekerjaanAyah,
      pekerjaanIbu: dataSiswa.pekerjaanIbu,
      tanggalMasuk: moment(dataSiswa.tanggalMasuk),
      tinggiBadan: dataSiswa.tinggiBadan,
      beratBadan: dataSiswa.beratBadan,
      status: dataSiswa.status,
    })
    setFileList(
      dataSiswa.foto ? [{ uid: '-1', url: `${apiUrl}/${dataSiswa.foto}` }] : []
    )
  }, [dataSiswa, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      // Mengambil binary data foto dari getBase64
      const fotoBinary = fileList[0].originFileObj

      const payload = {
        ...values,
        foto: fotoBinary, // Menggunakan binary data foto
      }
      console.log(payload)
      const result = await Swal.fire({
        title: 'Apakah Data Sudah Benar?',
        text: 'Anda akan mengubah siswa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, ubah!',
        cancelButtonText: 'Tidak, cek lagi',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        setIsLoading(true)
        await siswaService
          .update(token, dataSiswa.id, payload)
          .then((res) => {
            setIsLoading(false)
            Swal.fire('Data Diubah!', 'Siswa telah diubah.', 'success')
          })
          .catch((err) => {
            setIsLoading(false)
            Swal.fire('Error', err, 'error')
          })
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      Swal.fire('Error', 'Terjadi kesalahan', 'error')
    }
  }

  const jenisKelaminOptions = ['LAKI_LAKI', 'PEREMPUAN']
  const agamaOptions = [
    'ISLAM',
    'KRISTEN',
    'KATOLIK',
    'HINDU',
    'BUDHA',
    'KONGHUCU',
  ]
  const statusOptions = ['AKTIF', 'TIDAK AKTIF']

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
    <div style={{ padding: '20px' }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="NIS"
              name="nis"
              rules={[{ required: true, message: 'Masukkan NIS' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="NISN"
              name="nisn"
              rules={[{ required: true, message: 'Masukkan NISN' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Nama"
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
                    {option}
                  </Option>
                ))}
              </Select>
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
            <Form.Item
              label="Nama Ayah"
              name="namaAyah"
              rules={[{ required: true, message: 'Masukkan Nama Ayah' }]}
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
              label="Pekerjaan Ayah"
              name="pekerjaanAyah"
              rules={[{ required: true, message: 'Masukkan Pekerjaan Ayah' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Pekerjaan Ibu"
              name="pekerjaanIbu"
              rules={[{ required: true, message: 'Masukkan Pekerjaan Ibu' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Alamat"
              name="alamat"
              rules={[{ required: true, message: 'Masukkan Alamat' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Tanggal Masuk"
              name="tanggalMasuk"
              rules={[{ required: true, message: 'Pilih Tanggal Masuk' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
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
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Pilih Status' }]}
            >
              <Select>
                {statusOptions.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
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
    </div>
  )
}

export default TabUpdateSiswa
