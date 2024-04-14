import useAuth from '@/hooks/useAuth'
import raportService from '@/services/rapor.service'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import RichTextEditor from '@/components/shared/editor/Editor'

const { confirm } = Modal
const { Option } = Select
function RaportInput({ murid, semester, listMurid, btnBack }) {
  const { token } = useAuth()
  const [form] = Form.useForm()
  const [muridNullRapor, setMuridNullRapor] = useState([])
  useEffect(() => {
    const murids = listMurid?.filter((m) => m?.rapor.length === 0)
    setMuridNullRapor(murids)
  }, [listMurid])
  useEffect(() => {
    if (murid) {
      form.setFieldsValue({
        idMurid: murid.id,
      })
    }
  }, [murid, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        ...values,
        idSemester: semester.id,
      }

      confirm({
        title: 'Apakah Catatan Sudah Benar?',
        icon: <ExclamationCircleOutlined />,
        content: 'Anda akan memasukan catatan!',
        onOk: async () => {
          await raportService
            .create(payload, token)
            .then((res) => {
              Modal.success({
                title: 'Data Rapor Ditambahkan!',
                content: 'Data Rapor Telah Ditambahkan',
              })
              // remove values.idmurid from list
              setMuridNullRapor(
                muridNullRapor.filter((m) => m.id !== values.idMurid)
              )
            })
            .catch((err) => {
              Modal.error({
                title: 'Oops...',
                content: err,
              })
            })
        },
        onCancel() {},
      })
    } catch (error) {
      Modal.error({ content: 'Ada masalah, silahkan simpan lagi' })
    }
  }

  return (
    <div style={{ marginTop: '-2%' }}>
      <button
        className="btn btn-default"
        style={{ marginBottom: '2%', marginTop: '1%', marginLeft: '1%' }}
        onClick={() => btnBack()}
      >
        <i className="fa fa-arrow-left"></i> Kembali
      </button>
      <div className="box-body">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Col md={12} xs={24} sm={24}>
            <Form.Item
              label="Murid"
              name="idMurid"
              rules={[{ required: true, message: 'Pilih murid' }]}
            >
              <Select placeholder="Pilih murid">
                {muridNullRapor.map((murid) => (
                  <Option key={murid.id} value={murid.id}>
                    {`${murid.nis} - ${murid.nama}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Total Sakit"
                name="totalSakit"
                initialValue={0}
                rules={[{ type: 'number', min: 0 }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Izin"
                name="totalIzin"
                initialValue={0}
                rules={[{ type: 'number', min: 0 }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Alpa"
                name="totalAlpa"
                initialValue={0}
                rules={[{ type: 'number', min: 0 }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24} sm={24}>
              <Form.Item
                label="Catatan Agama dan Budi Pekerti"
                name="catatanAgamaBudipekerti"
                rules={[
                  {
                    required: true,
                    message: 'Catatan harus diisi',
                    whitespace: true,
                  },
                  {
                    validator: (_, value) => {
                      if (value === '<p></p>\n') {
                        return Promise.reject('Catatan harus diisi')
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <RichTextEditor />
              </Form.Item>
            </Col>

            <Col md={12} xs={24} sm={24}>
              <Form.Item
                label="Catatan Jati Diri"
                name="catatanJatiDiri"
                rules={[
                  {
                    required: true,
                    message: 'Catatan harus diisi',
                    whitespace: true,
                  },
                  {
                    validator: (_, value) => {
                      if (value === '<p></p>\n') {
                        return Promise.reject('Catatan harus diisi')
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <RichTextEditor />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24} sm={24}>
              <Form.Item
                label="Catatan Literasi Sains"
                name="catatanLiterasiSains"
                rules={[
                  {
                    required: true,
                    message: 'Catatan harus diisi',
                    whitespace: true,
                  },
                  {
                    validator: (_, value) => {
                      if (value === '<p></p>\n') {
                        return Promise.reject('Catatan harus diisi')
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <RichTextEditor />
              </Form.Item>
            </Col>

            <Col md={12} xs={24} sm={24}>
              <Form.Item
                label="Catatan Pertumbuhan"
                name="catatanPertumbuhan"
                rules={[
                  {
                    required: true,
                    message: 'Catatan harus diisi',
                    whitespace: true,
                  },
                  {
                    validator: (_, value) => {
                      if (value === '<p></p>\n') {
                        return Promise.reject('Catatan harus diisi')
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <RichTextEditor />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24} sm={24}>
              <Form.Item
                label="Catatan Pancasila"
                name="catatanPancasila"
                rules={[
                  {
                    required: true,
                    message: 'Catatan harus diisi',
                    whitespace: true,
                  },
                  {
                    validator: (_, value) => {
                      if (value === '<p></p>\n') {
                        return Promise.reject('Catatan harus diisi')
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <RichTextEditor />
              </Form.Item>
            </Col>

            <Col md={12} xs={24} sm={24}>
              <Form.Item
                label="Catatan Guru"
                name="catatanGuru"
                rules={[
                  {
                    required: true,
                    message: 'Catatan harus diisi',
                    whitespace: true,
                  },
                  {
                    validator: (_, value) => {
                      if (value === '<p></p>\n') {
                        return Promise.reject('Catatan harus diisi')
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <RichTextEditor />
              </Form.Item>
            </Col>
          </Row>

          <div className="box-footer">
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RaportInput
