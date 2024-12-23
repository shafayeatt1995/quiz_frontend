<template>
  <div>
    <div class="flex justify-end">
      <Button class="w-full md:w-auto" @click="modal = true"
        ><PlusIcon /> Create new quiz</Button
      >
    </div>
    <Sheet @update:open="modal = false" :open="modal">
      <SheetContent side="right" class="w-full md:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Create new quiz</SheetTitle>
        </SheetHeader>
        <div class="space-y-2">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <Label for="difficulty">Difficulty level</Label>
              <Select
                id="difficulty"
                :modelValue="difficulty"
                @update:modelValue="difficulty = $event"
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
              <Label for="quizType">Quiz type</Label>
              <Select
                id="quizType"
                :modelValue="quizType"
                @update:modelValue="quizType = $event"
              >
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select quiz type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      :value="type"
                      v-for="(type, i) in quizTypes"
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
              <Label for="language">Quiz language</Label>
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="open"
                    class="w-full flex justify-between h-10"
                  >
                    {{ languages.find((lang) => lang === language) }}

                    <ChevronsUpDownIcon
                      class="ml-2 h-4 w-4 shrink-0 opacity-50"
                    />
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
              :class="raw.length > 10000 ? 'text-red-500' : ''"
              >Character count: {{ raw.length }}/{{
                isFreeUser ? 0 : 10000
              }}</Label
            >
            <label
              class="border-2 border-dashed rounded-md px-2 py-1 flex flex-col justify-center items-center gap-2 text-gray-600 bg-white cursor-pointer h-80 font-semibold"
              for="file-upload"
              v-if="inputType === 'PDF / Document / TXT / Image'"
            >
              <LockKeyholeIcon v-if="isFreeUser" :size="100" />
              <FileUpIcon v-else :size="100" /> Upload file
            </label>
            <textarea
              v-else-if="inputType === 'Text / Topic'"
              id="characters"
              class="block w-full rounded-lg border-2 border-dashed p-4 focus:outline-none"
              rows="12"
              placeholder="Enter Topic, Youtube URL, PDF, or Text to get a Quiz Docx in seconds. use the bulb for suggestions."
              v-model="raw"
            ></textarea>
            <Input v-else v-model="raw" placeholder="Enter the url" />

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
                <LockKeyholeIcon v-if="isFreeUser" />
                <FileUpIcon v-else />
                Upload file
              </label>
              <input
                type="file"
                id="file-upload"
                class="hidden"
                accept=".pdf&.doc&.docx&.txt&.jpg&.png&.jpeg&.svg&.webp"
                @change="extractText"
                :disabled="isFreeUser"
              />
            </div>
            <Button
              type="button"
              @click="isFreeUser ? null : submit"
              :disabled="loading || isFreeUser"
            >
              <LockKeyholeIcon v-if="isFreeUser" />
              <Loader2Icon class="animate-spin" v-if="loading" />
              {{
                inputType === "Text / Topic" ? "Generate quiz" : "Generate text"
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
  ChevronsUpDownIcon,
  FileUpIcon,
  Loader2Icon,
  LockKeyholeIcon,
  PlusIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { useApi } from "@/composables/useApi";
import { cn } from "@/lib/utils";

export default {
  name: "DashboardQuizForm",
  components: {
    FileUpIcon,
    Loader2Icon,
    LockKeyholeIcon,
    PlusIcon,
    ChevronsUpDownIcon,
    CheckIcon,
  },
  data() {
    return {
      raw: "",
      inputType: "Text / Topic",
      inputTypes: [
        "Text / Topic",
        "Blog URL / Content url",
        "PDF / Document / TXT / Image",
        "Youtube URL",
      ],
      difficulty: "Easy",
      difficultyLevels: ["Easy", "Medium", "Hard", "Very Hard"],
      quizType: "Multiple Choice questions",
      quizTypes: ["Multiple Choice questions", "True or False"],
      language: "English",
      languages: [
        "Amharic",
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
        "English",
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
    };
  },
  computed: {
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
    isFreeUser() {
      return this.authUser.isFreeUser;
    },
    isValidURL() {
      try {
        new URL(this.raw);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  methods: {
    cn,
    async submit() {
      try {
        if (this.click) return;
        this.click = true;
        this.loading = true;
        if (this.inputType === "Text / Topic") {
          if (
            confirm("Are you sure you want to generate a quiz from this text?")
          ) {
            const { api } = useApi();
            const data = await api.post2("/dashboard/generate-quiz", {
              text: this.raw,
            });
          }
        } else if (this.inputType === "Blog URL / Content url") {
          if (this.isValidURL) {
            const html = await $fetch(this.raw);
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            if (doc) {
              this.inputType = "Text / Topic";
              this.raw = doc.body?.innerText.trim();
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
        toast.error(data?.msg || "Something went wrong");
      } finally {
        this.click = false;
        this.loading = false;
      }
    },
    async extractText(event) {
      try {
        if (this.isFreeUser || this.click || !event.target.files[0]) return;
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
          this.raw = await this.extractFromDOCX(file);
        } else if (type.startsWith("image/")) {
          this.raw = await this.extractFromImage(file);
        } else if (type.startsWith("text/plain")) {
          this.raw = await this.extractFromText(file);
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
        this.raw = "";
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
          this.raw = `${this.raw} ${pageText.trim()}`;
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
        const videoId = this.raw.match(
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
        this.raw = data
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
