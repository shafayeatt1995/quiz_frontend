<template>
  <div>
    <div class="flex justify-end">
      <Button class="w-full md:w-auto" @click="modal = true"
        ><PlusIcon /> Create new question</Button
      >
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
          <div class="flex-1">
            <Label for="difficulty">Question Name</Label>
            <Input
              type="text"
              v-model="form.name"
              placeholder="Enter question Name"
            />
            <ErrorMesage :error="errors" name="name" />
          </div>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
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
            <div class="flex-1">
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
          </div>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <!-- 
              <Label for="language">question language</Label>
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="open"
                    class="w-full flex justify-between h-10"
                  >
                    {{ languages.find((lang) => lang === language) }}
                    <ChevronDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-full p-0">
                  <Command v-model="language">
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
                                lang === language ? 'opacity-100' : 'opacity-0'
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
              -->
              <Label for="questionCount"
                >Question count
                <span class="text-xs">
                  ({{ authUser.questionCount.toLocaleString() }} left)
                </span>
              </Label>
              <NumberField
                id="questionCount"
                :max="maxQuestionCount > 100 ? 100 : maxQuestionCount"
                :min="25"
                :modelValue="form.questionCount"
                @update:modelValue="form.questionCount = $event"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <ErrorMesage :error="errors" name="questionCount" />
            </div>
            <div class="flex-1">
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
              >Topic or Prompt: {{ form.prompt.length }}/{{ countLimit }}</Label
            >
            <label
              class="border-2 border-dashed rounded-md px-2 py-1 flex flex-col justify-center items-center gap-2 text-gray-600 bg-white cursor-pointer h-80 font-semibold"
              for="file-upload"
              v-if="inputType === 'PDF / Document / TXT / Image'"
            >
              <FileUpIcon v-if="countExpire > 0" :size="100" />
              <LockKeyholeIcon v-else :size="100" />
              Upload file
            </label>
            <textarea
              v-else-if="inputType === 'Text / Topic'"
              id="characters"
              class="block w-full rounded-lg border-2 border-dashed p-4 focus:outline-none"
              :class="form.prompt.length > countLimit ? 'border-red-500' : ''"
              rows="12"
              placeholder="Enter Topic, Youtube URL, PDF, or Text to get a question Docx in seconds. use the bulb for suggestions."
              v-model="form.prompt"
            ></textarea>
            <Input v-else v-model="form.prompt" placeholder="Enter the url" />
            <ErrorMesage :error="errors" name="prompt" />

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
                <FileUpIcon v-if="countExpire > 0" />
                <LockKeyholeIcon v-else />
                Upload file
              </label>
              <input
                type="file"
                id="file-upload"
                class="hidden"
                accept=".pdf&.doc&.docx&.txt&.jpg&.png&.jpeg&.svg&.webp"
                @change="extractText"
                :disabled="countExpire <= 0"
              />
            </div>
            <Button
              type="button"
              @click="countExpire > 0 ? submit() : null"
              :disabled="loading || countExpire <= 0"
            >
              <LockKeyholeIcon v-if="countExpire <= 0" />
              <Loader2Icon class="animate-spin" v-if="loading" />
              {{
                inputType === "Text / Topic"
                  ? "Generate question"
                  : "Generate text"
              }}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script>
import {
  CheckIcon,
  ChevronDownIcon,
  FileUpIcon,
  Loader2Icon,
  LockKeyholeIcon,
  PlusIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { cn } from "@/lib/utils";

export default {
  name: "DashboardQuestionForm",
  components: {
    FileUpIcon,
    Loader2Icon,
    LockKeyholeIcon,
    PlusIcon,
    ChevronDownIcon,
    CheckIcon,
  },
  data() {
    return {
      form: {
        name: "",
        difficulty: "Medium",
        prompt: "",
        questionType: "Multiple Choice questions",
        questionCount: 25,
      },
      inputType: "Text / Topic",
      inputTypes: [
        "Text / Topic",
        "Blog URL / Content url",
        "PDF / Document / TXT / Image",
        "Youtube URL",
      ],
      difficultyLevels: ["Easy", "Medium", "Hard"],
      questionTypes: ["Multiple Choice questions", "True or False"],
      language: "English",
      languages: [
        "English",
        "Arabic",
        "Assamese",
        "Azerbaijani",
        "Bashkir",
        "Bengali",
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
      errors: {},
    };
  },
  computed: {
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
    isFreeUser() {
      return !!this.authUser.isFreeUser;
    },
    isValidURL() {
      try {
        new URL(this.form.prompt);
        return true;
      } catch (e) {
        return false;
      }
    },
    countExpire() {
      return this.authUser.questionCount || 0;
    },
    maxQuestionCount() {
      return this.authUser.questionCount;
    },
    countLimit() {
      if (this.authUser.isAdmin) return 20000;
      else if (this.authUser.isProUser) return 20000;
      else if (this.authUser.isGroUser) return 10000;
      else if (this.authUser.isBasicUser) return 5000;
      else if (this.authUser.isFreeUser) return 100;
      return 0;
    },
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
          if (
            confirm(
              "Are you sure you want to generate a Question from this text?"
            )
          ) {
            const { api } = useApi();
            await api.post2("/dashboard/question/generate", this.form);
            this.modal = false;
            toast.success("Question generated successfully");
            this.$emit("refetch");
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
        if (this.countExpire <= 0 || this.click || !event.target.files[0])
          return;
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
        let extractedText = "";
        const fileReader = new FileReader();

        fileReader.onload = async (e) => {
          try {
            const arrayBuffer = e.target.result;
            const { value } = await mammoth.extractRawText({ arrayBuffer });
            extractedText = value.trim();
            resolve(extractedText);
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
      const { data } = await Tesseract.recognize(file, "eng", {
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
  },
};
</script>
