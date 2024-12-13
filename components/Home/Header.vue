<template>
  <div class="border-b bg-white">
    <div class="container mx-auto py-2">
      <div class="flex justify-between items-center">
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.svg" alt="logo" class="size-10" />
        </NuxtLink>
        <div class="flex gap-4 items-center">
          <NuxtLink :to="{ name: 'index', hash: '#pricing' }">Pricing</NuxtLink>
          <NuxtLink :to="{ name: 'index', hash: '#usecase' }">UseCase</NuxtLink>
          <NuxtLink :to="{ name: 'index', hash: '#blog' }">Blog</NuxtLink>
          <Button variant="outline" @click="loginModal" v-if="!loggedIn">
            Login
          </Button>
          <Button @click="loginModal" v-if="!loggedIn"> Signup </Button>
          <DropdownMenu v-if="loggedIn">
            <DropdownMenuTrigger asChild>
              <Avatar class="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-44" align="end">
              <DropdownMenuItem @click="logout">
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "~/lib/eventBus";

export default {
  name: "HomeHeader",
  computed: {
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
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
