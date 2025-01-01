<template>
  <div>
    <div class="flex justify-end">
      <Button class="w-full md:w-auto" @click="modal = true"
        ><PlusIcon /> Create new quiz</Button
      >
    </div>
    <Sheet @update:open="modal = false" :open="modal">
      <SheetContent side="right" class="w-full md:max-w-[550px] p-0">
        <div class="p-2 max-h-full h-full flex flex-col gap-2 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create new quiz</SheetTitle>
          </SheetHeader>
          <div class="flex flex-col gap-2 flex-1">
            <div class="col-span-2">
              <Label for="difficulty">Quiz name</Label>
              <Input
                type="text"
                v-model="form.name"
                placeholder="Enter question Name"
              />
              <ErrorMessage :error="errors" name="name" />
            </div>
            <form class="col-span-2" @submit.prevent="addAdditional">
              <Label for="difficulty"
                >Online exam additional data (optional)</Label
              >
              <div class="flex gap-1">
                <Input
                  type="text"
                  v-model="additional"
                  placeholder="Enter field name"
                />
                <Button type="submit" class="size-10"><CheckIcon /></Button>
              </div>
              <ErrorMessage :error="errors" name="additional" />

              <div class="flex flex-wrap mt-2 gap-2">
                <Badge
                  v-for="(item, i) in form.additional"
                  :key="i"
                  class="flex items-center gap-1"
                >
                  {{ item }}
                  <span
                    class="cursor-pointer"
                    @click="form.additional.splice(i, 1)"
                    ><XIcon :size="12"
                  /></span>
                </Badge>
              </div>
            </form>
            <div>
              <form class="col-span-2" @submit.prevent="searchQuestion">
                <Label for="difficulty">Search Questions</Label>
                <div class="flex gap-1">
                  <Input
                    type="text"
                    v-model="search"
                    placeholder="Enter search keyword"
                  />
                  <Button type="submit" class="size-10"><SearchIcon /></Button>
                </div>
                <ErrorMessage :error="errors" name="questions" />

                <div class="flex flex-wrap mt-2 gap-2">
                  <Badge
                    v-for="(item, i) in form.questions"
                    :key="i"
                    class="flex items-center gap-1"
                  >
                    {{ item.name }} ({{ item.questionCount }})
                    <span
                      class="cursor-pointer"
                      @click="form.questions.splice(i, 1)"
                      ><XIcon :size="12"
                    /></span>
                  </Badge>
                </div>
                <div class="flex justify-center mt-5" v-if="loading">
                  <Loader2Icon class="animate-spin" />
                </div>
                <div class="grid grid-cols-2 gap-1 mt-2" v-else>
                  <p
                    v-for="(item, i) in questions"
                    :key="i"
                    class="hover:underline cursor-pointer"
                    @click="addQuestions(item)"
                  >
                    {{ item.name }}
                    <span class="text-sm">({{ item.questionCount }})</span>
                  </p>
                </div>
              </form>
              <div class="flex justify-end mt-5">
                <Button @click="createQuiz">Create quiz</Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script>
import {
  CheckIcon,
  PlusIcon,
  XIcon,
  SearchIcon,
  Loader2Icon,
} from "lucide-vue-next";

export default {
  name: "DashboardQuizForm",
  components: { PlusIcon, CheckIcon, XIcon, SearchIcon, Loader2Icon },
  data() {
    return {
      blocked: false,
      loading: false,
      modal: false,
      form: { name: "", additional: [], questions: [] },
      additional: "",
      search: "",
      questions: [],
      errors: {},
    };
  },
  watch: {
    modal(val) {
      if (val) this.searchQuestion();
    },
  },
  methods: {
    addAdditional() {
      if (this.additional.length) {
        this.form.additional.push(this.additional);
        this.additional = "";
      }
    },
    async searchQuestion() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        const { items } = await api.get("/dashboard/quiz/search-questions", {
          search: this.search,
        });
        this.questions = items;
      } catch (error) {
        console.log(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    addQuestions(item) {
      const exist = this.form.questions.findIndex(
        ({ _id }) => _id === item._id
      );
      if (exist !== -1) {
        this.form.questions.splice(exist, 1);
      } else {
        this.form.questions.push(item);
      }
    },
    async createQuiz() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        await api.post("/dashboard/quiz", this.form);
        this.$emit("refetch");
        this.modal = false;
      } catch (error) {
        console.error(error);
        this.errors = error.response._data.errors;
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
  },
};
</script>
