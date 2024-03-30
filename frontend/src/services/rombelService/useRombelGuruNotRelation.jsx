import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '../apiUrls'

export function useRombelsNotRelationWithGuru(token) {
  return useQuery({
    queryKey: ['get-all-rombel-no-relation-with-guru'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/rombel/guru/not-join', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
