import { ApiClient } from '@/services/apiUrls'
import { useQuery } from '@tanstack/react-query'

export function useGetAllSemesterData(token) {
  return useQuery({
    queryKey: ['get-all-semester'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/semester', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
