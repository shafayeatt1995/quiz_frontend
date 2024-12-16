<template>
  <div class="container mx-auto py-12 px-2">
    <h2 class="md:text-4xl text-3xl font-bold text-center">
      Trusted by top universities
    </h2>
    <div
      class="grid md:grid-cols-4 grid-cols-2 gap-5 items-center justify-items-center mt-5"
    >
      <a
        v-for="(company, i) in companies"
        :key="i"
        :href="company.url"
        target="_blank"
        ><img :src="company.image" alt="company" class="max-h-20"
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCompanies",
  data() {
    return {
      companies: [
        {
          image: "/images/companies/christ-university.jpg",
          url: "https://christuniversity.in/",
        },
        {
          image: "/images/companies/manukau.avif",
          url: "https://www.manukau.ac.nz/",
        },
        {
          image: "/images/companies/waikato.svg",
          url: "https://www.waikato.ac.nz/",
        },
        {
          image: "/images/companies/massey.jpg",
          url: "https://www.massey.ac.nz/",
        },
      ],
    };
  },
};
</script>
