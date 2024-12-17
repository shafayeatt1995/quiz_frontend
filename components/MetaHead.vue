<template>
  <Head>
    <Title>{{ title }}</Title>
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
  name: "PageHeader",
  props: {
    title: {
      type: String,
      default() {
        const { appName } = useUtils();
        return `${appName || ""} - Create Quizzes using AI in Seconds`;
      },
    },
    description: {
      type: String,
      default: `Generate quizzes instantly from text, YouTube videos, PDFs, and more using AI. The process of creating quizzes has never been easier. Save time and effort with automated content generation for quick, accurate results.`,
    },
  },
};
</script>
