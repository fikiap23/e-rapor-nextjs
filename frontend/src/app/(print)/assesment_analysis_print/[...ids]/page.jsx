'use client'
import Loading from '@/components/shared/Loading'
import PrintAssesmnet from '@/components/views/penilaian/component/print/printAssesment'
import { usePrintAnalisisNilaiSiswa } from '@/hooks/usePrintAnalisisNilaiSiswa'
import { Empty } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

const PrintAnalisisPenilaianPage = () => {
  // ids[0] = idRombelSemesterGuru
  // ids[1] = idMurid
  const { ids } = useParams()
  const { data, isFetching } = usePrintAnalisisNilaiSiswa(ids[0], ids[1])
  return (
    <>
      {isFetching && <Loading />}
      {!isFetching && !data && <Empty />}
      {!isFetching && data && <PrintAssesmnet data={data} />}
    </>
  )
}

export default PrintAnalisisPenilaianPage
