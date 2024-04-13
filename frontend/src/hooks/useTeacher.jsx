import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useGetAllTeacherData(token) {
  return useQuery({
    queryKey: ['get-all-teacher'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/guru', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
