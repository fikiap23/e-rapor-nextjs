'use client'
import SeeStudentView from '@/components/views/rombel/seeStudentView'
import { useParams } from 'next/navigation'
import React from 'react'

const AddStudentToClassPage = () => {
  const { id } = useParams()
  // console.log(id)
  return (
    <>
      <SeeStudentView id={id} />
    </>
  )
}

export default AddStudentToClassPage
