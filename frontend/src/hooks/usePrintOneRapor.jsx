import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function usePrintOneRapor(id) {
  return useQuery({
    queryKey: ['print-one-rapor'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/rapor/print/${id}`)
      const data = res.data.data

      return data
    },
  })
}
