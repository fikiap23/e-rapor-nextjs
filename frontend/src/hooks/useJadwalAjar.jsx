import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useJadwalAjars(token, idRombelSemesterGuru) {
  return useQuery({
    queryKey: ['get-all-jadwal-ajar-by-semster'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(
        `/jadwal-ajar/rombel-semester-guru/${idRombelSemesterGuru}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = res.data.data

      return data
    },
  })
}
