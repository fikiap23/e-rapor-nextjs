import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useModulAjars(token) {
  return useQuery({
    queryKey: ['get-all-modul-ajars'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get('/modul-ajar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data

      return data
    },
  })
}
