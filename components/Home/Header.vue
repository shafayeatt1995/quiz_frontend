<template>
  <div class="h-3"></div>
  <header class="mx-2 lg:mx-0 sticky top-3 z-50">
    <div
      class="container mx-auto flex items-center gap-4 px-5 py-3 justify-between border rounded-full shadow backdrop-blur-lg"
    >
      <NuxtLink
        :to="{ name: 'index' }"
        class="flex items-center gap-2 text-xl font-bold text-gray-700"
      >
        <img src="/logo.svg" alt="logo" class="size-8" /> {{ appName }}
      </NuxtLink>
      <nav
        class="font-medium flex-row items-center md:gap-5 gap-5 hidden md:flex"
      >
        <NuxtLink to="/" class="hover:underline"> Home </NuxtLink>
        <NuxtLink
          :to="{ name: 'index', hash: '#pricing' }"
          class="hover:underline"
        >
          Pricing
        </NuxtLink>
        <NuxtLink :to="{ name: 'index', hash: '#faq' }" class="hover:underline">
          FAQ
        </NuxtLink>
        <NuxtLink to="/contact" class="hover:underline"> Contact </NuxtLink>
        <NuxtLink to="/about" class="hover:underline"> About </NuxtLink>
      </nav>
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" class="md:hidden">
              <MenuIcon class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <NuxtLink to="/" class="flex gap-2 w-full"> Home </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NuxtLink
                :to="{ name: 'index', hash: '#pricing' }"
                class="flex gap-2 w-full"
              >
                Pricing
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NuxtLink
                :to="{ name: 'index', hash: '#faq' }"
                class="flex gap-2 w-full"
              >
                FAQ
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NuxtLink to="/contact" class="flex gap-2 w-full">
                Contact
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NuxtLink to="/about" class="flex gap-2 w-full"> About </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu v-if="loggedIn">
          <DropdownMenuTrigger asChild>
            <Avatar class="cursor-pointer">
              <AvatarImage :src="authUser?.avatar" :alt="authUser?.name" />
              <AvatarFallback class="text-base">{{
                authUser?.name
                  .split(" ")
                  .map((i) => i[0].toUpperCase())
                  .join("")
              }}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-44" align="end">
            <DropdownMenuItem :to="{ name: 'dashboard' }">
              <NuxtLink :to="{ name: 'dashboard' }" class="flex gap-2 w-full">
                <LayoutDashboardIcon :size="18" />
                <span>Dashboard</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem @click="logout" class="cursor-pointer">
              <LogOutIcon />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button @click="loginModal" v-else> Sign In </Button>
      </div>
    </div>
  </header>
</template>

<script>
import { LayoutDashboardIcon, LogOutIcon, MenuIcon } from "lucide-vue-next";
import eventBus from "~/lib/eventBus";

export default {
  name: "HomeHeader",
  components: { LogOutIcon, LayoutDashboardIcon, MenuIcon },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    appName() {
      const { appName } = useUtils();
      return appName;
    },
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
    },
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
  },
  watch: {
    $route(to, from) {
      if (to.hash !== from.hash) {
        this.open = false;
      }
    },
  },
  methods: {
    loginModal() {
      eventBus.emit("loginModal");
    },
    logout() {
      const { logout } = useAuth();
      logout();
    },
  },
};
</script>

<style></style>
