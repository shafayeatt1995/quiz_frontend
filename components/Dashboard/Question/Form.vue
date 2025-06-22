<template>
  <div v-if="modalMode">
    <div class="flex justify-end">
      <Button class="w-full md:w-auto" @click="modal = true">
        <PlusIcon /> Create new question
      </Button>
    </div>
    <Sheet @update:open="modal = false" :open="modal">
      <SheetContent
        side="right"
        class="w-full md:max-w-[550px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Create new question</SheetTitle>
        </SheetHeader>
        <div class="space-y-2">
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
              <Label for="language">question language</Label>
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="open"
                    class="w-full flex justify-between h-10"
                  >
                    {{ languages.find((lang) => lang === form.language) }}
                    <ChevronDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
            <Label
              for="characters"
              :class="form.prompt.length > countLimit ? 'text-red-500' : ''"
              >Topic details: {{ form.prompt.length }}/{{ countLimit }}</Label
            >
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
              :class="form.prompt.length > countLimit ? 'border-red-500' : ''"
              rows="10"
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
            <Button type="button" @click="submit()">
              <Loader2Icon class="animate-spin" v-if="loading" />
              {{
                inputType === "Text / Topic"
                  ? "Generate Prompt"
                  : "Generate text"
              }}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>

  <div class="space-y-2" v-else>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="!homeMode">
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
        <Label for="language">question language</Label>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-full flex justify-between h-10"
            >
              {{ languages.find((lang) => lang === form.language) }}
              <ChevronDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                  >
                    <CheckIcon
                      :class="
                        cn(
                          'mr-2 h-4 w-4',
                          lang === form.language ? 'opacity-100' : 'opacity-0'
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
      <Label
        for="characters"
        :class="form.prompt.length > countLimit ? 'text-red-500' : ''"
        >Topic details: {{ form.prompt.length }}/{{ countLimit }}</Label
      >
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
        :class="form.prompt.length > countLimit ? 'border-red-500' : ''"
        rows="8"
        :placeholder="
          homeMode
            ? 'Enter Topic, Youtube URL, PDF, or Text to get a Quiz Docx in seconds. use the bulb for suggestions.'
            : 'Enter Topic details to create questions'
        "
        v-model="form.prompt"
      ></textarea>
      <Input v-else v-model="form.prompt" placeholder="Enter the url" />
      <ErrorMessage :error="errors" name="prompt" />
      <p
        class="text-center text-red-500 mt-2 text-sm"
        v-if="form.prompt.length > countLimit"
      >
        Free account has 100 character limit. Please
        <NuxtLink to="/#pricing" class="underline font-semibold"
          >upgrade</NuxtLink
        >
        your account for full access.
      </p>

      <div v-if="pdfLoading">
        <p>Processing pdf page {{ pdfProcessing }}/{{ pdfPage }}</p>
        <div class="w-full h-2 bg-gray-200 rounded overflow-hidden">
          <div
            class="h-full bg-custom-gradient transition-all duration-1000 animate-pulse"
            :style="{ width: (pdfProcessing / pdfPage) * 100 + '%' }"
          ></div>
        </div>
      </div>
      <p class="text-center text-sm mt-2" v-if="loading">
        The process of generating questions can take approximately 30 to 60
        seconds.
      </p>
    </div>
    <div class="my-3 mt-2" v-if="showPrompt">
      <div class="relative mb-2">
        <Input
          class="pr-14"
          placeholder="Enter Topic details to create questions"
          v-model="prompt"
        />
        <div class="top-0 right-0 absolute">
          <TooltipProvider :open="true">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  @click.prevent="copyPrompt"
                  variant="outline"
                  type="button"
                  ><CopyIcon
                /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy & generate with AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Input
        class="pr-14"
        placeholder="Enter JSON output from AI"
        v-model="content"
      />
      <div class="flex justify-around mt-2 items-center">
        <a :href="chatgptUrl" target="_blank">
          <img src="/images/icon/chatgpt.svg" alt="chatgpt" class="size-20" />
        </a>
        <a href="https://gemini.google.com/app" target="_blank">
          <img src="/images/icon/gemini.svg" alt="gemini" class="size-20" />
        </a>
        <a href="https://chat.deepseek.com" target="_blank">
          <img src="/images/icon/deepseek.svg" alt="deepseek" class="size-20" />
        </a>
        <a href="https://copilot.microsoft.com" target="_blank">
          <img
            src="/images/icon/microsoft.svg"
            alt="microsoft"
            class="size-20"
          />
        </a>
      </div>
      <p class="text-sm text-gray-600 px-12 mt-2 text-center">
        Note: Copy the prompt, paste it into any AI platform, then copy the
        output and paste it here. Ensure the full JSON output is pasted.
        Finally, click the Generate button.
      </p>
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
        <button aria-label="Get Suggestions">
          <LightbulbIcon />
        </button>
      </div>
      <Button
        type="button"
        v-if="homeMode"
        @click="generate"
        :disabled="loading"
      >
        <Loader2Icon class="animate-spin" v-if="loading" />
        {{
          inputType === "Text / Topic"
            ? `Generate ${homeMode ? "quiz" : "question"}`
            : "Generate text"
        }}
      </Button>
      <Button v-else type="button" @click="submit">
        <Loader2Icon class="animate-spin" v-if="loading" />
        {{
          inputType === "Text / Topic"
            ? showingPrompt
              ? "Generate Question"
              : "Generate Prompt"
            : "Generate text"
        }}
      </Button>
    </div>
  </div>
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
            <Label for="negativeMarkingStatus" class="text-right">
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
</template>

<script>
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  FileUpIcon,
  LightbulbIcon,
  Loader2Icon,
  LockKeyholeIcon,
  PlusIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import { cn } from "@/lib/utils";
import { isValidJSON } from "@/lib";

export default {
  name: "DashboardQuestionForm",
  components: {
    FileUpIcon,
    Loader2Icon,
    LockKeyholeIcon,
    PlusIcon,
    ChevronDownIcon,
    CheckIcon,
    LightbulbIcon,
    CopyIcon,
    ArrowRightIcon,
  },
  props: { modalMode: Boolean, homeMode: Boolean },
  data() {
    return {
      form: {
        name: "",
        difficulty: "Medium",
        language: "English",
        prompt: "",
        questionType: "Multiple choice questions",
        questionCount: 50,
      },
      inputType: "Text / Topic",
      inputTypes: [
        "Text / Topic",
        "Blog URL / Content url",
        "PDF / Document / TXT / Image",
        "Youtube URL",
      ],
      difficultyLevels: ["Easy", "Medium", "Hard"],
      questionTypes: ["Multiple choice questions", "True or False", "Mixed"],
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
      click: false,
      loading: false,
      pdfPage: 0,
      pdfProcessing: 0,
      pdfLoading: false,
      modal: false,
      open: false,
      showingPrompt: false,
      errors: {},
      showPrompt: false,
      prompt: "",
      content: "",
      examModal: false,
      examForm: {
        time: 25,
        instantAnswer: false,
        negativeMarkingStatus: false,
        negativeMarking: 0,
      },
    };
  },
  computed: {
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
    isFreeUser() {
      return this.authUser.package === "free";
    },
    isValidURL() {
      try {
        new URL(this.form.prompt);
        return true;
      } catch (e) {
        return false;
      }
    },
    countLimit() {
      if (this.homeMode) return 20000;
      else if (this.authUser.isAdmin) return 20000;
      else if (this.authUser.package === "professional") return 20000;
      else if (this.authUser.package === "growth") return 10000;
      else if (this.authUser.package === "basic") return 5000;
      return 100;
    },
    chatgptUrl() {
      return `https://chat.openai.com/?prompt=${encodeURIComponent(
        this.prompt
      )}`;
    },
  },
  watch: {
    "form.prompt"() {
      this.setPrompt();
    },
    content(val) {
      try {
        if (JSON.parse(val))
          toast.success("You are ready to generate questions");
      } catch (e) {
        toast.error("Invalid JSON content");
      }
    },
  },
  mounted() {
    this.preset();
  },
  methods: {
    cn,
    async submit() {
      try {
        if (this.click) return;
        this.click = true;
        this.loading = true;
        this.errors = {};
        if (this.inputType === "Text / Topic") {
          if (!this.showingPrompt) {
            this.showingPrompt = true;
            return;
          }
          if (
            confirm(
              "Are you sure you want to generate a Question from this text?"
            )
          ) {
            const { api } = useApi();
            await api.post2("/dashboard/question/generate", this.form);
            this.modal = false;
            toast.success("Question generated successfully");
            this.$router.push("/dashboard/question");
            this.$emit("refetch");
            const { refreshToken } = useAuth();
            await refreshToken();
          }
        } else if (this.inputType === "Blog URL / Content url") {
          if (this.isValidURL) {
            const html = await $fetch(this.form.prompt);
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            if (doc) {
              this.inputType = "Text / Topic";
              this.form.prompt = doc.body?.innerText.trim();
            }
          } else {
            toast.error("Invalid URL");
          }
        } else if (this.inputType === "PDF / Document / TXT / Image") {
          toast.error("Please select a file");
        } else if (this.inputType === "Youtube URL") {
          await this.generateFromYoutube();
        }
      } catch (error) {
        const data = error.response._data;
        if (data.errors) {
          this.errors = data.errors;
        }
        toast.error(data?.msg || "Something went wrong");
      } finally {
        this.click = false;
        this.loading = false;
      }
    },
    async extractText(event) {
      try {
        if (!this.homeMode) {
          if (this.click || !event.target.files[0]) return;
        }
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
    async extractFromDOCX(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = async (e) => {
          try {
            const arrayBuffer = e.target.result;
            const { default: mammoth } = await import("mammoth");
            const { value } = await mammoth.extractRawText({ arrayBuffer });
            resolve(value.trim());
          } catch (error) {
            console.error("Error extracting text:", error);
            reject(error);
          }
        };

        fileReader.onerror = (error) => {
          reject(error);
        };

        fileReader.readAsArrayBuffer(file);
      });
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
    async extractFromText(file) {
      const text = await file.text();
      return text.trim();
    },
    async generateFromYoutube() {
      try {
        const videoId = this.form.prompt.match(
          /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=|\S*\/videoseries\?v=)([a-zA-Z0-9_-]{11}))|(?:https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11}))/
        );
        if (!videoId) {
          toast.error("Invalid YouTube URL");
          console.error("Invalid YouTube URL");
          return;
        }
        const id = videoId[1] || videoId[2];
        const { api } = useApi();
        const { data } = await api.post2("/dashboard/scrape/youtube", { id });
        this.form.prompt = data
          .join(" ")
          .replace(/\[[^\]]*\]/g, "")
          .replace(/\s+/g, " ")
          .trim();
        this.inputType = "Text / Topic";
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
    },
    generate() {
      if (this.showPrompt) {
        if (isValidJSON(this.content)) {
          this.examModal = true;
        } else {
          toast.error("Invalid AI JSON content");
        }
      } else {
        this.content = "";
        this.setPrompt();
        this.showPrompt = true;
      }
    },
    setPrompt() {
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
    },
    preset() {
      const { prompt, ...query } = this.$route.query;
      if (prompt) {
        this.form.prompt = prompt;
        this.inputType = "Text / Topic";
        this.$router.replace({ query });
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
    startExam() {
      this.$router.push({
        name: "test-exam",
        query: { ...this.examForm, question: this.content },
      });
    },
  },
};
</script>

393394
