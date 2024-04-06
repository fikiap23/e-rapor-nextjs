import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useOneRombel(token, id) {
  return useQuery({
    queryKey: ['get-one-rombel'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/rombel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
