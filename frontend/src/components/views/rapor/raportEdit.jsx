'use client'
import useAuth from '@/hooks/useAuth'
import { useOneStudent } from '@/hooks/useOneStudent'
import { useOneStudentByIdSemesterGuru } from '@/hooks/useOneStudentByIdSemesterGuru'
import raportService from '@/services/rapor.service'
import { Col, Form, Input, Row } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function RaportEdit({ data, fetching, idStudent, idSemester }) {
  const { token } = useAuth()
  const [selectedForm, setSelectedForm] = useState(null)
  const [form] = Form.useForm()
  const [raport, setRaport] = useState({});

  useEffect(() => {
    setSelectedForm(data)
    if (data && data.rapor) {
      const mappedRaport = data.rapor.map((item) => ({
        ...item
      }));
      setRaport(mappedRaport[0]);
    }
  }, [data])

  const handleFormChange = (changedValues, allValues) => {
    if (changedValues.minggu) {
      const selected = tujuanPembelajarans.find(
        (tp) => tp.minggu.toString() === changedValues.minggu.toString()
      )
      setSelectedTp(selected)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await Swal.fire({
        title: 'Apakah Catatan Sudah Benar?',
        text: 'Anda akan memasukan catatan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, masukan!',
        cancelButtonText: 'Tidak, cek lagi',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        await raportService.create(formData, token);
        Swal.fire('Data Ditambahkan!', 'Siswa telah ditambahkan.', 'success')
        // window.history.back()
      }
    } catch (error) {
      console.error('Error:', error.message)
      Swal.fire('Error', 'Ada masalah, silahkan simpan lagi', 'error')
    }
  }

  return (
    <div
      className="active tab-pane p-px"
      style={{ padding: '10px' }}
      id="input-siswa"
    >
      <div className="box-body">
        <div className="box-body bg-danger" style={{ marginBottom: '3%' }}>
          <p>
            <b>Nama Siswa: {selectedForm?.nama}</b>
          </p>
          <p>
            <b>Nis: {selectedForm?.nis}</b>
          </p>
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          // onValuesChange={handleFormChange}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} md={30}>
              <>
                <Form.Item label="Catatan Agama dan Budi Pekerti">
                  <Input.TextArea
                    value={raport?.catatanAgamaBudipekerti}
                    rows={5}
                  />
                </Form.Item>

                <Form.Item label="Catatan Jati Diri">
                  <Input.TextArea
                    value={raport?.catatanJatiDiri}
                    rows={5}
                  />
                </Form.Item>

                <Form.Item label="Catatan Literasi Sains">
                  <Input.TextArea
                    value={raport?.catatanLiterasiSains}
                    rows={5}
                  />
                </Form.Item>

                <Form.Item label="Catatan Pertumbuhan">
                  <Input.TextArea
                    value={raport?.catatanPertumbuhan}
                    rows={5}
                  />
                </Form.Item>

                <Form.Item label="Catatan Pancasila">
                  <Input.TextArea
                    value={raport?.catatanPancasila}
                    rows={5}
                  />
                </Form.Item>

                <Form.Item label="Catatan Guru">
                  <Input.TextArea
                    value={raport?.catatanGuru}
                    rows={5}
                  />
                </Form.Item>
              </>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default RaportEdit
