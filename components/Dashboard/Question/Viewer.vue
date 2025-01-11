<template>
  <Card class="overflow-hidden h-full flex flex-col">
    <CardHeader class="flex flex-row bg-muted/50 px-4 py-6 items-center gap-2">
      <div class="flex-1">
        <CardTitle class="flex items-center gap-2 text-lg">
          <template v-if="question?.name">
            <EditMode v-model="question.name" />
            <span>({{ question.questions.length }})</span>
          </template>

          <span v-else> Questions </span>
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
            <DropdownMenuItem class="cursor-pointer" @click="shareUrl">
              <Share2Icon /> Share exam url
            </DropdownMenuItem>
            <DropdownMenuItem
              class="cursor-pointer"
              @click="exportQuestionDocs"
            >
              <DownloadIcon /> Export Question
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer" @click="exportAnswerDocs">
              <DownloadIcon /> Export Answer
            </DropdownMenuItem>
            <DropdownMenuItem
              class="cursor-pointer"
              @click="exportQuestionAnswerDocs"
            >
              <DownloadIcon /> Export Question & Answer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer" @click="deleteQuestion">
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
        <p>Fetching question</p>
      </div>
      <div v-else-if="question?._id" class="space-y-4">
        <div v-for="(val, i) in question.questions" :key="i">
          <div class="flex items-start gap-1 mb-0.5">
            <p>{{ i + 1 }}.</p>
            <EditMode v-model="question.questions[i].q" />
            <Button
              type="button"
              class="size-8"
              variant="rose"
              @click="question.questions.splice(i, 1)"
            >
              <XIcon :size="16" />
            </Button>
          </div>
          <div class="pl-5 space-y-0.5">
            <div
              v-for="(o, k) in val.o"
              :key="k"
              class="flex items-center gap-2"
              :class="k === val.a ? 'font-bold text-green-500' : ''"
            >
              {{ String.fromCharCode(97 + k) }})
              <EditMode v-model="question.questions[i].o[k]" />
            </div>
          </div>
        </div>
        <div class="border-t">
          <h2 class="text-center text-2xl font-bold mt-2">
            Custom question section
          </h2>
          <div>
            <Label for="question">Question</Label>
            <Input type="text" v-model="form.q" placeholder="Enter question" />
          </div>
          <div class="mt-2">
            <Label for="options">Options</Label>
            <div
              class="flex items-center gap-2 mb-2"
              v-for="(o, i) in form.o"
              :key="i"
            >
              <Input
                type="text"
                v-model="form.o[i]"
                placeholder="Enter option"
              />

              <Button
                type="button"
                class="size-8"
                :variant="i === form.a ? 'green' : 'outline'"
                @click="form.a = i"
              >
                <CheckIcon :size="16" />
              </Button>
              <Button
                type="button"
                class="size-8"
                variant="rose"
                @click="form.o.splice(i, 1)"
              >
                <XIcon :size="16" />
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Button
                type="button"
                @click="form.o.push('')"
                variant="outline"
                class="flex-1"
              >
                <PlusIcon /> Add options
              </Button>
              <Button type="button" @click="addQuestion" class="flex-1">
                <CheckIcon />
                Add question
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center h-full" v-else>
        <BookOpenIcon :size="100" class="text-gray-600" />
        <p>No question selected</p>
      </div>
    </CardContent>
    <CardFooter
      class="flex flex-row justify-between items-center border-t bg-muted/50 px-6 py-3"
    >
      <div class="text-xs text-muted-foreground">
        Created
        <time dateTime="2023-11-23">{{
          question?.created_at ? $filters.normalDate(question?.created_at) : ""
        }}</time>
      </div>
      <Button @click="updateQuestion" :disabled="!changed || updateLoading">
        <Loader2Icon class="animate-spin" v-if="updateLoading" /> Update
        Question</Button
      >
    </CardFooter>
  </Card>
  <DashboardQuestionShareModal v-model="shareModal" />
