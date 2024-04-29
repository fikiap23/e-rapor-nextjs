'use client'
import RiwayatSiswaView from '@/components/views/riwayat-mengajar/siswaView'
import { useParams } from 'next/navigation'

const ArispSiswaPage = () => {
  const { id } = useParams()
  return (
    <>
      <RiwayatSiswaView idRombelSemesterGuru={id} />
    </>
  )
}

export default ArispSiswaPage
