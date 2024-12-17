<template>
  <div class="container mx-auto py-12 px-2">
    <div class="text-center mb-2">
      <h2 class="md:text-4xl text-3xl font-bold">Frequently asked questions</h2>
    </div>
    <div class="max-w-4xl mx-auto">
      <Accordion type="single" class="w-full" collapsible>
        <AccordionItem v-for="(qna, i) in qnas" :key="i" :value="qna.a">
          <AccordionTrigger class="text-left">{{ qna.q }}</AccordionTrigger>
          <AccordionContent>
            <p v-html="qna.a"></p>
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
          q: "What do you mean by question sets?",
          a: "Each time you enter info and click on the generate button, you will get a set of questions. Each run is called a question set. With the Professional plan, you can run it 500 times a month and 5,000 times a year.",
        },
        {
          q: "What happens if I can't finish my quizes on time?",
          a: "If you can't finish your quizes on time, you can buy the same plan again and your existing quizes will be added to the new plan. If you buy a different plan, your existing quizes will be removed.",
        },
        {
          q: "How do I access the plan after purchasing?",
          a: "You must first create an account. Once you've created your account and made a one-time payment, we will upgrade your account to the plan. After payment, you can start using the plan immediately.",
        },
        {
          q: "Can someone else order the plan on my behalf?",
          a: "Absolutely. When you make a payment, the Gmail address specified in the order will be automatically upgraded, and the payer email is not tied to the account.",
        },
        {
          q: "How is support provided and what does it include?",
          a: `You can send an email to support@mrquizer.com if you encounter any issues. Support includes installation, account issues, and usage. It does not cover any customization or new feature requests. For requesting a new feature, please <a href="https://feedpack.xyz/board/mrquizer" target="_blank" class="hover:underline text-indigo-500">click this url.</a>`,
        },
        {
          q: "What constitutes a user in terms of pricing?",
          a: "A user is defined as one Google Account email address. Our pricing is per user (Google Account), and you can use the plan on any device as long as you're signed in with the same email address.",
        },
        {
          q: "Does your company look at or share my data?",
          a: "We do not look at or share customer data. We only store essential information required to make the service work. To ensure OpenAI does not use your data, send an email to support@openai.com with your organization ID.",
        },
        {
          q: "Can't find an answer to your question?",
          a: "Send an email to support@mrquizer.com, and we'll be happy to help you 🙌",
        },
        {
          q: "Are the amounts refundable?",
          a: "No, the amount paid for the plan is non-refundable.",
        },
      ],
    };
  },
};
</script>
