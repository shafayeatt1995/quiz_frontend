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
              >
                <template #additional="{ item }">
                  {{ item.additional.join(", ") }}
                </template>
                <template #status="{ item }">
                  <Badge :variant="item.active ? 'green' : 'rose'">
                    {{ item.active ? "Active" : "Inactive" }}
                  </Badge>
                </template>
                <template #question="{ item }">
                  <div class="space-y-1">
                    <p v-for="(val, i) in item.questions" :key="i">
                      {{ val.name }}
                    </p>
                  </div>
                </template>
                <template #actions="{ index }">
                  <DropdownMenu
                    :open="actions === index"
                    @update:open="actions = null"
                  >
                    <DropdownMenuTrigger as-child>
                      <Button
                        size="icon"
                        variant="outline"
                        class="h-8 w-8"
                        @click="actions = index"
                      >
                        <MoreVerticalIcon class="h-3.5 w-3.5" />
                        <span class="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-42">
                      <DropdownMenuItem
                        class="cursor-pointer"
                        @click="shareUrl(index)"
                      >
                        <CopyIcon /> Copy quiz URL
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="cursor-pointer"
                        @click="showQuiz(index)"
                      >
                        <PencilIcon /> Edit quiz
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="cursor-pointer"
                        @click="deleteQuiz(index)"
                      >
                        <Trash2Icon /> Delete quiz
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
  </Dashboard>
</template>

<script>
import { copyToClipboard } from "@/lib";
import eventBus from "@/lib/eventBus";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "DashboardQuiz",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    BookOpenIcon,
    MoreVerticalIcon,
    PencilIcon,
    Trash2Icon,
    CopyIcon,
  },
  data() {
    return {
      blocked: false,
      loading: true,
      actions: false,
      items: [],
      perPage: 20,
    };
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "status", label: "Status", span: "minmax(100PX, 1fr)" },
        {
          key: "additional",
          label: "Additional field",
          span: "minmax(100PX, 1fr)",
        },
        { key: "question", label: "Questions", span: "minmax(220PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(100PX, 1fr)" },
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
      eventBus.emit("showQuiz", this.items[i]);
    },
    async refetch() {
      this.loading = true;
      this.fetchItems();
    },
    async deleteQuiz(i) {
      try {
        if (confirm("Are you sure you want to delete this quiz?")) {
          const { api } = useApi();
          await api.delete("/dashboard/quiz/", {
            _id: this.items[i]._id,
          });
          toast.success("Quiz deleted successfully");
          this.refetch();
        }
      } catch (error) {
        console.error(error);
      }
    },
    loadMore(next, pageNumber = false) {
      const page = pageNumber || this.page + (next ? 1 : -1);
      this.$router.replace({
        path: this.$route.path,
        query: { ...this.$route.query, page },
      });
    },
    async shareUrl(i) {
      try {
        const origin = window.location.origin;
        const { id } = this.items[i];
        const url = `${origin}/quiz/${id}`;
        await copyToClipboard(url);
        toast.success("Quiz URL copied to clipboard");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
