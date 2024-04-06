import { Modal, Form, Input, Select, Switch, DatePicker, Button } from 'antd'
import { formatDate } from '@/lib/helperDate'
import semesterService from '@/services/semester.service'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment'
const { Option } = Select

const EditSemesterModal = ({
  isOpen,
  closeModal,
  semesterData,
  token,
  refetch,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        id: semesterData.id,
        isAktif: semesterData.isAktif,
        jenisSemester: semesterData.jenisSemester,
        tglBagiRapor: moment(semesterData.tglBagiRapor),
        namaKepsek: semesterData.namaKepsek,
        nipKepsek: semesterData.nipKepsek,
        tahunAjaranAwal: semesterData.tahunAjaranAwal,
        tahunAjaranAkhir: semesterData.tahunAjaranAkhir,
      })
    }
  }, [isOpen, semesterData, form])

  const handleToggle = (checked) => {
    form.setFieldsValue({ isAktif: checked })
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await semesterService.update(token, semesterData.id, values)
      Swal.fire({
        icon: 'success',
        title: 'Data semester telah diperbarui',
        position: 'bottom-center',
      })
      refetch()
      closeModal()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        position: 'bottom-center',
      })
    }
  }

  return (
    <Modal
      title="Edit"
      visible={isOpen}
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
          label="Tahun Ajaran Awal"
          name="tahunAjaranAwal"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Tahun Ajaran Akhir"
          name="tahunAjaranAkhir"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Semester"
          name="jenisSemester"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="GANJIL">Ganjil</Option>
            <Option value="GENAP">Genap</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Kepala Sekolah"
          name="namaKepsek"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="NIP" name="nipKepsek" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Tanggal Raport"
          name="tglBagiRapor"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Status Aktif" name="isAktif" valuePropName="checked">
          <Switch onChange={handleToggle} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditSemesterModal
