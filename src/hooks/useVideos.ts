import { fetchVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import router from "next/router";

const useVideos  = () => useQuery({
  queryKey: ["videos"],
  queryFn: fetchVideos,
  retry: (failureCount, error) => {
    // Ne pas réessayer si l'erreur est due à une non-authentification (code 401)
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) {
        router.push("/auth/sign-in");
        return false;
      }
    }

    // Retry pour d'autres erreurs
    return true;
  },
});

export default useVideos;
