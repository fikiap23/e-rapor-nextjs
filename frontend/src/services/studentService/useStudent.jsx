import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiUrls";

export function useGetAllStudentData(token) {
  return useQuery({
    queryKey: ["get-all-student"],
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get("/murid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;

      return data;
    },
  });
}
