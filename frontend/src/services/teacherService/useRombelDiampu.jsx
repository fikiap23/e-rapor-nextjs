import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useRombelDiampu(token) {
  return useQuery({
    queryKey: ['get-all-rombel-diampu'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/guru/rombel-semester-guru', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
