'use client'
import AddStudentToClassView from '@/components/views/admin/class_module/addStudentToClassView'
import { useParams } from 'next/navigation'
import React from 'react'

const AddStudentToClassPage = () => {
  const { id } = useParams()
  // console.log(id)
  return (
    <>
      {' '}
      <AddStudentToClassView id={id} />{' '}
    </>
  )
}

export default AddStudentToClassPage
