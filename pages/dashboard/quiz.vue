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
              <p>No quiz found</p>
            </div>
            <template v-else>
              <TableResponsive
                :fields="fields"
                :items="loading ? 10 : items"
                :skeleton="loading"
                body_clicked
                :active="activeQuiz"
                @bodyClicked="showQuiz"
              >
                <template #additional="{ item }">
                  {{ item.additional.join(", ") }}
                </template>
                <template #question="{ item }">
                  <div class="space-y-1">
                    <p v-for="(val, i) in item.questions" :key="i">
                      {{ val.name }}({{ val.questionCount }})
                    </p>
                  </div>
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
            </template>
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
        <DashboardQuizViewer
          :item="items[activeQuiz]"
          modal
          @close="closeModal"
          @refetch="refetch"
        />
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
  name: "DashboardQuiz",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    BookOpenIcon,
  },
  data() {
    return {
      modal: false,
      blocked: false,
      loading: true,
      items: [],
      perPage: 20,
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
          key: "additional",
          label: "Additional field",
          span: "minmax(100PX, 1fr)",
        },
        { key: "question", label: "Questions", span: "minmax(220PX, 1fr)" },
      ];
    },
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
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
    showQuiz(i) {
      this.activeQuiz = i;
      this.modal = true;
    },
    async refetch() {
      this.loading = true;
    },
    closeModal() {
      this.modal = false;
      this.activeQuiz = null;
    },
  },
};
</script>
