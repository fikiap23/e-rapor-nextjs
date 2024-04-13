'use client'
import Loading from '@/components/shared/Loading'

import { usePrintNilaiByMinggu } from '@/hooks/usePrintNilaiByMinggu'
import { Empty } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

const PrintPenilaianPage = () => {
  // ids[0] = idRombelSemesterGuru
  // ids[1] = idTujuanPembelajaran
  const { ids } = useParams()
  const { data, isFetching } = usePrintNilaiByMinggu(ids[0], ids[1])
  console.log(data)
  return (
    <>
      {isFetching && <Loading />}
      {!isFetching && !data && <Empty />}
    </>
  )
}

export default PrintPenilaianPage
