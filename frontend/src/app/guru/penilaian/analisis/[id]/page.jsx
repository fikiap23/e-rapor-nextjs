'use client'
import AnalisisPenilaianView from '@/components/views/penilaian/analisisPenilaianView'
import { useParams } from 'next/navigation'
import React from 'react'

const PenilaianPage = () => {
  const { id } = useParams()
  return (
    <>
      <AnalisisPenilaianView idRombelSemesterGuru={id} />
    </>
  )
}

export default PenilaianPage
