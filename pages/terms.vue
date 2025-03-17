<template>
  <MetaHead
    title="Terms and Conditions"
    description="This is terms and conditions page"
  />
  <Home>
    <div class="max-w-2xl mx-auto py-12 px-2">
      <Button @click="$router.go(-1)"><Undo2Icon />Back</Button>
      <h1 class="md:text-4xl text-3xl font-bold mt-5">Terms and Conditions</h1>
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
            "These Terms and Conditions govern the use of our service provided by Mr. Quizer under the company name Marnik. By accessing or using our website and services, you agree to comply with these terms and conditions. If you disagree with any part of these terms, you should not use our services.",
        },
        {
          title: "Definitions",
          ul: [
            "Service: Refers to the quiz generation tool provided by Mr. Quizer.",
            "User: Any individual or organization accessing or using our service.",
            "Account: The user’s account created on the Mr. Quizer platform to access the service.",
            "License: The right to use the service under the terms outlined herein.",
            "Subscription: A recurring payment that allows continued access to the service.",
          ],
        },
        {
          title: "Acceptance of Terms",
          content:
            "By using the service, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with the terms, you must discontinue use immediately.",
        },
        {
          title: "Changes to Terms",
          content:
            "We reserve the right to modify, update, or change these Terms and Conditions at any time. Any changes will be communicated through our website. It is your responsibility to review these terms regularly.",
        },
        {
          title: "User Obligations",
          ul: [
            "You must provide accurate and up-to-date information while creating your account.",
            "You must ensure your account details, including passwords, are kept secure.",
            "You agree not to misuse the service, including but not limited to: illegal activities, sending spam, or violating intellectual property rights.",
          ],
        },
        {
          title: "License and Access",
          content:
            "We grant you a limited, non-exclusive, non-transferable license to use the service for personal or professional purposes, subject to the restrictions in these terms.",
        },
        {
          title: "Payment Terms",
          ul: [
            "Our service is available on a subscription basis. Payment is due upon purchasing the plan.",
            "We use third-party payment processors to handle payment transactions.",
            "You are responsible for any taxes that may apply to your purchase or subscription.",
          ],
        },
        {
          title: "Subscription and Cancellations",
          ul: [
            "You may cancel your subscription at any time. The cancellation will take effect at the end of the current billing cycle.",
            "If you cancel, you will continue to have access to the service until the billing cycle ends.",
            "Subscription fees are non-refundable unless otherwise specified in the refund policy.",
          ],
        },
        {
          title: "Prohibited Uses",
          content:
            "You agree not to use the service for any illegal, harmful, or malicious activity, including:",
          ul: [
            "Infringing on intellectual property rights.",
            "Harassing or harming others.",
            "Attempting to hack or disrupt the platform.",
          ],
        },
        {
          title: "User Data and Privacy",
          content:
            "We take your privacy seriously. Please refer to our Privacy Policy for details on how we collect, use, and protect your data.",
        },
        {
          title: "Termination",
          content:
            "We reserve the right to suspend or terminate your access to the service if you violate these terms or engage in illegal activities. Upon termination, you will lose access to the service and any data tied to your account.",
        },
        {
          title: "Limitation of Liability",
          content:
            "Our liability is limited to the maximum extent permitted by law. We are not liable for any indirect, special, incidental, or consequential damages arising from your use of the service.",
        },
        {
          title: "Intellectual Property",
          ul: [
            "All content, designs, trademarks, and logos associated with the service are owned by Mr. Quizer or its licensors.",
            "You may not copy, modify, or distribute any content from the platform without our express permission.",
          ],
        },
        {
          title: "Support and Assistance",
          content:
            "Support is provided to users based on the terms of the service. For any issues related to installation, licensing, or usage, please contact support at support@mrquizer.com.",
        },
      ],
    };
  },
};
</script>
