import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useGetAllKategoriRombel(token) {
  return useQuery({
    queryKey: ['get-all-kategori-rombel'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/rombel/kategori', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
