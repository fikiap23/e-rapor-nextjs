'use client'
import RaporView from '@/components/views/rapor/raporView'
import { useParams } from 'next/navigation'
import React from 'react'

const RaportPage = () => {
  const { id } = useParams()
  return (
    <>
      <RaporView idRombelSemesterGuru={id}></RaporView>
    </>
  )
}

export default RaportPage
