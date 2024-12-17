<template>
  <MetaHead title="Refund Policy" description="This is refund policy page" />
  <Home>
    <div class="max-w-2xl mx-auto py-12 px-2">
      <Button @click="$router.go(-1)"><Undo2Icon />Back</Button>
      <h1 class="md:text-4xl text-3xl font-bold mt-5">Refund Policy</h1>
      <div v-for="(content, i) in contents" :key="i">
        <h2 class="text-2xl font-bold mt-5">{{ ++i }}. {{ content.title }}</h2>
        <div class="pl-2">
          <p class="mt-2">{{ content.content }}</p>
          <ul v-if="content.ul" class="list-disc pl-4">
            <li v-for="(item, key) in content.ul" :key="key">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Home>
</template>

<script>
import { Undo2Icon } from "lucide-vue-next";

export default {
  name: "terms",
  components: { Undo2Icon },
  data() {
    return {
      contents: [
        {
          title: "Introduction",
          content:
            "This Refund Policy outlines the circumstances under which you may request a refund for the services provided by Mr. Quizer under the company name Marnik.",
        },
        {
          title: "Eligibility for Refund",
          content:
            "You are eligible for a refund if you meet the following conditions:",
          ul: [
            "You request a refund within 14 days of the initial subscription or payment.",
            "You have not used the service in a way that violates the Terms and Conditions or the acceptable use policy.",
          ],
        },
        {
          title: "Refund Process",
          content:
            "To request a refund, please contact our support team at support@mrquizer.com with the following information:",
          ul: [
            "Your account details (email address associated with the account).",
            "A brief explanation of why you are requesting the refund.",
            "Any relevant transaction details or receipts.",
          ],
        },
        {
          title: "Non-Refundable Situations",
          content:
            "Refunds are not available under the following circumstances:",
          ul: [
            "After the 14-day refund request period has passed.",
            "If the service has been used in violation of our Terms and Conditions or acceptable use policy.",
            "If you have received a refund previously and are requesting another one for the same subscription.",
          ],
        },
        {
          title: "Refund Approval",
          content:
            "Refund requests will be reviewed on a case-by-case basis. If your request meets the eligibility criteria, we will process your refund within 7-10 business days. Refunds will be issued to the original payment method.",
        },
        {
          title: "Changes to Refund Policy",
          content:
            "We reserve the right to modify or update this Refund Policy at any time. Any changes will be communicated through our website. It is your responsibility to review this policy regularly.",
        },
      ],
    };
  },
};
</script>
