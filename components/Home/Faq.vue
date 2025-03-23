<template>
  <div class="container mx-auto py-12 px-2" id="faq">
    <div class="text-center mb-2">
      <h2 class="md:text-4xl text-3xl font-bold">Frequently asked questions</h2>
    </div>
    <Accordion
      type="single"
      class="w-full grid grid-cols-2 gap-x-10 gap-y-2"
      collapsible
    >
      <AccordionItem v-for="(qna, i) in qnas" :key="i" :value="qna.a">
        <AccordionTrigger class="text-left text-lg font-semibold">{{
          qna.q
        }}</AccordionTrigger>
        <AccordionContent class="text-base">
          <p v-html="qna.a"></p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script>
export default {
  name: "HomeFaq",
  data() {
    return {
      qnas: [
        {
          q: "What is this platform, and how does it work? 🤔",
          a: "Our platform uses AI to generate quiz questions from any text. You can create quizzes, conduct online exams, and manage assessments easily. 🚀",
        },
        {
          q: "Who is this platform for? 🎯",
          a: "It's perfect for educators, schools, tutors, HR professionals, marketers, trainers, and event organizers who need to generate quizzes, exams, and assessments efficiently. 🏫👩‍🏫👨‍💼",
        },
        {
          q: "What do you mean by Generate quiz questions? ❓",
          a: "Each time you enter info and click on the generate button, you will get a set of questions. With the Professional plan, you can generate a maximum of 25,000 questions. 💡",
        },
        {
          q: "What happens if I reach my plan's question or quiz limit? 🛑",
          a: "Once you reach your limit, you have to purchase a plan to continue generating new questions and quizzes. 💳",
        },
        {
          q: "What happens if I can't finish my questions or quizzes on time? ⏳",
          a: "There is no time limitation. You can generate new questions and quizzes until you run out of the plan's limit. 🕒",
        },
        {
          q: "Can I edit the generated questions? ✏️",
          a: "Yes! You can manually edit questions. However, once a quiz is published, it will be locked after 7 days, and you can't edit or take the quiz again. You'll need to reactivate it to edit or take the quiz again. 🔒",
        },
        {
          q: "What happens after 7 days of creating a quiz? 📅",
          a: "After 7 days, the edit option is locked to prevent unlimited modifications, and you can't take the quiz again. If you need to update it or take the quiz again, you'll need to reactivate the quiz. 🔄",
        },
        {
          q: "How do I access the plan after purchasing? 💻",
          a: "You must first create an account. Once you've created your account and made a one-time payment, we will upgrade your account to the plan. After payment, you can start using the plan immediately. 🎉",
        },
        {
          q: "How is support provided and what does it include? 🛠️",
          a: `You can send an email to support@mrquizer.com if you encounter any issues. Support includes installation, account issues, and usage. It does not cover any customization or new feature requests. For requesting a new feature, please <a href="https://feedpack.xyz/board/mrquizer" target="_blank" class="hover:underline text-blue-500">click this url.</a> 📧`,
        },
        {
          q: "What constitutes a user in terms of pricing? 👤",
          a: "A user is defined as one Google Account email address. Our pricing is per user (Google Account), and you can use the plan on any device as long as you're signed in with the same email address. 📧💻",
        },
        {
          q: "Does your company look at or share my data? 🔒",
          a: "We do not look at or share customer data. We only store essential information required to make the service work. To ensure OpenAI does not use your data, send an email to support@openai.com with your organization ID. 🛡️",
        },
        {
          q: "Can I share my quizzes and exams with others? 📤",
          a: "Yes! Once your quiz or exam is ready, you'll get a unique URL and can share it with students, employees, or participants. 🌐",
        },
        {
          q: "Are the amounts refundable? 💸",
          a: "No, the amount paid for the plan is non-refundable. ❌",
        },
        {
          q: "What payment methods do you accept? 💳",
          a: "We accept credit/debit cards, PayPal, and other secure online payment options. 🛒",
        },
        {
          q: "Can I cancel my subscription anytime? 🚫",
          a: "No, it is a one-time payment so no subscriptions, no stress 😃. Enjoy with one-time payments 😎.",
        },
        {
          q: "Can't find an answer to your question? 🤷‍♂️",
          a: "Send an email to support@mrquizer.com, and we'll be happy to help you 🙌",
        },
      ],
      collapsible: false,
    };
  },
};
</script>
