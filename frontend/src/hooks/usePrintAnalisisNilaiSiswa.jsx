import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function usePrintAnalisisNilaiSiswa(idRombelSemesterGuru, idMurid) {
  const payload = {
    idRombelSemesterGuru,
    idMurid,
  }
  return useQuery({
    queryKey: ['print-analisis-nilai-siswa'],
    initialData: {},
    queryFn: async () => {
      const res = await ApiClient.post(
        `/nilai-mingguan/read/print/one-murid`,
        payload
      )
      const data = res.data.data

      return data
    },
  })
}
