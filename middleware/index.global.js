export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { path } = to;
  const guest = ["/social-login"];
  const authExactUrls = ["/admin"];
  const authStartsWithRoutes = ["/dashboard"];

  const { fetchUser, authUser } = useAuth();
  await fetchUser();

  const isExactRoute = authExactUrls.includes(path);
  const isStartsRoute = authStartsWithRoutes.some((route) =>
    path.startsWith(route)
  );
  if (!(isExactRoute || isStartsRoute)) {
    if (guest.includes(path)) {
      if (authUser.value) return navigateTo("/dashboard");
    }
  }
  if (isExactRoute || isStartsRoute) {
    if (!authUser.value) return navigateTo("/");
  }
  if (path === "/dashboard") return navigateTo("/dashboard/quiz");
});
