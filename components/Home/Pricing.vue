<template>
  <div class="container mx-auto py-12 px-2" id="pricing">
    <div class="text-center">
      <h2 class="md:text-4xl text-3xl font-bold">
        Straightforward, affordable pricing
      </h2>
      <p class="text-gray-500 mt-2">
        No subscriptions, no stress😃. Enjoy with one-time payments😎.
      </p>
    </div>
    <div class="overflow-x-auto mt-12">
      <table class="w-full border border-collapse min-w-[980px]">
        <thead>
          <tr>
            <th class="p-4 text-left border max-w-[150px]">
              <RadioGroup
                @update:modelValue="yearly = $event"
                :modelValue="yearly"
              >
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="monthly" :value="false" />
                  <label for="monthly" class="text-sm">Monthly Bundle</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="yearly" :value="true" />
                  <label for="yearly" class="text-sm">Yearly Bundle</label>
                </div>
              </RadioGroup>
            </th>
            <th
              class="p-4 text-center border whitespace-nowrap max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="text-xl">{{ price.name }}</p>
              <p class="font-bold text-2xl">
                ${{ yearly ? price.yearlyPrice : price.monthlyPrice }}
                <span class="text-xs text-gray-500 font-medium"
                  >/{{
                    price.name === "Pay per use"
                      ? "Per quiz"
                      : yearly
                      ? "Year"
                      : "Month"
                  }}</span
                >
              </p>
              <Button
                type="button"
                class="w-full"
                @click="openUrl(i)"
                :disabled="loading === i"
              >
                <Loader2Icon class="animate-spin" v-if="loading === i" />

                Choose Plan
              </Button>

              <p
                @click="yearly = !yearly"
                class="text-xs mt-3 font-normal cursor-pointer hover:underline"
              >
                {{ yearly ? "View monthly bundle" : "Save with yearly bundle" }}
              </p>
            </th>
          </tr>
        </thead>

        <tbody class="border text-sm">
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Generate quiz questions
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              Up to
              {{
                yearly
                  ? price.gqqYear.toLocaleString()
                  : price.gqq.toLocaleString()
              }}
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Input character Limit
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              {{ price.icl.toLocaleString() }}
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Online exam in {{ yearly ? "12 months" : "month" }}
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
              Download quiz question
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
