import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useArsipSiswasByIdSemesterGuru(id) {
  return useQuery({
    queryKey: ['get-arsip-siswas-by-id-rombel-semester-guru'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/murid/rombel-semester-guru/arsip/${id}`)
      const data = res.data.data

      return data
    },
  })
}
