<template>
  <div class="container mx-auto py-12 px-2">
    <div class="text-center mb-2">
      <h2 class="text-gray-800 md:text-4xl text-3xl font-bold">
        Frequently asked questions
      </h2>
    </div>
    <div class="max-w-2xl mx-auto">
      <Accordion type="single" class="w-full" collapsible>
        <AccordionItem v-for="(qna, i) in qnas" :key="i" :value="qna.a">
          <AccordionTrigger class="text-left">{{ qna.q }}</AccordionTrigger>
          <AccordionContent>
            {{ qna.a }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFaq",
  data() {
    return {
      qnas: [
        {
          q: "What do you mean by question sets",
          a: "Each time you enter info and click on generate button, you will get a set of questions. Each run is called a question set. With Pro plan you can run it 200 times a month.",
        },
        {
          q: "How to Cancel my subscription?",
          a: "You can cancel your subscription anytime just click Manage Subscription link in footer. You will be able to use the subscription till the end of the billing cycle.",
        },
        {
          q: "What do I actually receive after I purchase a license?",
          a: "We will find account with the gmail/gsuide id specified in purchase and upgrade it. No license key required! then just follow https://mrquizer.com/get-started",
        },
        {
          q: "Can someone else order the license on my behalf?",
          a: "Absolutely. When you make a purchase, the gmail address specified in the order will be automatically upgraded and the payer email is not tied to the account",
        },
        {
          q: "How is support provided and what does it include?",
          a: "You can send a mail to support@mrquizer.com while your support period is still valid. Support is provided for issues with installation, licensing and usage. It does not include any customization or custom new features.",
        },
        {
          q: "What constitutes a user in terms of pricing?",
          a: "A user is defined as one Google Account email address (yourname@domain). Our add-ons are licensed per user (Google Account) and you can use the license on any computer as long as you are signed in with the same email address.",
        },
        {
          q: "Does your company look at or share my data",
          a: "We do not look or share our customers data, and we only save essential info required to make extension work. To make sure OpenAI does not use your data just send email to support@openai.com with your organisation id",
        },
        {
          q: "Can't find an answer to your question?",
          a: "Send a mail at support@mrquizer.com and we'll be happy to help you 🙌",
        },
      ],
    };
  },
};
</script>
