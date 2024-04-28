'use client'
import ArsipSiswaView from '@/components/views/arsip/siswaView'
import { useParams } from 'next/navigation'

const ArispSiswaPage = () => {
  const { id } = useParams()
  return (
    <>
      <ArsipSiswaView idRombelSemesterGuru={id} />
    </>
  )
}

export default ArispSiswaPage
