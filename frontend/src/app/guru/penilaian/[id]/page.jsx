'use client'
import PenilaianView from '@/components/views/penilaian/penilaianView'
import { useParams } from 'next/navigation'
import React from 'react'

const PenilaianPage = () => {
  const { id } = useParams()
  return (
    <>
      <PenilaianView idRombelSemesterGuru={id} />
    </>
  )
}

export default PenilaianPage
