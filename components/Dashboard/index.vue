<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NuxtLink
            :to="{ name: 'dashboard' }"
            class="flex items-center gap-2 font-bold text-xl"
          >
            <img src="/logo.svg" alt="logo" class="size-8" loading="lazy" />
            Mr. Quizer
          </NuxtLink>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <DashboardSidebar />
          </nav>
        </div>
        <div class="mt-auto p-4">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button
                size="sm"
                class="w-full"
                @click="$router.push({ name: 'index', hash: '#pricing' })"
              >
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:justify-end justify-between"
      >
        <NuxtLink
          :to="{ name: 'index' }"
          class="flex items-center gap-2 font-semibold text-xl md:hidden"
        >
          <img src="/logo.svg" alt="logo" class="size-8" loading="lazy" />
          <span class="">Quizer</span>
        </NuxtLink>
        <div class="flex items-center gap-3">
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                <MenuIcon class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="flex flex-col">
              <nav class="grid gap-2 text-lg font-medium">
                <NuxtLink
                  :to="{ name: 'index' }"
                  class="flex items-center gap-2 font-semibold text-xl md:hidden ml-2"
                >
                  <img
                    src="/logo.svg"
                    alt="logo"
                    class="size-8"
                    loading="lazy"
                  />
                </NuxtLink>
                <DashboardSidebar />
              </nav>
              <div class="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" class="w-full"> Upgrade </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Avatar class="cursor-pointer">
                <AvatarImage :src="authUser.avatar" :alt="authUser.name" />
                <AvatarFallback>{{ authUser.name }}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-52" align="end">
              <DropdownMenuLabel>
                <p>{{ authUser.name }}</p>
                <p class="font-normal mt-1">
                  Question left: {{ authUser.questionCount }}
                </p>
                <p class="font-normal mt-1">
                  Exam left: {{ authUser.examCount }}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
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
        </div>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-2 lg:p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import { LayoutDashboardIcon, MenuIcon, LogOutIcon } from "lucide-vue-next";

export default {
  name: "DashboardComponent",
  components: { MenuIcon, LayoutDashboardIcon, LogOutIcon },
  data() {
    return { interval: null };
  },
  computed: {
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
    },
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
  },
  mounted() {
    this.trigger();
    this.interval = setInterval(() => {
      this.trigger();
    }, 12 * 60 * 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    async trigger() {
      try {
        const { api } = useApi();
        await api.get2("/");
      } catch (error) {}
    },
    async logout() {
      try {
        const { logout } = useAuth();
        await logout();
      } catch (error) {}
    },
  },
};
</script>
