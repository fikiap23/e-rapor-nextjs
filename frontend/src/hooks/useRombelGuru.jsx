import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useGetAllRombelWithGuru(token) {
  return useQuery({
    queryKey: ['get-all-rombel-with-guru'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/rombel/guru', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
