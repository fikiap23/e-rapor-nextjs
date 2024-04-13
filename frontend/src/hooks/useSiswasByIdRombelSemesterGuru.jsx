import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useSiswasByIdSemesterGuru(id) {
  return useQuery({
    queryKey: ['get-siswas-by-id-rombel-semester-guru'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/murid/rombel-semester-guru/many/${id}`)
      const data = res.data.data

      return data
    },
  })
}
