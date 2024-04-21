import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useDashboardAdmin(token) {
    return useQuery({
        queryKey: ['get-dashboard-admin'],
        initialData: [],
        queryFn: async () => {
            const res = await ApiClient.get('/user/admin/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = res.data.data

            return data
        },
    })
}
