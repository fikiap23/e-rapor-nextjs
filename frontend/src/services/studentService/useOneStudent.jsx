import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useOneStudent(token, id) {
  return useQuery({
    queryKey: ['get-one-student'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/murid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
