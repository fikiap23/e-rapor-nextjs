import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useGetAllRombel(token) {
  return useQuery({
    queryKey: ['get-all-rombel'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/rombel', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
