import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function usePrintOneModulAjar(token, id) {
  return useQuery({
    queryKey: ['print-one-modul-ajar'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/modul-ajar/print/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
