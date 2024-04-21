import useAuth from '@/hooks/useAuth'
import raportService from '@/services/rapor.service'
import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import RichTextEditor from '@/components/shared/editor/Editor'

const { confirm } = Modal
function RaportEdit({ murid, btnBack, refetch, idRombelSemesterGuru }) {
  const { token } = useAuth()
  const [form] = Form.useForm()
  const rapor = murid?.rapor[0]
  useEffect(() => {
    if (rapor) {
      form.setFieldsValue({
        ...rapor,
      })
    }
  }, [rapor, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        totalSakit: values.totalSakit,
        totalIzin: values.totalIzin,
        totalAlpa: values.totalAlpa,
        catatanAgamaBudipekerti: values.catatanAgamaBudipekerti,
        catatanJatiDiri: values.catatanJatiDiri,
        catatanLiterasiSains: values.catatanLiterasiSains,
        catatanPertumbuhan: values.catatanPertumbuhan,
        catatanPancasila: values.catatanPancasila,
        catatanGuru: values.catatanGuru,
        idRombelSemesterGuru,
      }

      confirm({
        title: 'Apakah Catatan Sudah Benar?',
        icon: <ExclamationCircleOutlined />,
        content: 'Anda akan memasukan catatan!',
        onOk: async () => {
          await raportService
            .update(token, rapor.id, payload)
            .then((res) => {
              Modal.success({
                title: 'Data Rapor Diperbarui!',
                content: 'Data Rapor Telah Diperbarui',
              })
              refetch()
              btnBack()
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
        <div className="box-body bg-danger" style={{ marginBottom: '3%' }}>
          <p>
            <b>Nama: {murid.nama}</b>
          </p>
          <p>
            <b>NIS: {murid.nis}</b>
          </p>
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Total Sakit" name="totalSakit" initialValue={0}>
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Izin" name="totalIzin" initialValue={0}>
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Alpa" name="totalAlpa" initialValue={0}>
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="NILAI AGAMA DAN BUDIPEKERTI"
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
            <RichTextEditor initialData={rapor?.catatanAgamaBudipekerti} />
          </Form.Item>

          <Form.Item
            label="JATI DIRI"
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
            <RichTextEditor initialData={rapor?.catatanJatiDiri} />
          </Form.Item>

          <Form.Item
            label="DASAR LITERASI, MATAMATIK DAN SAINS, SAINS, TEKNOLOGI DAN SENI"
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
            <RichTextEditor initialData={rapor?.catatanLiterasiSains} />
          </Form.Item>

          <Form.Item
            label="CATATAN PERTUMBUHAN ANAK"
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
            <RichTextEditor initialData={rapor?.catatanPertumbuhan} />
          </Form.Item>

          <Form.Item
            label="PROJEK PENGUATAN PROFILE PELAJAR PANCASILA"
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
            <RichTextEditor initialData={rapor?.catatanPancasila} />
          </Form.Item>

          <Form.Item
            label="CATATATAN TAMBAHAN GURU"
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
            <RichTextEditor initialData={rapor?.catatanGuru} />
          </Form.Item>

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

export default RaportEdit
