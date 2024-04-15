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
  const kapsek = data?.kapsek
  const rombel = data?.rombel
  const semester = data?.semester
  const sekolah = data?.sekolah
  const rapor = data?.rapor
  return (
    <div className="body">
      <Cover
        murid={murid}
        rombel={rombel}
        sekolah={sekolah}
        semester={semester}
      ></Cover>

      <SchoolIdentity></SchoolIdentity>

      <StudentIdentity></StudentIdentity>

      <Narrative></Narrative>
    </div>
  )
}

export default Raport
