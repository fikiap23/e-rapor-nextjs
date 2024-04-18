import React, { useEffect } from 'react'
import { Modal, Form, Select, Button, message } from 'antd'
import { useGetAllSemesterData } from '@/hooks/useSemester'
import rombelService from '@/services/rombel.service'

const { Option } = Select

const UpdateGuruToRombelModal = ({
  isOpen,
  closeModal,
  refetch,
  refetchGuruRombel,
  token,
  listGuruRombel,
  selectedData, // data guru-rombel yang akan diupdate
}) => {
  const [form] = Form.useForm()

  const {
    data: listSemester,
    error: errorSemester,
    isFetching: isFetchingSemester,
  } = useGetAllSemesterData(token, true)

  useEffect(() => {
    if (selectedData && listGuruRombel && listSemester) {
      form.setFieldsValue({
        idRombel: selectedData.idRombel,
        idGuru: selectedData.idGuru,
        idSemester: selectedData.idSemester,
      })
    }
  }, [selectedData, listGuruRombel, listSemester])

  const handleSubmit = async () => {
    const values = await form.validateFields()
    await rombelService
      .updateRombelSemesterGuru(token, selectedData.id, values)
      .then((result) => {
        Modal.success({
          title: 'Update Berhasil!',
          content: 'Data rombel telah diperbarui',
          position: 'top-right',
        })
        form.resetFields()
        refetch()
        refetchGuruRombel()
        closeModal()
      })
      .catch((error) => {
        Modal.error({
          title: 'Oops...',
          content: 'Terjadi kesalahan: ' + error,
          position: 'top-right',
        })
      })
  }

  return (
    <Modal
      title="Update Guru dan Rombel"
      visible={isOpen}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Simpan
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="idRombel"
          label="Pilih Rombel"
          rules={[{ required: true, message: 'Silakan pilih rombel!' }]}
        >
          <Select placeholder="Pilih Rombel">
            {listGuruRombel.rombels.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="idGuru"
          label="Pilih Guru"
          rules={[{ required: true, message: 'Silakan pilih guru!' }]}
        >
          <Select placeholder="Pilih Guru">
            {listGuruRombel.gurus.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.nama}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="idSemester"
          label="Pilih Semester"
          rules={[{ required: true, message: 'Silakan pilih semester!' }]}
        >
          <Select placeholder="Pilih Semester">
            {listSemester.map((item) => (
              <Option key={item.id} value={item.id}>
                {`${item.tahunAjaranAwal} - ${item.tahunAjaranAkhir} (${item.jenisSemester})`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateGuruToRombelModal
