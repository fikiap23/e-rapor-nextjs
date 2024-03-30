import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useSekolah(token) {
  return useQuery({
    queryKey: ['get-sekolah'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/sekolah', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
