export const useApi = () => {
  const { cookieParse } = useUtils();
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;
  const AP2I_URL = config.public.AP2I_URL;

  const api = {
    async request(
      method,
      url,
      jsonBody = null,
      formData = null,
      params = null,
      api2 = false
    ) {
      let token = null;
      if (typeof window === "undefined") {
        const cookie = useRequestHeaders(["cookie"])?.cookie;
        if (cookie) {
          const parse = cookieParse(cookie);
          token = parse?.sessionToken || null;
        }
      } else {
        const parse = cookieParse();
        token = parse?.sessionToken || null;
      }
      const headers = {
        "Content-Type": "application/json",
        ...(token
          ? token.startsWith("Bearer")
            ? { Authorization: token }
            : { Authorization: `Bearer ${token}` }
          : {}),
      };

      const options = {
        method,
        headers: formData ? {} : headers,
        body: formData || (jsonBody && JSON.stringify(jsonBody)),
      };

      const query = params ? `?${new URLSearchParams(params)}` : "";
      return $fetch((api2 ? AP2I_URL : API_URL) + url + query, options);
    },

    get(url, params) {
      return this.request("GET", url, null, null, params);
    },

    post(url, jsonBody = null, formData = null) {
      return this.request("POST", url, jsonBody, formData);
    },

    put(url, jsonBody = null, formData = null) {
      return this.request("PUT", url, jsonBody, formData);
    },

    delete(url, params) {
      return this.request("DELETE", url, null, null, params);
    },

    get2(url, params) {
      return this.request("GET", url, null, null, params, true);
    },

    post2(url, jsonBody = null, formData = null) {
      return this.request("POST", url, jsonBody, formData, null, true);
    },

    put2(url, jsonBody = null, formData = null) {
      return this.request("PUT", url, jsonBody, formData, null, true);
    },

    delete2(url, params) {
      return this.request("DELETE", url, null, null, params, true);
    },
  };
  return { api };
};
