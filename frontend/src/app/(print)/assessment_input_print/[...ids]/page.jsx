'use client'
import Loading from '@/components/shared/Loading'
import PrintAssesmnetInput from '@/components/views/penilaian/component/print/printAssesmentInput'

import { usePrintNilaiByMinggu } from '@/hooks/usePrintNilaiByMinggu'
import { Empty } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

const PrintPenilaianPage = () => {
  // ids[0] = idRombelSemesterGuru
  // ids[1] = idTujuanPembelajaran
  const { ids } = useParams()
  const { data, isFetching } = usePrintNilaiByMinggu(ids[0], ids[1])
  return (
    <>
      {isFetching && <Loading />}
      {!isFetching && !data && <Empty />}
      {!isFetching && data && <PrintAssesmnetInput data={data} />}
    </>
  )
}

export default PrintPenilaianPage
