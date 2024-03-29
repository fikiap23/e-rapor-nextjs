import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

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
      console.log(res.data)
      const data = res.data.data

      return data
    },
  })
}
