<template>
  <MetaHead title="Privacy Policy" description="This is privacy policy page" />
  <Home>
    <div class="max-w-2xl mx-auto py-12 px-2">
      <Button @click="$router.go(-1)"><Undo2Icon />Back</Button>
      <h1 class="md:text-4xl text-3xl font-bold mt-5">Privacy Policy</h1>
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
            "At Mr. Quizer, a service provided by the company Marnik, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.",
        },
        {
          title: "Information We Collect",
          content:
            "We collect the following types of information when you use our service:",
          ul: [
            "Personal identification information (such as your name, email address, and payment details).",
            "Usage data (such as pages visited, time spent on the platform, and other usage statistics).",
            "Technical information (such as IP address, browser type, and device information).",
          ],
        },
        {
          title: "How We Use Your Information",
          content:
            "We use the information we collect for the following purposes:",
          ul: [
            "To provide and maintain the services offered through Mr. Quizer.",
            "To process transactions and manage your subscription.",
            "To communicate with you regarding updates, changes, and promotions related to the service.",
            "To improve the functionality and performance of our website and services.",
            "To monitor and analyze usage patterns for better service delivery.",
          ],
        },
        {
          title: "Sharing of Information",
          content:
            "We may share your personal information in the following situations:",
          ul: [
            "With third-party service providers that assist us in operating our platform, processing payments, or providing customer support.",
            "To comply with legal obligations, such as responding to a subpoena or court order.",
            "If we are involved in a merger, acquisition, or asset sale, your information may be transferred to the new owner.",
          ],
        },
        {
          title: "Data Security",
          content:
            "We take reasonable steps to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
        },
        {
          title: "Your Rights",
          content:
            "You have the following rights regarding your personal information:",
          ul: [
            "The right to access and update your personal information.",
            "The right to request deletion of your personal data.",
            "The right to object to the processing of your data for certain purposes.",
            "The right to withdraw consent for any data processing that relies on your consent.",
          ],
        },
        {
          title: "Cookies",
          content:
            "Our website uses cookies to enhance your user experience. Cookies are small data files that are stored on your device to remember your preferences and activity. You can control or disable cookies through your browser settings.",
        },
        {
          title: "Third-Party Links",
          content:
            "Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party websites you visit.",
        },
        {
          title: "Children’s Privacy",
          content:
            "Our service is not intended for use by individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we learn that we have collected personal data from a child under 13, we will take steps to delete such information.",
        },
        {
          title: "Changes to Privacy Policy",
          content:
            "We reserve the right to modify or update this Privacy Policy at any time. Any changes will be communicated through our website. It is your responsibility to review this policy regularly.",
        },
        {
          title: "Contact Us",
          content:
            "If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at support@mrquizer.com.",
        },
      ],
    };
  },
};
</script>
