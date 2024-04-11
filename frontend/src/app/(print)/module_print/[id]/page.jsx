'use client'
import Loading from '@/components/shared/Loading'
import PrintModule from '@/components/views/print/modul_ajar/printModule'
import useAuth from '@/hooks/useAuth'
import { usePrintOneModulAjar } from '@/hooks/usePrintModulAjar'
import { Empty } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

const PrintModulAjarPage = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const {
    data,
    error: errorModulAjars,
    isFetching: isFetchingModulAjars,
    refetch: refetchModulAjars,
  } = usePrintOneModulAjar(token, id)
  return (
    <>
      {isFetchingModulAjars && <Loading />}
      {!isFetchingModulAjars && !data && <Empty />}
      {!isFetchingModulAjars && data && <PrintModule data={data} />}
    </>
  )
}

export default PrintModulAjarPage
