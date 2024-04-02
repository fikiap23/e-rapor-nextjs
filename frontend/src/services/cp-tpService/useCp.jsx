import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useCp(token) {
  return useQuery({
    queryKey: ['get-all-cp'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/silabus/cp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
