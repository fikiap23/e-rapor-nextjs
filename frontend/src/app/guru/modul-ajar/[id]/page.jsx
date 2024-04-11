'use client'
import ModulAjarView from '@/components/views/modul-ajar/modulAjarView'
import { useParams } from 'next/navigation'
import React from 'react'

const ModulAjarage = () => {
  const { id } = useParams()
  return (
    <>
      <ModulAjarView idRombelSemesterGuru={id} />
    </>
  )
}

export default ModulAjarage
