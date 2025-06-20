<template>
  <div class="container mx-auto py-12 px-2" id="pricing">
    <div class="text-center">
      <h2 class="md:text-4xl text-3xl font-bold">
        Straightforward, affordable pricing
      </h2>
      <p class="mt-2">Free for Students & Self-Learners</p>
    </div>
    <div class="overflow-x-auto mt-12">
      <table class="w-full border border-collapse min-w-[980px]">
        <thead>
          <tr>
            <th class="p-4 text-left border max-w-[160px]">
              <p class="font-normal">
                No subscriptions, no stress😃.
                <br />
                Enjoy with one-time payments😎.
              </p>
            </th>
            <th
              class="p-4 text-center border whitespace-nowrap max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="text-xl">{{ price.name }}</p>
              <p class="font-bold text-2xl">${{ price.monthlyPrice }}</p>
              <Button
                type="button"
                class="w-full mt-2"
                @click="openUrl(i)"
                :disabled="loading === i"
              >
                <Loader2Icon class="animate-spin" v-if="loading === i" />

                {{ price.name === "Enterprise" ? "Contact Us" : "Choose Plan" }}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody class="border">
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Practice Exam for my self
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="flex items-center justify-center">
                {{ price.pe }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Create online exam for your student
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="flex items-center justify-center">
                {{ yearly ? price.oemYear : price.oem }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Online exam Student limit
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="flex items-center justify-center">
                {{ price.sl }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Download quiz question in PDF, Doc format
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.dqq" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">Text to Quiz</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.ttq" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">URL to Quiz</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.utq" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">YouTube to Quiz</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.ytq" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">PDF to Quiz</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.ptq" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Multi Languages Support
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.mls" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">Access Previous Quiz</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.apq" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      yearly: false,
      paddle: null,
    };
  },
  computed: {
    pricing() {
      const data = useLimit();
      return Object.values(data).filter((val) => typeof val === "object");
    },
  },
  mounted() {
    this.initPaddle();
  },
  methods: {
    async initPaddle() {
      try {
        const { initializePaddle } = await import("@paddle/paddle-js");

        const { PADDLE_ENVIRONMENT, PADDLE_TOKEN } = useRuntimeConfig().public;
        initializePaddle({
          environment: PADDLE_ENVIRONMENT,
          token: PADDLE_TOKEN,
        }).then((paddleInstance) => {
          if (paddleInstance) this.paddle = paddleInstance;
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
            const pack = this.pricing[i];
            if (pack.name === "Free trial") {
              this.$router.push({ name: "dashboard" });
            } else {
              const { BASE_URL } = useRuntimeConfig().public;
              const { monthly, yearly, monthlyName, yearlyName } = pack.paddle;
              const priceId = this.yearly ? yearly : monthly;

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
                items: [{ quantity: 1, priceId }],
                customer: { email: authUser.value.email },
                customData: {
                  userID: authUser.value._id,
                  package: this.yearly ? yearlyName : monthlyName,
                  period: this.yearly ? "yearly" : "monthly",
                },
              });
            }
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
  },
};
</script>
