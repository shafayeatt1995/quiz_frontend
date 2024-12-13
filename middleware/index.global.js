export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { path } = to;
  const guest = ["/social-login"];
  const authExactUrls = ["/admin"];
  const authStartsWithRoutes = ["/dashboard"];

  const { userLoggedIn, authUser } = useAuth();
  await userLoggedIn();

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
});
