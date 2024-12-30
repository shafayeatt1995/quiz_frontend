<template>
  <MetaHead title="Quiz Dashboard" description="This is quiz page" />
  <Dashboard>
    <div class="bg-muted/40 rounded-xl md:p-2">
      <div class="grid auto-rows-max items-start gap-4 xl:col-span-2">
        <Card>
          <CardHeader class="px-3">
            <CardTitle class="flex items-center justify-between gap-2">
              <p>Quiz</p>
              <DashboardQuizForm @refetch="refetch" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              v-if="!loading && items.length === 0"
              class="p-4 flex flex-col justify-center items-center min-h-60"
            >
              <BookOpenIcon :size="100" class="text-gray-600" />
              <p>No quiz created</p>
            </div>
            <TableResponsive
              :fields="fields"
              :items="loading ? 10 : items"
              :skeleton="loading"
              body_clicked
              :active="activeQuiz"
              @bodyClicked="showQuiz"
            >
              <template #difficulty="{ item }">
                <p class="capitalize">{{ item.difficulty }}</p>
              </template>
              <template #type="{ item }">
                {{
                  item.type === "mcq" ? "Multiple choice quiz" : "True/False"
                }}
              </template>
            </TableResponsive>
            <div class="flex items-center justify-end space-x-2 py-4">
              <div class="flex-1 text-sm text-muted-foreground">
                {{ (page - 1) * perPage + 1 }} to
                {{ (page - 1) * perPage + items.length }} quiz showing
              </div>
              <div class="flex items-center gap-4">
                <Button
                  variant="outline"
                  :disabled="page === 1"
                  @click="loadMore(false)"
                >
                  <ChevronLeftIcon /> Previous
                </Button>
                <Button
                  variant="outline"
                  :disabled="items.length < perPage"
                  @click="loadMore(true)"
                >
                  Next <ChevronRightIcon
                /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <Sheet @update:open="closeModal" :open="modal">
      <SheetContent
        side="right"
        class="w-full md:max-w-[550px] overflow-y-auto p-0"
        hideClose
      >
        <!-- <DashboardQuizViewer
          :loading="quizLoading"
          :quiz="quiz"
          modal
          @close="closeModal"
        /> -->
      </SheetContent>
    </Sheet>
  </Dashboard>
</template>

<script>
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";

export default {
  name: "QuizPage",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    BookOpenIcon,
  },
  data() {
    return {
      perPage: 20,
      blocked: false,
      loading: false,
      quizLoading: false,
      modal: false,
      items: [],
      quiz: {},
      activeQuiz: null,
    };
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        {
          key: "difficulty",
          label: "Difficulty level",
          span: "minmax(100PX, 1fr)",
        },
        { key: "type", label: "Type", span: "minmax(220PX, 1fr)" },
        {
          key: "quizCount",
          label: "Quiz Count",
          span: "minmax(120PX, 1fr)",
        },
      ];
    },
  },
  watch: {
    "$route.query"() {
      this.fetchItems();
    },
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    refetch() {
      if (this.page === 1) {
        this.fetchItems();
      } else {
        this.$router.replace({
          path: this.$route.path,
          query: { ...this.$route.query, page: 1 },
        });
      }
    },
    loadMore(next) {
      const page = this.page + (next ? 1 : -1);
      this.$router.replace({
        path: this.$route.path,
        query: { ...this.$route.query, page },
      });
    },
    async fetchItems() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        const { items } = await api.get("/dashboard/quiz", {
          page: this.page,
          perPage: this.perPage,
        });
        this.items = items;
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    async showQuiz(i) {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.quizLoading = true;
        this.activeQuiz = i;
        this.modal = true;
        const { api } = useApi();
        const { item } = await api.get("/dashboard/quiz/" + this.items[i]._id);
        this.quiz = { ...this.items[i], ...item };
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.quizLoading = false;
      }
    },
    closeModal() {
      this.modal = false;
      this.activeQuiz = null;
      this.quiz = {};
    },
  },
};
</script>
