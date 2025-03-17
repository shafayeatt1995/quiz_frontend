export const useAuth = () => {
  const { api } = useApi();
  const { cookieParse, removeCookie, setCookie } = useUtils();
  const authUser = useAuthUser();
  const loggedIn = !!authUser.value;
  const setUser = (user) => {
    authUser.value = user;
  };
  const login = async (user) => {
    try {
      const data = await api.post("/auth/login", user);
      setUser(data.user);
      setCookie("sessionToken", data.token, { expires: 7 });
    } catch (err) {}
  };
  const userLoggedIn = async () => {
    try {
      if (!authUser.value) {
        let cookie = null;
        if (typeof window !== "undefined") {
          cookie = document?.cookie || null;
        } else {
          cookie = useRequestHeaders(["cookie"])?.cookie || null;
        }
        if (cookie && cookieParse(cookie)?.sessionToken) {
          const data = await api.get("/auth/user");
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const logout = (redirect = "/") => {
    removeCookie("sessionToken");
    setUser(null);
    navigateTo(redirect);
  };
  const refreshToken = async () => {
    try {
      const data = await api.get("/user/refresh-token");
      setUser(data.user);
      setCookie("sessionToken", data.token, { expires: 7 });
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return {
    login,
    userLoggedIn,
    logout,
    authUser,
    loggedIn,
    refreshToken,
  };
};
