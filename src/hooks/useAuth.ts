import { fetchCurrentUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuth = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: fetchCurrentUser,
    retry: (failureCount, error) => {
      // Ne pas réessayer si l'erreur est due à une non-authentification (code 401)
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          return false;
        }
      }

      // Retry pour d'autres erreurs
      return true;
    },
  });
