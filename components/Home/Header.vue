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
      <nav class="font-medium flex flex-row items-center md:gap-5 gap-3">
        <Sheet class="md:hidden" :open="open" @update:open="open = !open">
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <MenuIcon class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav class="flex flex-col gap-5 text-lg font-medium">
              <NuxtLink :to="{ name: 'index', hash: '#pricing' }">
                Pricing
              </NuxtLink>
              <NuxtLink :to="{ name: 'index', hash: '#faq' }"> FAQ </NuxtLink>
            </nav>
          </SheetContent>
        </Sheet>
        <NuxtLink
          :to="{ name: 'index', hash: '#pricing' }"
          class="hidden md:block"
        >
          Pricing
        </NuxtLink>
        <NuxtLink :to="{ name: 'index', hash: '#faq' }" class="hidden md:block">
          FAQ
        </NuxtLink>
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

        <Button @click="loginModal" v-if="!loggedIn"> Login </Button>
      </nav>
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