</template>

<script>
import {
  BookOpenIcon,
  CheckIcon,
  DownloadIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PlusIcon,
  Share2Icon,
  Trash2Icon,
  XIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "DashboardQuestionViewer",
  components: {
    MoreVerticalIcon,
    DownloadIcon,
    Trash2Icon,
    BookOpenIcon,
    Loader2Icon,
    XIcon,
    PlusIcon,
    CheckIcon,
    Share2Icon,
  },
  props: {
    modal: Boolean,
    item: Object,
  },
  data() {
    return {
      blocked: false,
      loading: true,
      trackQuestion: false,
      changed: false,
      updateLoading: false,
      shareModal: false,
      question: {},
      form: {
        q: "",
        o: [""],
        a: 0,
      },
    };
  },
  watch: {
    question: {
      handler() {
        if (!this.trackQuestion) {
          this.trackQuestion = true;
        } else {
          this.changed = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchQuestion();
  },
  methods: {
    async fetchQuestion() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        const { item } = await api.get("/dashboard/question/" + this.item._id);
        this.question = { ...this.item, ...item };
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
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
    async exportQuestionAnswerDocs() {
      try {
        const { Document, Packer, Paragraph, TextRun } = await import("docx");

        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${this.question.name} - Questions & Answers`,
                      bold: true,
                      size: 36,
                    }),
                  ],
                }),
                new Paragraph({ children: [] }),
                ...this.question.questions.flatMap(({ q, o, a }, index) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${index + 1}. ${q}`,
                        bold: true,
                      }),
                    ],
                  }),
                  ...o.map(
                    (option, i) =>
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `${String.fromCharCode(97 + i)}) ${option}`,
                          }),
                        ],
                      })
                  ),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Answer: ${String.fromCharCode(97 + a)}) ${o[a]}`,
                        italics: true,
                      }),
                    ],
                  }),
                  new Paragraph({ children: [] }),
                ]),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.question.name} - Questions Answers.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error generating document:", error);
      }
    },
    async exportQuestionDocs() {
      try {
        const { Document, Packer, Paragraph, TextRun } = await import("docx");

        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${this.question.name} - Questions`,
                      bold: true,
                      size: 36,
                    }),
                  ],
                }),
                ...this.question.questions.flatMap(({ q, o }, index) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${index + 1}. ${q}`,
                        bold: true,
                      }),
                    ],
                  }),
                  ...o.map(
                    (option, i) =>
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `${String.fromCharCode(97 + i)}) ${option}`,
                          }),
                        ],
                      })
                  ),
                  new Paragraph({ children: [] }),
                ]),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.question.name}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error generating document:", error);
      }
    },
    async exportAnswerDocs() {
      try {
        const { Document, Packer, Paragraph, TextRun } = await import("docx");

        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${this.question.name} - Answers`,
                      bold: true,
                      size: 36,
                    }),
                  ],
                }),
                ...this.question.questions.flatMap(({ q, o, a }, index) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${index + 1}. ${q}`,
                        bold: true,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Answer: ${String.fromCharCode(97 + a)}) ${o[a]}`,
                        italics: true,
                      }),
                    ],
                  }),
                  new Paragraph({ children: [] }),
                ]),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.question.name}-answer.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error generating document:", error);
      }
    },
    async updateQuestion() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.updateLoading = true;
        const { api } = useApi();
        await api.put("/dashboard/question", this.question);
        toast.success("Question updated successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.updateLoading = false;
      }
    },
    addQuestion() {
      console.log(this.form.o);
      if (this.form.q.length < 1) {
        toast.error("Question cannot be empty");
      } else if (this.form.o.length < 2) {
        toast.error("Options has at least 2");
      } else {
        this.question.questions.push(this.form);
      }
    },
    shareUrl() {
      this.shareModal = true;
    },
  },
};
</script>
