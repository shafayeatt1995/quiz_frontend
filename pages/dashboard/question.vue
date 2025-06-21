<template>
  <MetaHead title="Quiz Dashboard" description="This is quiz page" />
  <Dashboard>
    <div class="bg-muted/40 rounded-xl md:p-2">
      <div class="grid auto-rows-max items-start gap-4 xl:col-span-2">
        <Card>
          <CardHeader class="px-3">
            <CardTitle class="flex items-center justify-between gap-2">
              <p>Questions</p>
              <Button @click="createModal = true">
                <PlusIcon />
                Create new question
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              v-if="!loading && items.length === 0"
              class="p-4 flex flex-col justify-center items-center min-h-60"
            >
              <BookOpenIcon :size="100" class="text-gray-600" />
              <p>No question found</p>
            </div>
            <template v-else>
              <div
                class="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4"
              >
                <div
                  v-for="(item, i) in items"
                  :key="i"
                  class="border rounded-xl bg-repeat overflow-hidden"
                  :style="`background-image: url(/images/pattern/${
                    (i % 12) + 1
                  }.svg)`"
                >
                  <div class="p-2 bg-white mt-20 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button
                          variant="ghost"
                          class="w-8 h-8 p-0 absolute top-0 right-0 hover:bg-transparent"
                        >
                          <span class="sr-only">Open menu</span>
                          <EllipsisIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem @click="showQuestion(i)">
                          <PencilIcon /> Edit Question
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          ><ListTodoIcon /> Create a new quiz</DropdownMenuItem
                        >
                        <DropdownMenuItem @click="showExamModal(item)">
                          <BookOpenCheckIcon /> Take a test exam
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="deleteQuestion(i)">
                          <Trash2Icon /> Delete Question
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <p class="font-bold text-2xl">{{ item.name }}</p>
                    <p>Difficulty: {{ item.difficulty }}</p>
                    <p>Type: {{ item.type }}</p>
                    <p>Questions: {{ item.questionCount }}</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-end space-x-2 py-4">
                <div class="flex-1 text-sm text-muted-foreground">
                  {{ (page - 1) * perPage + 1 }} to
                  {{ (page - 1) * perPage + items.length }} question showing
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
                    Next
                    <ChevronRightIcon />
                  </Button>
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
        <DashboardQuestionViewer
          :item="selectQuestion"
          modal
          @close="closeModal"
          @refetch="refetch"
        />
      </SheetContent>
    </Sheet>
    <Sheet @update:open="closeModal" :open="createModal">
      <SheetContent
        side="right"
        class="w-full md:max-w-[550px] overflow-y-auto overflow-x-hidden p-0"
        hideClose
      >
        <Card class="overflow-hidden h-full flex flex-col">
          <CardHeader
            class="flex flex-row bg-muted/50 px-4 py-6 items-center gap-2"
          >
            <div class="flex-1">
              <CardTitle class="flex items-center gap-2 text-lg">
                <p>Questions</p>
              </CardTitle>
            </div>
            <div class="ml-auto flex items-center gap-2">
              <Button
                size="icon"
                variant="rose"
                class="h-8 w-8"
                @click="createModal = false"
              >
                <XIcon class="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent class="p-2 flex-1 overflow-y-auto">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <Label for="difficulty">Question Name</Label>
                <Input
                  type="text"
                  v-model="form.name"
                  placeholder="Enter question Name"
                />
                <ErrorMessage :error="errors" name="name" />
              </div>
              <div>
                <Label for="questionCount">Question count </Label>
                <NumberField
                  id="questionCount"
                  :max="100"
                  :min="10"
                  :modelValue="form.questionCount"
                  @update:modelValue="form.questionCount = $event"
                >
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
                <ErrorMessage :error="errors" name="questionCount" />
              </div>
              <div>
                <Label for="language">Question language</Label>
                <Popover v-model:open="open">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :aria-expanded="open"
                      class="w-full flex justify-between h-10"
                    >
                      {{ languages.find((lang) => lang === form.language) }}
                      <ChevronDownIcon
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-full p-0">
                    <Command v-model="form.language">
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="lang in languages"
                            :key="lang"
                            :value="lang"
                            @select="open = false"
                            class="cursor-pointer"
                          >
                            <CheckIcon
                              :class="
                                cn(
                                  'mr-2 h-4 w-4',
                                  lang === form.language
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )
                              "
                            />
                            {{ lang }}
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <ErrorMessage :error="errors" name="language" />
              </div>
              <div>
                <Label for="difficulty">Difficulty level</Label>
                <Select
                  id="difficulty"
                  :modelValue="form.difficulty"
                  @update:modelValue="form.difficulty = $event"
                >
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        :value="type"
                        v-for="(type, i) in difficultyLevels"
                        :key="i"
                      >
                        {{ type }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label for="questionType">Question type</Label>
                <Select
                  id="questionType"
                  :modelValue="form.questionType"
                  @update:modelValue="form.questionType = $event"
                >
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        :value="type"
                        v-for="(type, i) in questionTypes"
                        :key="i"
                      >
                        {{ type }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label for="inputType">Select input type</Label>
                <Select
                  id="inputType"
                  :modelValue="inputType"
                  @update:modelValue="inputType = $event"
                >
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select input type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        :value="type"
                        v-for="(type, i) in inputTypes"
                        :key="i"
                      >
                        {{ type }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label for="characters">Topic details</Label>
              <label
                class="border-2 border-dashed rounded-md px-2 py-1 flex flex-col justify-center items-center gap-2 text-gray-600 bg-white cursor-pointer h-80 font-semibold"
                for="file-upload"
                v-if="inputType === 'PDF / Document / TXT / Image'"
              >
                <FileUpIcon :size="100" />
                Upload file
              </label>
              <textarea
                v-else-if="inputType === 'Text / Topic'"
                id="characters"
                class="block w-full rounded-lg border-2 border-dashed p-4 focus:outline-none"
                rows="3"
                placeholder="Enter Topic details to create questions"
                v-model="form.prompt"
              ></textarea>
              <Input v-else v-model="form.prompt" placeholder="Enter the url" />
              <ErrorMessage :error="errors" name="prompt" />

              <div v-if="pdfLoading">
                <p>Processing pdf page {{ pdfProcessing }}/{{ pdfPage }}</p>
                <div class="w-full h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    class="h-full bg-custom-gradient transition-all duration-1000 animate-pulse"
                    :style="{ width: (pdfProcessing / pdfPage) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="my-3 relative" v-if="showPrompt">
              <Input
                class="pr-14"
                placeholder="Enter Topic details to create questions"
                v-model="prompt"
              />
              <Button
                @click="copyPrompt"
                variant="outline"
                class="top-0 right-0 absolute"
                ><CopyIcon
              /></Button>
              <div class="flex justify-around mt-2 items-center">
                <a :href="chatgptUrl" target="_blank">
                  <img
                    src="/images/icon/chatgpt.svg"
                    alt="chatgpt"
                    class="size-20"
                  />
                </a>
                <a href="https://gemini.google.com/app" target="_blank">
                  <img
                    src="/images/icon/gemini.svg"
                    alt="gemini"
                    class="size-20"
                  />
                </a>
                <a href="https://chat.deepseek.com" target="_blank">
                  <img
                    src="/images/icon/deepseek.svg"
                    alt="deepseek"
                    class="size-20"
                  />
                </a>
                <a href="https://copilot.microsoft.com" target="_blank">
                  <img
                    src="/images/icon/microsoft.svg"
                    alt="microsoft"
                    class="size-20"
                  />
                </a>
              </div>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center gap-2">
                <label
                  class="border-2 border-dashed rounded-md px-2 py-1 flex gap-2 text-gray-600 bg-white cursor-pointer"
                  for="file-upload"
                >
                  <FileUpIcon />
                  Upload file
                </label>
                <input
                  type="file"
                  id="file-upload"
                  class="hidden"
                  accept=".pdf&.doc&.docx&.txt&.jpg&.png&.jpeg&.svg&.webp"
                  @change="extractText"
                />
              </div>
              <Button type="button" @click="submit" :disabled="loading">
                <Loader2Icon class="animate-spin" v-if="loading" />
                {{
                  inputType === "Text / Topic"
                    ? showPrompt
                      ? "Generate Question"
                      : "Generate Prompt"
                    : "Generate text"
                }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
    <Dialog v-model:open="examModal">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test exam</DialogTitle>
        </DialogHeader>
        <div class="space-y-3">
          <div>
            <Label for="time" class="text-right"> Exam time (Minute) </Label>
            <Input id="time" v-model="examForm.time" class="col-span-3" />
          </div>
          <div class="flex justify-between items-center">
            <Label for="instantAnswer"
              >Instant show answer [{{
                examForm.instantAnswer ? "Active" : "Inactive"
              }}]</Label
            >
            <Switch id="instantAnswer" v-model="examForm.instantAnswer" />
          </div>
          <div>
            <div class="flex justify-between items-center mb-1">
              <Label for="negativeMarking" class="text-right">
                Negative marking [{{
                  examForm.negativeMarkingStatus ? "Active" : "Inactive"
                }}]
              </Label>
              <Checkbox
                id="negativeMarkingStatus"
                v-model="examForm.negativeMarkingStatus"
              />
            </div>
            <Input
              id="negativeMarking"
              v-model="examForm.negativeMarking"
              class="col-span-3"
              :disabled="!examForm.negativeMarkingStatus"
            />
          </div>
        </div>
        <DialogFooter>
          <Button @click="startExam(item)">
            <ArrowRightIcon /> Start Exam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Dashboard>
</template>

<script>
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  EllipsisIcon,
  FileUpIcon,
  ListTodoIcon,
  Loader2Icon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "QuestionPage",
  components: {
    ChevronLeftIcon,
    BookOpenIcon,
    PlusIcon,
    XIcon,
    CheckIcon,
    ChevronDownIcon,
    FileUpIcon,
    Loader2Icon,
    CopyIcon,
    EllipsisIcon,
    PencilIcon,
    Trash2Icon,
    ListTodoIcon,
    BookOpenCheckIcon,
    ArrowRightIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      perPage: 24,
      blocked: false,
      loading: false,
      questionLoading: false,
      modal: false,
      items: [],
      activeQuestion: null,
      selectQuestion: null,
      createModal: false,
      form: {
        name: "",
        difficulty: "Medium",
        language: "English",
        prompt: "",
        questionType: "Multiple choice questions",
        questionCount: 50,
      },
      errors: {},
      languages: [
        "English",
        "Arabic",
        "Assamese",
        "Azerbaijani",
        "Bashkir",
        "Bangla",
        "Bosnian",
        "Bulgarian",
        "Burmese",
        "Catalan",
        "Cebuano",
        "Chhattisgarhi",
        "Chinese (Hakka)",
        "Chinese (Mandarin)",
        "Chinese (Wu)",
        "Czech",
        "Danish",
        "Dutch",
        "Egyptian Arabic",
        "Fijian",
        "Finnish",
        "Fula",
        "Georgian",
        "Greek",
        "Gujarati",
        "Haitian Creole",
        "Hebrew",
        "Hindi",
        "Hiligaynon",
        "Hmong",
        "Hausa",
        "Hungarian",
        "Ibanag",
        "Indonesian",
        "Iraqi Arabic",
        "Italian",
        "Japanese",
        "Javanese",
        "Kannada",
        "Kazakh",
        "Khmer",
        "Kinyarwanda",
        "Klingon",
        "Korean",
        "Kurdish",
        "Lahnda (Western Punjabi)",
        "Lithuanian",
        "Macedonian",
        "Malayalam",
        "Malaysian",
        "Maltese",
        "Mandarin Chinese",
        "Marathi",
        "Marwari",
        "Mayan languages",
        "Mongolian",
        "Nepali",
        "Norwegian",
        "Odia",
        "Pashto",
        "Persian",
        "Polish",
        "Portuguese",
        "Punjabi",
        "Quechua",
        "Romanian",
        "Russian",
        "Sanskrit",
        "Serbian",
        "Sinhalese",
        "Somali",
        "Swahili",
        "Swedish",
        "Tagalog",
        "Tajik",
        "Tamil",
        "Telugu",
        "Tigrinya",
        "Turkish",
        "Turkmen",
        "Ukrainian",
        "Urdu",
        "Uyghur",
        "Uzbek",
        "Vietnamese",
        "Wu Chinese",
        "Xhosa",
        "Yoruba",
        "Yue Chinese",
        "Zulu",
      ],
      inputTypes: [
        "Text / Topic",
        "Blog URL / Content url",
        "PDF / Document / TXT / Image",
        "Youtube URL",
      ],
      difficultyLevels: ["Easy", "Medium", "Hard"],
      questionTypes: ["Multiple choice questions", "True or False", "Mixed"],
      open: false,
      showingPrompt: false,
      inputType: "Text / Topic",
      pdfLoading: false,
      pdfPage: 0,
      pdfProcessing: 0,
      pdfLoading: false,
      showPrompt: false,
      prompt: "",
      examModal: false,
      examQuestion: {},
      examForm: {
        time: 25,
        negativeMarkingStatus: false,
        negativeMarking: 0.25,
        instantAnswer: false,
      },
      totalImage: 20,
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
          key: "questionCount",
          label: "Questions Count",
          span: "minmax(120PX, 1fr)",
        },
      ];
    },
    chatgptUrl() {
      return `https://chat.openai.com/?prompt=${encodeURIComponent(
        this.prompt
      )}`;
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
    cn,
    refetch() {
      this.modal = false;
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
        const { items } = await api.get("/dashboard/question", {
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
    async showQuestion(i) {
      try {
        this.activeQuestion = i;
        this.selectQuestion = this.items[i];
        this.modal = true;
      } catch (error) {
        console.error(error);
      }
    },
    closeModal() {
      this.modal = false;
      this.activeQuestion = null;
      this.question = {};
    },
    async extractText(event) {
      try {
        if (this.click || !event.target.files[0]) return;
        this.click = true;
        this.loading = true;

        const file = event.target.files[0];
        const type = file.type;
        event.target.value = "";

        if (type.startsWith("application/pdf")) {
          await this.extractTextFromPDF(file);
        } else if (
          type.startsWith(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          )
        ) {
          this.form.prompt = await this.extractFromDOCX(file);
        } else if (type.startsWith("image/")) {
          this.form.prompt = await this.extractFromImage(file);
        } else if (type.startsWith("text/plain")) {
          this.form.prompt = await this.extractFromText(file);
        } else {
          toast.error("Invalid file type");
        }
        this.inputType = "Text / Topic";
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        this.click = false;
        this.loading = false;
      }
    },
    async extractTextFromPDF(file) {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        this.form.prompt = "";
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";
        this.inputType = "Text / Topic";
        const pdfData = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        this.pdfPage = pdf.numPages;
        this.pdfLoading = true;

        for (let i = 1; i <= pdf.numPages; i++) {
          this.pdfProcessing++;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          const imageDataUrl = canvas.toDataURL("image/png");

          const pageText = await this.extractFromImage(imageDataUrl);
          this.form.prompt = `${this.form.prompt} ${pageText.trim()}`;
        }
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw error;
      } finally {
        this.pdfLoading = false;
        this.pdfPage = 0;
        this.pdfProcessing = 0;
      }
    },
    async extractFromImage(file) {
      const { recognize } = await import("tesseract.js");
      const { data } = await recognize(file, "eng", {
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 @#$%&'()*+,./:;<>?[]^_`{|}~",
        preserve_interword_spaces: "1",
        oem: 1,
        psm: 6,
      });
      return data.text.trim();
    },
    submit() {
      if (this.showPrompt) {
        this.createModal = false;
        this.modal = true;
        this.selectQuestion = {
          name: this.form.name,
          difficulty: this.form.difficulty,
          type: this.form.questionType,
        };
      } else {
        if (!this.form.name.trim())
          this.errors.name = { msg: "Please enter question name" };
        if (!this.form.prompt.trim())
          this.errors.prompt = { msg: "Please enter question topic" };
        if (!this.form.prompt.trim() || !this.form.name.trim()) return;
        this.prompt = `Create ${
          this.form.questionCount
        } unique questions with the following specifications:
          - Difficulty level: ${this.form.difficulty}
          - Question type: ${
            this.form.questionType === "True or False"
              ? "True/False"
              : this.form.questionType === "Multiple choice questions"
              ? "Multiple Choice"
              : "True/False and Multiple Choice both"
          }
          - Question language: ${this.form.language}
          - Topic: ${this.form.prompt}
          - Provide only relevant, meaningful, and factually correct questions.
          - Output format: strictly as an array of JSON objects with this structure:
            [
              {
                "q": "Your question text here",
                "o": [${
                  this.form.questionType === "True or False"
                    ? '"True", "False"'
                    : '"Option1", "Option2", "Option3", "Option4"'
                }],
                "a": correctOptionIndex
              }
            ]
          - Ensure the questions are well-structured, unambiguous, and aligned with the provided topic.
          - Return only the JSON array, with no extra text, explanations, or formatting.`;
        this.showPrompt = true;
      }
    },
    copyPrompt() {
      try {
        navigator.clipboard.writeText(this.prompt);
        toast.success("Prompt copied to clipboard");
      } catch (error) {
        console.error("Failed to copy prompt:", error);
      }
    },
    showExamModal(item) {
      this.examQuestion = item;
      this.examModal = true;
    },
    startExam() {
      this.$router.push({
        name: "dashboard-exam-id",
        params: { id: this.examQuestion._id },
        query: this.examForm,
      });
    },
    async deleteQuestion(index) {
      try {
        const { api } = useApi();
        await api.delete(`/dashboard/question/${this.items[index]._id}`);
        this.items.splice(index, 1);
        toast.success("Question deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete question");
      }
    },
  },
};
</script>
