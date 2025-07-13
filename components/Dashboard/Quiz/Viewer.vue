<template>
  <Card class="overflow-hidden h-full flex flex-col">
    <CardHeader class="flex flex-row bg-muted/50 px-4 py-6 items-center gap-2">
      <div class="flex-1">
        <CardTitle class="flex items-center gap-2 text-lg">
          <template v-if="quiz?.name">
            <EditMode v-model="quiz.name" />
          </template>

          <span v-else> Quiz </span>
        </CardTitle>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button size="icon" variant="outline" class="h-8 w-8">
              <MoreVerticalIcon class="h-3.5 w-3.5" />
              <span class="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuItem class="cursor-pointer" @click="exportQuizDocs">
              <DownloadIcon /> Export Quiz
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer" @click="exportAnswerDocs">
              <DownloadIcon /> Export Answer
            </DropdownMenuItem>
            <DropdownMenuItem
              class="cursor-pointer"
              @click="exportQuizAnswerDocs"
            >
              <DownloadIcon /> Export Quiz & Answer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer" @click="deleteQuiz">
              <Trash2Icon /> Trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="icon"
          variant="rose"
          class="h-8 w-8"
          v-if="modal"
          @click="$emit('close')"
        >
          <XIcon class="h-3.5 w-3.5" />
        </Button>
      </div>
    </CardHeader>
    <CardContent class="p-2 flex-1 overflow-y-auto">
      <div
        class="flex flex-col justify-center items-center h-full"
        v-if="loading"
      >
        <Loader2Icon class="animate-spin text-gray-600" :size="50" />
        <p>Fetching quiz</p>
      </div>
      <div v-else-if="quiz?._id" class="space-y-4"></div>
      <div class="flex flex-col justify-center items-center h-full" v-else>
        <BookOpenIcon :size="100" class="text-gray-600" />
        <p>No quiz selected</p>
      </div>
    </CardContent>
    <CardFooter
      class="flex flex-row justify-between items-center border-t bg-muted/50 px-6 py-3"
    >
      <div class="text-xs text-muted-foreground">
        Created
        <time dateTime="2023-11-23">{{
          quiz?.createdAt ? $filters.normalDate(quiz?.createdAt) : ""
        }}</time>
      </div>
      <Button @click="updateQuiz" :disabled="!changed || updateLoading">
        <Loader2Icon class="animate-spin" v-if="updateLoading" /> Update
        Quiz</Button
      >
    </CardFooter>
  </Card>
</template>

<script>
import {
  BookOpenIcon,
  CheckIcon,
  DownloadIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "DashboardQuizViewer",
  components: {
    MoreVerticalIcon,
    DownloadIcon,
    Trash2Icon,
    BookOpenIcon,
    Loader2Icon,
    XIcon,
    PlusIcon,
    CheckIcon,
  },
  props: {
    modal: Boolean,
    item: Object,
  },
  data() {
    return {
      blocked: false,
      loading: true,
      trackQuiz: false,
      changed: false,
      updateLoading: false,
      quiz: {},
      form: {
        q: "",
        o: [""],
        a: 0,
      },
    };
  },
  watch: {
    quiz: {
      handler() {
        if (!this.trackQuiz) {
          this.trackQuiz = true;
        } else {
          this.changed = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchQuiz();
  },
  methods: {
    async fetchQuiz() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        const { item } = await api.get("/dashboard/quiz/" + this.item._id);
        this.quiz = { ...this.item, ...item };
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    async deleteQuiz() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        if (confirm("Are you sure you want to delete this quiz?")) {
          const { api } = useApi();
          await api.delete("/dashboard/quiz/" + this.quiz._id);
          this.$emit("refetch");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
      }
    },
    async updateQuiz() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.updateLoading = true;
        const { api } = useApi();
        await api.put("/dashboard/quiz", this.quiz);
        toast.success("Quiz updated successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.updateLoading = false;
      }
    },
  },
};
</script>
