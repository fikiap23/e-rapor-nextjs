export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const NilaiType = {
  BELUM_BERKEMBANG: 'BELUM_BERKEMBANG',
  MULAI_BERKEMBANG: 'MULAI_BERKEMBANG',
  SUDAH_BERKEMBANG: 'SUDAH_BERKEMBANG',
}
