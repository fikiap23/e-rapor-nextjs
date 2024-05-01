import useAuth from '@/hooks/useAuth'
import raportService from '@/services/rapor.service'
import React from 'react'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import RichTextEditor from '@/components/shared/editor/Editor'

const { confirm } = Modal
function RaportInput({
  murid,
  semester,
  btnBack,
  refetch,
  idRombelSemesterGuru,
}) {
  const { token } = useAuth()
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        ...values,
        idMurid: murid.id,
        idSemester: semester.id,
        idRombelSemesterGuru,
        catatanAgamaBudipekerti: murid.nilaiAgamaBudipekerti,
        catatanJatiDiri: murid.nilaiJatiDiri,
        catatanLiterasiSains: murid.nilaiLiterasiSains,
        catatanPertumbuhan: murid.pertumbuhan,
      }
      console.log(payload)

      // confirm({
      //   title: 'Apakah Catatan Sudah Benar?',
      //   icon: <ExclamationCircleOutlined />,
      //   content: 'Anda akan memasukan catatan!',
      //   onOk: async () => {
      //     await raportService
      //       .create(payload, token)
      //       .then((res) => {
      //         Modal.success({
      //           title: 'Data Rapor Ditambahkan!',
      //           content: 'Data Rapor Telah Ditambahkan',
      //         })
      //         form.resetFields()
      //         refetch()
      //         btnBack()
      //       })
      //       .catch((err) => {
      //         Modal.error({
      //           title: 'Oops...',
      //           content: err,
      //         })
      //       })
      //   },
      //   onCancel() {},
      // })
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
                <Input min={0} type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Izin" name="totalIzin" initialValue={0}>
                <Input min={0} type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Alpa" name="totalAlpa" initialValue={0}>
                <Input min={0} type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="NILAI AGAMA DAN BUDIPEKERTI">
            <Input.TextArea
              value={murid.nilaiAgamaBudipekerti.join('\n\n')}
              readOnly
              rows={8}
            />
          </Form.Item>

          <Form.Item label="JATI DIRI">
            <Input.TextArea
              value={murid.nilaiJatiDiri.join('\n\n')}
              readOnly
              rows={8}
            />
          </Form.Item>

          <Form.Item label="DASAR LITERASI, MATAMATIK DAN SAINS, SAINS, TEKNOLOGI DAN SENI">
            <Input.TextArea
              value={murid.nilaiLiterasiSains.join('\n\n')}
              readOnly
              rows={8}
            />
          </Form.Item>

          <Form.Item label="CATATAN PERTUMBUHAN ANAK">
            <Input.TextArea value={murid.pertumbuhan} readOnly rows={8} />
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
            <RichTextEditor />
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
            <RichTextEditor />
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

export default RaportInput
