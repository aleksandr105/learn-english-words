import axios from "axios";

axios.defaults.baseURL = "https://cute-tan-slug-hat.cyclic.app/api";

export const instance = axios.create({
  baseURL: "https://cute-tan-slug-hat.cyclic.app/api",
});

instance.interceptors.request.use((config) => {
  const getAccessToken = localStorage.getItem("accessToken");

  config.headers.Authorization = `Bearer ${getAccessToken}`;
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const errorMessage = error.response.data.message;

    if (
      error.response.status === 401 &&
      error.config &&
      (errorMessage === "invalid token or not authorized" ||
        errorMessage === "not authorized" ||
        errorMessage === "Refresh token expired")
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken === "null" || !refreshToken) return;

      try {
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        localStorage.setItem("refreshToken", data.refreshToken);

        localStorage.setItem("accessToken", data.accessToken);

        return instance.request(originalRequest);
      } catch (error) {}
    }

    throw error;
  }
);
