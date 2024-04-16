'use client'
import React, { useEffect } from 'react'
import './style_raport.css'
import Cover from './cover'
import Narrative from './narrative'
import SchoolIdentity from './schoolIdentity'
import StudentIdentity from './studentIdentity'

const Raport = ({ data }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.print()
    }, 1000) // Delay 1 detik

    return () => clearTimeout(timeout)
  }, [])

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

      <SchoolIdentity semester={semester} sekolah={sekolah}></SchoolIdentity>

      <StudentIdentity murid={murid} kapsek={kapsek}></StudentIdentity>

      <Narrative
        murid={murid}
        rapor={rapor}
        guru={guru}
        rombel={rombel}
        sekolah={sekolah}
        semester={semester}
        kapsek={kapsek}
      ></Narrative>
    </div>
  )
}

export default Raport
