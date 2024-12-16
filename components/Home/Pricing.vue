<template>
  <div class="container mx-auto py-12 px-2" id="pricing">
    <div class="text-center">
      <h2 class="md:text-4xl text-3xl font-bold">
        Straightforward, affordable pricing
      </h2>
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
                  <label for="monthly" class="text-sm">Pay monthly</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="yearly" :value="true" />
                  <label for="yearly" class="text-sm"
                    >Pay yearly
                    <span class="text-xs">(Save 2 months)</span></label
                  >
                </div>
              </RadioGroup>
            </th>
            <th
              class="p-4 text-center border whitespace-nowrap max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              <p class="text-xl">{{ price.name }}</p>
              <h3 class="font-bold text-2xl">
                ${{ yearly ? price.yearlyPrice : price.monthlyPrice }}
                <span class="text-xs text-gray-500 font-medium"
                  >/{{ yearly ? "Year" : "Month" }}</span
                >
              </h3>
              <Button type="button" class="w-full"> Choose Plan </Button>

              <p
                @click="yearly = !yearly"
                class="text-xs mt-3 font-normal cursor-pointer hover:underline"
              >
                {{
                  yearly
                    ? "View monthly billing"
                    : "Save with yearly (2 months free)"
                }}
              </p>
            </th>
          </tr>
        </thead>

        <tbody class="border text-sm">
          <tr>
            <td class="px-4 py-3 border max-w-[150px]">
              Quiz Questions per month
            </td>
            <td
              class="px-4 py-3 text-center border max-w-[150px]"
              v-for="(price, i) in pricing"
              :key="i"
            >
              {{ price.qqm }}
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
              Character Input Limit
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RadioGroup from "@/components/ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "@/components/ui/radio-group/RadioGroupItem.vue";
import { CheckIcon, XIcon } from "lucide-vue-next";
export default {
  name: "HomePricing",
  components: { RadioGroup, RadioGroupItem, CheckIcon, XIcon },
  data() {
    return {
      yearly: false,
      pricing: [
        {
          name: "Basic Plan",
          monthlyPrice: 9,
          yearlyPrice: 89,
          qqm: 30,
          qpq: 20,
          cil: 6000,
          utq: true,
          ytq: true,
          ptq: true,
          apq: true,
          mls: true,
        },
        {
          name: "Pro Plan",
          monthlyPrice: 19,
          yearlyPrice: 189,
          qqm: "Unlimited",
          qpq: 50,
          cil: 12000,
          utq: true,
          ytq: true,
          ptq: true,
          apq: true,
          mls: true,
        },
        {
          name: "Premium Plan",
          monthlyPrice: 29,
          yearlyPrice: 289,
          qqm: "Unlimited",
          qpq: 100,
          cil: 50000,
          utq: true,
          ytq: true,
          ptq: true,
          apq: true,
          mls: true,
        },
      ],
    };
  },
};
</script>
