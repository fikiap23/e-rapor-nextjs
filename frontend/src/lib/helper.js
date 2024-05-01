export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
export const compressImage = (file, maxWidth, maxHeight, quality) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      const img = new Image()
      img.src = event.target.result
      img.onload = function () {
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          'image/jpeg',
          quality
        )
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

export function blobToFile(blob, fileName) {
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

export const NilaiType = {
  BELUM_BERKEMBANG: 'BELUM_BERKEMBANG',
  MULAI_BERKEMBANG: 'MULAI_BERKEMBANG',
  SUDAH_BERKEMBANG: 'SUDAH_BERKEMBANG',
}
