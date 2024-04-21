import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useDashboardTeacher(token) {
    return useQuery({
        queryKey: ['get-dashboard-teacher'],
        initialData: [],
        queryFn: async () => {
            const res = await ApiClient.get('/guru/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = res.data.data

            return data
        },
    })
}
