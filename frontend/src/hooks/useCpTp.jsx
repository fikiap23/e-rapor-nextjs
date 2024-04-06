import { ApiClient } from '@/services/apiUrls'
import { useQuery } from '@tanstack/react-query'

export function useCpTp(token) {
  return useQuery({
    queryKey: ['get-all-cp'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/silabus/cp/with-tp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
