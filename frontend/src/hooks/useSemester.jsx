import { ApiClient } from '@/services/apiUrls'
import { useQuery } from '@tanstack/react-query'

export function useGetAllSemesterData(token, isAktif) {
  return useQuery({
    queryKey: ['get-all-semester'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/semester', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      let data = res.data.data
      if (data.length > 0 && isAktif) {
        // filter isAktif
        data = data.filter((s) => s.isAktif === true)
      }

      return data
    },
  })
}
