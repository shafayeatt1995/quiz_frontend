<template>
  <div class="container mx-auto py-12 px-2" id="pricing">
    <div class="text-center">
      <h2 class="md:text-4xl text-3xl font-bold">Pricing Plan</h2>
      <p class="mt-2">
        Affordable plans designed to support every learner’s journey.
      </p>
    </div>
    <div class="grid lg:grid-cols-3 items-center gap-y-5 mt-12">
      <!-- Free Plan -->
      <div
        class="bg-white border border-gray-300 shadow-sm rounded-3xl p-8 sm:p-10"
      >
        <div>
          <h3 class="text-slate-900 text-4xl font-semibold">Free Plan</h3>
        </div>

        <div class="mt-8">
          <h4 class="text-slate-900 text-lg font-semibold">
            Try Mr. Quizer for free — no credit card required.
          </h4>

          <ul class="mt-6 space-y-5 text-[15px] text-slate-600 font-medium">
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> Unlimited Quiz Runs
              (Fair Use)
            </li>
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> Can't share quiz with
              Public
            </li>
          </ul>

          <Button type="button" class="w-full mt-8" @click="signin">
            Get Started Free
          </Button>
        </div>
      </div>

      <!-- Pro Plan -->
      <div
        class="bg-gray-900 border border-gray-900 shadow-2xl rounded-3xl p-8 sm:p-10 relative"
      >
        <div>
          <h3 class="text-white text-4xl font-semibold">
            $10
            <sub class="text-slate-300 text-[15px]">/ per year</sub>
          </h3>
        </div>

        <div class="mt-8">
          <h4 class="text-white text-lg font-semibold">
            Ideal for educators, coaches, and solo creators.
          </h4>

          <ul class="mt-6 space-y-5 text-[15px] text-slate-300 font-medium">
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> Unlimited Quiz Runs
              (Fair Use)
            </li>
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> Share with public and
              take exam
            </li>
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> Priority Email Support
            </li>
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> Early Access to New
              Features
            </li>
          </ul>

          <Button
            type="button"
            variant="outline"
            class="w-full mt-8"
            @click="openUrl('month')"
            :disabled="loading === 'month'"
          >
            <Loader2Icon class="mr-1 animate-spin" v-if="loading === 'month'" />

            Upgrade to Pro
          </Button>
        </div>
      </div>

      <div
        class="bg-white border border-gray-300 shadow-md rounded-3xl p-8 sm:p-10"
      >
        <div>
          <h3 class="text-slate-900 text-4xl font-semibold">
            $99
            <sub class="text-gray-600 text-[15px]">/ per year</sub>
          </h3>
        </div>

        <div class="mt-8">
          <h4 class="text-slate-900 text-lg font-semibold">
            Best for institutions managing multiple users.
          </h4>

          <ul class="mt-6 space-y-5 text-[15px] text-slate-600 font-medium">
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> All pro Plan features
            </li>
            <li class="flex items-center">
              <CheckIcon class="mr-3 text-green-500" /> 2 months free
            </li>
          </ul>

          <Button
            type="button"
            class="w-full mt-8"
            @click="openUrl('year')"
            :disabled="loading === 'year'"
          >
            <Loader2Icon class="mr-1 animate-spin" v-if="loading === 'year'" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioGroup from "@/components/ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "@/components/ui/radio-group/RadioGroupItem.vue";
import eventBus from "@/lib/eventBus";
import { CheckIcon, Loader2Icon, XIcon } from "lucide-vue-next";
import { useLimit } from "@/composables/useLimit";

export default {
  name: "HomePricing",
  components: { RadioGroup, RadioGroupItem, CheckIcon, XIcon, Loader2Icon },
  data() {
    return {
      click: true,
      loading: null,
      paddle: null,
    };
  },
  computed: {
    pricing() {
      const data = useLimit();
      return Object.values(data).filter((val) => typeof val === "object");
    },
    loggedIn() {
      return useAuth().loggedIn;
    },
  },
  mounted() {
    this.initPaddle();
  },
  methods: {
    async initPaddle() {
      try {
        const { initializePaddle } = await import("@paddle/paddle-js");

        const { PADDLE_TOKEN, PADDLE_ENVIRONMENT } = useRuntimeConfig().public;
        this.paddle = await initializePaddle({
          environment: PADDLE_ENVIRONMENT,
          token: PADDLE_TOKEN,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async openUrl(i) {
      if (this.click) {
        try {
          this.click = false;
          this.loading = i;
          const { authUser } = useAuth();
          if (authUser.value) {
            const { PADDLE_ENVIRONMENT, BASE_URL } = useRuntimeConfig().public;
            const pack = i;
            const liveKey = i === "month" ? "" : "";
            const sandboxKey =
              i === "month"
                ? "pri_01jfjxq5n6bxeddz7s54f64trs"
                : "pri_01jfjxszwcggm9bcan4jzv55y9";

            const priceId =
              PADDLE_ENVIRONMENT === "sandbox" ? sandboxKey : liveKey;

            this.paddle.Checkout.open({
              settings: {
                allowedPaymentMethods: [
                  "alipay",
                  "apple_pay",
                  "bancontact",
                  "card",
                  "google_pay",
                  "ideal",
                  "paypal",
                  "saved_payment_methods",
                ],
                displayMode: "overlay",
                successUrl: `${BASE_URL}/payment/success`,
                variant: "one-page",
              },
              items: [{ priceId }],
              customer: { email: authUser.value.email },
              customData: {
                userID: authUser.value._id,
                userEmail: authUser.value.email,
                package: pack,
              },
            });
          } else {
            eventBus.emit("loginModal");
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.click = true;
          setTimeout(() => {
            this.loading = null;
          }, 5000);
        }
      }
    },
    signin() {
      this.loggedIn
        ? this.$router.push({ name: "dashboard" })
        : eventBus.emit("loginModal");
    },
  },
};
</script>
