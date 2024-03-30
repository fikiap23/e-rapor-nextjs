import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useMapels(token) {
  return useQuery({
    queryKey: ['get-all-mapel'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/mapel', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
