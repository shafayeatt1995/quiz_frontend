<template>
  <Card class="overflow-hidden h-full flex flex-col">
    <CardHeader class="flex flex-row bg-muted/50 px-4 py-6">
      <div class="flex-1">
        <CardTitle class="flex items-center gap-2 text-lg">
          {{ question?.name || "Questions" }}
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
          <DropdownMenuContent align="end" class="w-52">
            <DropdownMenuItem class="cursor-pointer">
              <DownloadIcon /> Export Question Docs
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer">
              <DownloadIcon /> Export Answer Docs
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer">
              <DownloadIcon /> Export Question Pdf
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer">
              <DownloadIcon /> Export Answer Pdf
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer" @click="deleteQuestion">
              <Trash2Icon /> Trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="icon"
          variant="outline"
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
        <p>Fetching question</p>
      </div>
      <div v-else-if="question?._id" class="space-y-4">
        <div v-for="(val, i) in question.questions" :key="i">
          <div class="flex">
            <p>{{ ++i }}.</p>

            <p>{{ val.q }}</p>
          </div>
          <div class="pl-5">
            <p
              v-for="(o, k) in val.o"
              :key="k"
              :class="k === val.a ? 'font-bold text-green-500' : ''"
            >
              {{ String.fromCharCode(97 + k) }}. {{ o }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center h-full" v-else>
        <BookOpenIcon :size="100" class="text-gray-600" />
        <p>No question selected</p>
      </div>
    </CardContent>
    <CardFooter
      class="flex flex-row items-center border-t bg-muted/50 px-6 py-3"
    >
      <div class="text-xs text-muted-foreground">
        Created
        <time dateTime="2023-11-23">{{
          question?.created_at ? $filters.normalDate(question?.created_at) : ""
        }}</time>
      </div>
    </CardFooter>
  </Card>
</template>

<script>
import {
  BookOpenIcon,
  DownloadIcon,
  Loader2Icon,
  MoreVerticalIcon,
  Trash2Icon,
  XIcon,
} from "lucide-vue-next";

export default {
  name: "DashboardQuestionViewer",
  components: {
    MoreVerticalIcon,
    DownloadIcon,
    Trash2Icon,
    BookOpenIcon,
    Loader2Icon,
    XIcon,
  },
  props: {
    loading: Boolean,
    question: Object,
    modal: Boolean,
  },
  data() {
    return {
      blocked: false,
    };
  },
  methods: {
    async deleteQuestion() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        if (confirm("Are you sure you want to delete this question?")) {
          const { api } = useApi();
          await api.delete("/dashboard/question/" + this.question._id);
          this.$emit("refetch");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
      }
    },
  },
};
</script>
