import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useStudentsNullRombel(token) {
  return useQuery({
    queryKey: ['get-all-student-null-rombel'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/murid/null-rombel', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
