import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useJadwalAjars(token) {
  return useQuery({
    queryKey: ['get-all-jadwal-ajar'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/jadwal-ajar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
