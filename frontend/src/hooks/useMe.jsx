import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/services/apiUrls'

export function useMe(token) {
    return useQuery({
        queryKey: ['get-me'],
        initialData: [],
        queryFn: async () => {
            const res = await ApiClient.get(`/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = res.data.data

            return data
        },
    })
}
