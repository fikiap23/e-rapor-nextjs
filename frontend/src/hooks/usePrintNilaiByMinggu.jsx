import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function usePrintNilaiByMinggu(
  idRombelSemesterGuru,
  idTujuanPembelajaran
) {
  const payload = {
    idRombelSemesterGuru,
    idTujuanPembelajaran,
  }
  return useQuery({
    queryKey: ['print-nilai-mingguan'],
    initialData: {},
    queryFn: async () => {
      const res = await ApiClient.post(`/nilai-mingguan/read/print`, payload)
      const data = res.data.data

      return data
    },
  })
}
