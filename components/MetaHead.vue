<template>
  <Head>
    <Title>{{ title }} - {{ appName }}</Title>
    <Meta name="description" :content="description" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />
    <slot />
  </Head>
</template>

<script>
export default {
  name: "MetaHead",
  props: {
    title: {
      type: String,
      default: "Mr. Quizer: AI Quiz Generator",
    },
    description: {
      type: String,
      default: `Mr. Quizer is an AI-powered platform designed to generate quizzes dynamically based on user preferences and input. User can generate quizzes instantly from text, YouTube videos, PDFs, and more using AI. This platform aims to make learning and assessment engaging, interactive, and adaptive by leveraging state-of-theart AI technologies.`,
    },
  },
  computed: {
    appName() {
      return useUtils().appName;
    },
  },
};
</script>
