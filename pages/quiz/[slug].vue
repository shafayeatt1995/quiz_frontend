<template>
  <div>{{ $route.params.slug }}</div>
</template>

<script>
export default {
  name: "QuizSlug",
  data() {
    return {
      blocked: false,
      loading: false,
      item: null,
      questions: [],
    };
  },
  mounted() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        const { item } = await api.get(`/quiz/${this.$route.params.slug}`);
        console.log(item);
        if (item) {
          this.item = item;
          this.questions = item.questions.map(({ o, q }) => ({ o, q }));
          console.log(item.questions.map(({ o, q }) => ({ o, q })));
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
  },
};
</script>
