'use client'
import Loading from '@/components/shared/Loading'
import Raport from '@/components/views/rapor/components/printRaport'
import { usePrintOneRapor } from '@/hooks/usePrintOneRapor'
import { Empty } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

const PrintRaporPage = () => {
  const { id } = useParams()
  const {
    data,
    error: errorRapor,
    isFetching: isFetchingRapor,
    refetch: refetchRapor,
  } = usePrintOneRapor(id)
  return (
    <>
      {isFetchingRapor && <Loading />}
      {!isFetchingRapor && !data && <Empty />}
      {!isFetchingRapor && data && <Raport data={data} />}
    </>
  )
}

export default PrintRaporPage
