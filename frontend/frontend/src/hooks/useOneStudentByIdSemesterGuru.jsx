import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useOneStudentByIdSemesterGuru(id) {
  return useQuery({
    queryKey: ['get-one-student-semester-guru'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/murid/rombel-semester-guru/${id}`)
      const data = res.data.data

      return data
    },
  })
}
