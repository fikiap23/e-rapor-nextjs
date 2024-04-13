import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useRombelWithSemester(idRombelSemesterGuru) {
  return useQuery({
    queryKey: ['get-rombel-with-semester'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(
        `/rombel/rombel-semester-guru/${idRombelSemesterGuru}`
      )
      const data = res.data.data

      return data
    },
  })
}
