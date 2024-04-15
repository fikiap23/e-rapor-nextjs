'use client'
import React, { useEffect } from 'react'
import './style_raport.css'
import Cover from './cover'
import Narrative from './narrative'
import SchoolIdentity from './schoolIdentity'
import StudentIdentity from './studentIdentity'

const Raport = ({ data }) => {
  // useEffect(() => {
  //   window.print()
  // }, [])
  const murid = data?.murid
  const guru = data?.guru
  const sekolah = data?.sekolah
  return (
    <div className="body">
      <Cover></Cover>

      <SchoolIdentity></SchoolIdentity>

      <StudentIdentity></StudentIdentity>

      <Narrative></Narrative>
    </div>
  )
}

export default Raport
