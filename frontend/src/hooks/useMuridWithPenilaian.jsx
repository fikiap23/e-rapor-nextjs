import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useMuridWithPenilaian(
  idRombelSemesterGuru,
  idTujuanPembelajaran
) {
  const payload = {
    idRombelSemesterGuru,
    idTujuanPembelajaran,
  }
  return useQuery({
    queryKey: ['get-murid-with-penilaian'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.post(`/nilai-mingguan/read/murid/`, payload)
      const data = res.data.data

      return data
    },
  })
}
