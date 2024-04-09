import { useState } from 'react'
import { Input, message, Row, Col, Form } from 'antd'
import cpTpService from '@/services/cp-tp.service'
import Loading from '@/components/shared/Loading'

function CapaianPage({ cp, token, refetch }) {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      const formData = form.getFieldsValue()
      cpTpService
        .updateCp(token, formData)
        .then(() => {
          message.success('Data Capaian Pembelajaran telah diperbarui')
          refetch()
        })
        .catch((error) => {
          message.error(error.message)
        })
      setIsEditing(false)
    } catch (error) {
      message.error('Semua kolom harus diisi')
    }
  }

  return (
    <Form form={form} layout="vertical" style={{ marginTop: 10 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label="NILAI AGAMA DAN BUDI PEKERTI"
            name="capaianPembelajaranAgama"
            initialValue={cp?.capaianPembelajaranAgama || ''}
            rules={[{ required: true, message: 'Kolom harus diisi' }]}
          >
            <Input.TextArea
              placeholder="Masukkan Capaian Pembelajaran..."
              readOnly={!isEditing}
              rows={5}
              disabled={!isEditing}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="JATI DIRI"
            name="capaianPembelajaranJatiDiri"
            initialValue={cp?.capaianPembelajaranJatiDiri || ''}
            rules={[{ required: true, message: 'Kolom harus diisi' }]}
          >
            <Input.TextArea
              placeholder="Masukkan Capaian Pembelajaran..."
              readOnly={!isEditing}
              rows={5}
              disabled={!isEditing}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI"
            name="capaianPembelajaranLiterasiSains"
            initialValue={cp?.capaianPembelajaranLiterasiSains || ''}
            rules={[{ required: true, message: 'Kolom harus diisi' }]}
          >
            <Input.TextArea
              placeholder="Masukkan Capaian Pembelajaran..."
              readOnly={!isEditing}
              rows={5}
              disabled={!isEditing}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <button
            onClick={isEditing ? handleSubmit : handleEditClick}
            className={`btn btn-${isEditing ? 'success' : 'primary'}`}
          >
            {isEditing ? 'Simpan' : 'Edit'}
          </button>
        </Col>
      </Row>
    </Form>
  )
}

export default CapaianPage
