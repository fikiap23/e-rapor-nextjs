import { Modal, Form, Input, Select, Button } from 'antd'
import { useState, useEffect } from 'react'
import rombelService from '@/services/rombel.service'
import useAuth from '@/hooks/useAuth'
import { useGetAllKategoriRombel } from '@/hooks/useKategoriRombel'

const { Option } = Select

const UpdateClassModal = ({
  isOpen,
  closeModal,
  setRombels,
  selectedRombel,
}) => {
  const [form] = Form.useForm()
  const [kodeKelompokUsia, setKodeKelompokUsia] = useState('')
  const { token } = useAuth()
  const { data: listKategoriRombel } = useGetAllKategoriRombel(token)

  useEffect(() => {
    if (selectedRombel) {
      form.setFieldsValue({
        kelompokUsia: selectedRombel.idKategoriRombel,
        noRombel: selectedRombel.name,
        kuota: selectedRombel.kuota,
      })

      const selectedKelompokUsia = listKategoriRombel.find(
        (item) => item.id === selectedRombel.idKategoriRombel
      )
      if (selectedKelompokUsia) {
        setKodeKelompokUsia(selectedKelompokUsia.kode)
      }
    }
  }, [selectedRombel, listKategoriRombel, form])

  const handleKelompokUsiaChange = (value) => {
    const selectedKelompokUsia = listKategoriRombel.find(
      (item) => item.id === value
    )
    if (selectedKelompokUsia) {
      setKodeKelompokUsia(selectedKelompokUsia.kode)
      form.setFieldsValue({ noRombel: selectedKelompokUsia.kode })
    }
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        idKategoriRombel: values.kelompokUsia,
        kuota: values.kuota,
        name: values.noRombel,
      }

      await rombelService
        .updateRombel(token, selectedRombel.id, payload)
        .then((result) => {
          Modal.success({
            title: 'Berhasil',
            position: 'bottom-center',
            content: 'Data rombel telah diperbarui',
          })

          const updatedRombel = {
            ...selectedRombel,
            idKategoriRombel: values.kelompokUsia,
            name: values.noRombel,
            kuota: values.kuota,
            kode: kodeKelompokUsia,
          }

          setRombels((prevRombels) =>
            prevRombels.map((item) =>
              item.id === selectedRombel.id ? updatedRombel : item
            )
          )
          closeModal()
        })
        .catch((error) => {
          Modal.error({
            title: 'Oops...',
            content: 'Terjadi kesalahan: ' + error,
            position: 'bottom-center',
          })
        })
    } catch (error) {
      Modal.error({
        title: 'Oops...',
        content: 'Terjadi kesalahan',
        position: 'bottom-center',
      })
    }
  }

  return (
    <Modal
      visible={isOpen}
      title="Update Rombel"
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Batal
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Simpan
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Kelompok Usia"
          name="kelompokUsia"
          rules={[{ required: true, message: 'Pilih Kelompok Usia' }]}
        >
          <Select
            onChange={handleKelompokUsiaChange}
            placeholder="Pilih Kelompok Usia"
          >
            {listKategoriRombel.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.kelompokUsia}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kode Kelompok Usia" name="kodeKelompokUsia">
          <Input
            readOnly
            disabled
            style={{ background: '#f0f0f0', color: '#666' }}
          />
        </Form.Item>

        <Form.Item
          label="No Rombel"
          name="noRombel"
          rules={[{ required: true, message: 'Masukkan No Rombel' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kuota"
          name="kuota"
          rules={[{ required: true, message: 'Masukkan Kuota' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateClassModal
