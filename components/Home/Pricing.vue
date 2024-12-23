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
              <Button type="button" class="w-full" @click="openUrl(i)">
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
              Quiz in {{ yearly ? "12 months" : "month" }}
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="flex items-center justify-center">
                {{ yearly ? price.qqmYear : price.qqm }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">Questions per Quiz</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              Up to {{ price.qpq }}
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
              {{ price.cil.toLocaleString() }}
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
            <td class="px-4 py-3 border max-w-[150px]">Online exam</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.oe" class="text-green-500" />
                <XIcon v-else class="text-rose-500" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">Rearrange Questions</td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <div class="flex justify-center items-center">
                <CheckIcon v-if="price.rqp" class="text-green-500" />
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
import { CheckIcon, XIcon } from "lucide-vue-next";
import { initializePaddle } from "@paddle/paddle-js";

export default {
  name: "HomePricing",
  components: { RadioGroup, RadioGroupItem, CheckIcon, XIcon },
  data() {
    return {
      click: true,
      loading: false,
      yearly: false,
      pricing: [
        {
          name: "Starter Plan",
          monthlyPrice: 9,
          yearlyPrice: 89,
          paddle: {
            monthlyName: "starter_monthly",
            yearlyName: "starter_yearly",
            monthly: "pri_01jfjxq5n6bxeddz7s54f64trs",
            yearly: "pri_01jfjxszwcggm9bcan4jzv55y9",
          },
          qqm: 50,
          qqmYear: 500,
          qpq: 25,
          cil: 5000,
          ttq: true,
          utq: true,
          ytq: true,
          ptq: true,
          rqp: true,
          oe: true,
          apq: false,
          mls: false,
        },
        {
          name: "Growth Plan",
          monthlyPrice: 19,
          yearlyPrice: 189,
          paddle: {
            monthlyName: "growth_monthly",
            yearlyName: "growth_yearly",
            monthly: "pri_01jfjxyfnjrkgjexstgnm4zjx4",
            yearly: "pri_01jfjy17tpf4d3z7ahjk0vjxtg",
          },
          qqm: 200,
          qqmYear: 2000,
          qpq: 50,
          cil: 10000,
          ttq: true,
          utq: true,
          ytq: true,
          ptq: true,
          rqp: true,
          oe: true,
          apq: false,
          mls: true,
        },
        {
          name: "Professional Plan",
          monthlyPrice: 29,
          yearlyPrice: 289,
          paddle: {
            monthlyName: "professional_monthly",
            yearlyName: "professional_yearly",
            monthly: "pri_01jfjy3m34kw4m7be10d2ynwx5",
            yearly: "pri_01jfjy4y2z790pjdehvvdn1tfm",
          },
          qqm: 500,
          qqmYear: 5000,
          qpq: 100,
          cil: 25000,
          ttq: true,
          utq: true,
          ytq: true,
          ptq: true,
          rqp: true,
          oe: true,
          apq: true,
          mls: true,
        },
        {
          name: "Free trial",
          monthlyPrice: 0,
          yearlyPrice: 0,
          qqm: "Total 3",
          qqmYear: "Total 3",
          qpq: 25,
          cil: 100,
          ttq: true,
          utq: true,
          ytq: true,
          ptq: true,
          apq: true,
          oe: true,
          rqp: true,
          mls: true,
        },
      ],
      paddle: null,
    };
  },
  mounted() {
    const { PADDLE_ENVIRONMENT, PADDLE_TOKEN } = useRuntimeConfig().public;
    initializePaddle({
      environment: PADDLE_ENVIRONMENT,
      token: PADDLE_TOKEN,
    }).then((paddleInstance) => {
      if (paddleInstance) this.paddle = paddleInstance;
    });
  },
  methods: {
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
            this.loading = false;
          }, 5000);
        }
      }
    },
  },
};
</script>
