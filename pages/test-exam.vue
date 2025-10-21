<template>
  <Home>
    <div class="container mx-auto">
      <div v-if="!loading" class="space-y-5 my-5 px-2 xl:px-0">
        <div
          class="rounded-lg border flex flex-col items-center bg-white w-full px-2 py-4"
        >
          <h1 class="text-2xl font-semibold">Test exam</h1>
          <p>Time: {{ examForm.time }} minutes</p>
          <p class="text-center">
            Each question is worth 1 mark.
            <span v-if="examForm.negativeMarkingStatus == 'true'">
              Each incorrect answer will deduct
              {{ examForm.negativeMarking }} marks.
            </span>
          </p>
          <p v-if="examForm.instantAnswer" class="text-center">
            <span class="font-bold">NOTE:</span> After select an option, it will
            show the correct answer.
          </p>
        </div>
        <div
          class="rounded-lg border bg-white w-full px-2 py-4"
          v-if="submitted"
        >
          <h2 class="text-xl font-semibold text-center">Your Exam Summary</h2>
          <div class="grid xl:grid-cols-3 grid-cols-2 gap-2 mt-4">
            <div
              class="rounded-lg p-2 lg:p-4 w-full"
              :class="examMark >= 0 ? 'bg-green-200' : 'bg-red-200'"
            >
              <p class="text-center font-semibold">Marks Obtained</p>
              <p
                class="bg-white p-2 rounded-lg text-sm mt-2 flex items-center gap-1 justify-center"
              >
                <CircleCheckBigIcon :size="16" /> {{ examMark }} /
                {{ questions.length || 0 }}
              </p>
            </div>
            <div
              class="rounded-lg p-2 lg:p-4 w-full"
              :class="examMark >= 0 ? 'bg-sky-200' : 'bg-red-200'"
            >
              <p class="text-center font-semibold">Time Taken</p>
              <p
                class="bg-white p-2 rounded-lg text-sm mt-2 flex items-center gap-1 justify-center"
              >
                <TimerIcon :size="16" /> {{ examDuration }} Minute
              </p>
            </div>
            <div
              class="rounded-lg p-2 lg:p-4 w-full col-span-2 xl:col-span-1"
              :class="examMark >= 0 ? 'bg-purple-200' : 'bg-red-200'"
            >
              <p class="text-center font-semibold">Your Answers Summary</p>
              <div
                class="bg-white p-2 rounded-lg text-sm mt-2 flex items-center gap-1 justify-between"
              >
                <p>Correct: {{ correctAnswer }}</p>
                <p>Wrong: {{ wrongAnswer }}</p>
                <p>Skip: {{ skipAnswer }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative space-y-5">
          <div class="absolute z-10 inset-0 backdrop-blur-md" v-if="!startExam">
            <div class="flex justify-center mt-10 sticky top-20">
              <Button @click="startTheExam"><TimerIcon /> start exam</Button>
            </div>
          </div>
          <div
            class="rounded-lg border flex flex-col items-center bg-white relative overflow-hidden p-2"
            v-for="(question, i) in questions"
            :key="i"
          >
            <p
              class="font-semibold absolute top-0 left-0 size-6 flex items-center justify-center bg-gray-200 text-xs"
              v-if="startExam"
            >
              {{ i + 1 }}
            </p>
            <p class="p-2 text-xl font-semibold text-center">
              {{ question.q }}
            </p>
            <div class="grid 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-2 w-full">
              <p
                v-for="(option, j) in question.o"
                :key="j"
                class="p-2 border rounded text-center text-sm cursor-pointer font-semibold"
                :class="getOptionClass(i, j, question.a)"
                @click="setAnswer(i, j, question)"
              >
                {{ option }}
              </p>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-2">
              <Button @click="checkExplanations('google', question)">
                <img
                  src="/images/google.svg"
                  alt="google"
                  class="size-4 object-cover"
                />
                Explanation
              </Button>
              <Button @click="copyContext('google', question)">
                <CopyIcon />
                Copy Keyword
              </Button>
              <Button @click="checkExplanations('chatgpt', question)">
                <img
                  src="/images/icon/chatgpt.svg"
                  alt="chatgpt"
                  class="size-5 object-cover"
                />
                Explanation
              </Button>
              <Button @click="copyContext('chatgpt', question)">
                <CopyIcon />
                Copy Prompt
              </Button>
            </div>
          </div>
        </div>
        <div
          class="sticky bottom-0 py-2 bg-white z-20"
          v-if="startExam && !submitted"
        >
          <Button
            class="w-full flex justify-between"
            @click="submitAnswer"
            :disabled="submitLoading"
          >
            <span>{{ submitAnswers }} / {{ questions.length }}</span>
            <span class="flex gap-2 items-center">
              Submit
              <Loader2Icon v-if="submitLoading" class="animate-spin" />
            </span>
            <span>{{ formattedTime }}</span>
          </Button>
        </div>
      </div>
    </div>
  </Home>
</template>

<script>
import { isValidJSON } from "@/lib";
import eventBus from "@/lib/eventBus";
import {
  CopyIcon,
  Loader2Icon,
  TimerIcon,
  CircleCheckBigIcon,
} from "lucide-vue-next";

export default {
  name: "demo-exam",
  components: {
    Loader2Icon,
    CopyIcon,
    TimerIcon,
    CircleCheckBigIcon,
  },
  data() {
    return {
      questions: [],
      answers: [],
      examForm: {
        time: 25,
        negativeMarkingStatus: false,
        negativeMarking: 0,
        instantAnswer: false,
      },
      loading: true,
      remainingTime: 0,
      timerInterval: null,
      startExam: false,
      examStartTime: null,
      totalExamTime: 0,
      submitted: false,
      submitLoading: false,
      explanationCount: 0,
    };
  },
  computed: {
    formattedTime() {
      return this.formatTime(this.remainingTime);
    },
    submitAnswers() {
      return this.answers.filter((answer) => answer !== null)?.length || 0;
    },
    skipAnswer() {
      return this.answers.filter((answer) => answer === null)?.length || 0;
    },
    correctAnswer() {
      return (
        this.answers.filter(
          (answer, index) => answer === this.questions[index].a
        )?.length || 0
      );
    },
    wrongAnswer() {
      return (
        this.answers.filter(
          (answer, index) =>
            answer !== null && answer !== this.questions[index].a
        )?.length || 0
      );
    },
    examMark() {
      return (
        this.correctAnswer - this.wrongAnswer * this.examForm.negativeMarking
      );
    },
    examDuration() {
      return this.formatTime(this.totalExamTime);
    },
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      try {
        const {
          time,
          negativeMarkingStatus,
          negativeMarking,
          instantAnswer,
          question,
        } = this.$route.query;
        this.examForm.time = time || 25;
        this.remainingTime = (time || 25) * 60;
        this.examForm.negativeMarkingStatus =
          negativeMarkingStatus === "true" ? true : false;
        this.examForm.negativeMarking =
          negativeMarkingStatus === "true" ? +negativeMarking : 0;
        this.examForm.instantAnswer = instantAnswer === "true" ? true : false;
        this.questions = isValidJSON(question) ? JSON.parse(question) : [];
        this.answers = this.questions.map(() => null);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    getOptionClass(index, option, answer) {
      const selected = this.answers[index];

      if (
        (this.examForm.instantAnswer && selected !== null) ||
        this.submitted
      ) {
        if (option === selected && option === answer) {
          return "bg-green-50 text-green-600 border-green-300";
        } else if (option === selected && option !== answer) {
          return "bg-rose-50 text-rose-600 border-rose-300";
        } else if (option === answer) {
          return "bg-green-50 text-green-500 border-green-300";
        }
      } else if (!this.examForm.instantAnswer && selected === option) {
        return "bg-green-50 text-green-600 border-green-300";
      }
      return "";
    },
    startTheExam() {
      this.startExam = true;
      this.examStartTime = Date.now();
      this.startTimer();
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(this.timerInterval);
          this.submit(); // Submit exam when time is up
        }
      }, 1000);
    },
    submitAnswer() {
      if (!confirm("Are you sure, you want to submit?")) return;
      this.submit();
    },
    async submit() {
      try {
        this.submitLoading = true;
        if (this.timerInterval) clearInterval(this.timerInterval);
        const now = Date.now();
        this.totalExamTime = Math.floor((now - this.examStartTime) / 1000);
        this.submitted = true;
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    },
    setAnswer(index, option) {
      if (this.submitted) return;
      if (this.examForm.instantAnswer) {
        if (this.answers[index] === null) this.answers[index] = option;
      } else {
        this.answers[index] = option;
      }
    },
    checkExplanations(type, question) {
      if (this.explanationCount >= 3) return eventBus.emit("loginModal");
      this.explanationCount++;
      const { q, o } = question;
      if (type === "google") {
        const encoded = encodeURIComponent(`${q} ${o.join(", ")}`);
        window.open(`https://www.google.com/search?q=${encoded}`, "_blank");
      } else if (type === "chatgpt") {
        const encoded = encodeURIComponent(`${q}\n${o.join("\n")}`);
        window.open(`https://chat.openai.com/?prompt=${encoded}`, "_blank");
      }
    },
    copyContext(type, question) {
      if (this.explanationCount >= 3) return eventBus.emit("loginModal");

      const { q, o } = question;
      let clipBoardText = "";
      if (type === "google") {
        clipBoardText = `${q} ${o.join(", ")}`;
      } else {
        clipBoardText = `${q}\n${o.join("\n")}`;
      }
      navigator.clipboard.writeText(clipBoardText);
      toast.success(
        `${type === "google" ? "Keyword" : "Prompt"} Copied to clipboard`
      );
    },
  },
};
</script>
