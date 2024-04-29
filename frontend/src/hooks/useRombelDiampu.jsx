import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useRombelDiampu(token, status = 'ACTIVE') {
  return useQuery({
    queryKey: ['get-all-rombel-diampu'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/guru/rombel-semester-guru', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: status,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
