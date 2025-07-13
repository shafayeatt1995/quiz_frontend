<template>
  <Head>
    <title v-if="item">Quiz - {{ item.name }} | Mr. Quizer</title>
  </Head>
  <div v-if="showTimer" class="fixed top-1 right-1 px-4 py-2 rounded-md shadow">
    <div class="flex items-center gap-2">
      <PlayIcon size="16" /> {{ quizTime }}s
    </div>
  </div>
  <div class="container mx-auto md:py-10">
    <div class="bg-white max-w-3xl mx-auto rounded-lg shadow">
      <div
        v-if="loading"
        class="p-4 flex flex-col justify-center items-center h-96"
      >
        <Loader2Icon :size="100" class="animate-spin" />
        <p>Loading quiz...</p>
      </div>
      <div v-else class="p-2 md:p-10">
        <h1 class="text-2xl font-bold text-center" @click="anik">
          Quiz - {{ item.name }}
        </h1>
        <div class="grid md:grid-cols-2 gap-2 md:gap-4 mt-2">
          <div v-for="(additional, i) in item.additional" :key="i">
            <Label>{{ additional }}</Label>
            <Input
              type="text"
              v-model="form.additionalFields[additional]"
              :placeholder="`Enter ${additional}`"
            />
          </div>
        </div>
        <hr class="my-4 border-dashed" />
        <Button class="w-full" @click="start" v-if="!showTimer"
          ><PlayIcon />Start exam</Button
        >
        <div class="mt-4 space-y-5" :class="{ 'blur-md': !showTimer }">
          <div v-for="(question, i) in questions" :key="i">
            <h3 class="text-lg font-bold">{{ i + 1 }}. {{ question.q }}</h3>
            <div class="grid md:grid-cols-2 gap-4 mt-2">
              <RadioGroup v-model="form.selected[i]">
                <div v-for="(option, j) in question.o" :key="j">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem
                      :id="`${i}r${j}`"
                      :value="option"
                      class="cursor-pointer"
                    />
                    <Label :for="`${i}r${j}`" class="cursor-pointer">{{
                      option
                    }}</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button class="w-full" @click="initSubmit">Submit</Button>
        </div>
      </div>
    </div>
    <Dialog v-model:open="modal">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Summery</DialogTitle>
        </DialogHeader>
        <div class="space-y-3">
          <div>
            <p>Total question: {{ questions.length }}</p>
            <p>Total answer: {{ form.selected.filter((v) => v).length }}</p>
          </div>
          <div v-if="additionalSuccess.length > 0">
            <p
              class="text-green-500"
              v-for="success in additionalSuccess"
              :key="success"
            >
              {{
                success.charAt(0).toUpperCase() + success.slice(1).toLowerCase()
              }}
            </p>
          </div>
          <div v-if="additionalError.length > 0">
            <p
              class="text-red-500"
              v-for="error in additionalError"
              :key="error"
            >
              {{ error.charAt(0).toUpperCase() + error.slice(1).toLowerCase() }}
            </p>
            <p class="text-red-500 text-xs mt-1">
              If input field isn't filled, it will be considered as empty.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button @click="submit"> Submit </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>
import { Loader2Icon, PlayIcon } from "lucide-vue-next";

export default {
  name: "QuizID",
  components: {
    Loader2Icon,
    PlayIcon,
  },
  data() {
    return {
      blocked: false,
      loading: true,
      item: null,
      questions: [],
      form: {
        additionalFields: {},
        selected: [],
      },
      modal: false,
      additionalError: [],
      additionalSuccess: [],
      startTime: null,
      timer: null,
      elapsed: null,
      showTimer: false,
    };
  },
  computed: {
    quizTime() {
      const minute = Math.floor(this.elapsed / 60);
      const second = Math.floor(this.elapsed % 60);
      return `${minute < 10 ? "0" + minute : minute}:${
        second < 10 ? "0" + second : second
      }`;
    },
  },
  mounted() {
    this.fetchItem();
    console.log(this.$route.query);
  },
  methods: {
    async fetchItem() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        const { item } = await api.post(`/quiz`, {
          id: this.$route.params._id,
        });
        console.log(item);
        if (item) {
          this.item = item;
          this.form.additionalFields = item.additional.reduce(
            (o, k) => ((o[k] = ""), o),
            {}
          );
          const q = [].concat(...item.questions.map(({ q }) => q));
          const o = [].concat(...item.questions.map(({ o }) => o));
          const questionSet = q.map((_, i) => ({
            q: q[i],
            o: o[i],
          }));
          this.questions = questionSet;
          this.form.selected = new Array(this.questions.length);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    initSubmit() {
      try {
        this.additionalError = [];
        this.additionalSuccess = [];
        const additionalFields = Object.entries(this.form.additionalFields).map(
          (val, i) => {
            const [key, value] = val;
            if (value && value.length > 0) {
              this.additionalSuccess.push(`You have filled the ${key} field.`);
            } else {
              this.additionalError.push(`You haven't filled the ${key} field.`);
            }
          }
        );

        this.modal = true;
      } catch (error) {
        console.error(error);
      }
    },
    async submit() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        const { api } = useApi();
        const { data } = await api.post(
          `/quiz/${this.$route.params.id}`,
          this.form
        );
        if (data) {
          this.$toast.success("Quiz submitted successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
      }
    },
    start() {
      if (this.timer) return;
      this.startTime = Date.now();
      this.timer = setInterval(() => {
        this.elapsed = (Date.now() - this.startTime) / 1000;
      }, 1000);
      this.showTimer = true;
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.showTimer = false;
      }
    },
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>
