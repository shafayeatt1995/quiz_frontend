<template>
  <MetaHead />
  <Home>
    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col-reverse lg:flex-row gap-8 items-center">
        <div
          class="flex-1 bg-white shadow-md rounded-xl p-6 border border-gray-100"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            Send Us a Message
          </h2>
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input v-model="form.name" placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  v-model="form.email"
                  placeholder="Your email"
                />
              </div>
              <div class="md:col-span-2">
                <Label>Subject</Label>
                <Input v-model="form.subject" placeholder="Subject" />
              </div>
              <div class="md:col-span-2">
                <Label>Message</Label>
                <Textarea
                  v-model="form.message"
                  placeholder="Your message..."
                  rows="5"
                />
              </div>
            </div>
            <Button class="w-full mt-6" type="submit">
              Submit your message
            </Button>
          </form>
        </div>

        <div class="flex-1 space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              Contact Us – We’re Here to Help
            </h2>
            <p class="text-gray-600">
              Have questions or need support? Reach out anytime. We'll respond
              within 24–48 hours.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 class="font-semibold text-base">📬 General Inquiries</h3>
              <p>
                <a
                  href="mailto:contact@mrquizer.com"
                  class="text-primary hover:underline"
                  >contact@mrquizer.com</a
                >
                <br />
                Questions about using Mr. Quizer? Drop us a line.
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-base">
                💼 Business & Partnerships
              </h3>
              <p>
                <a
                  href="mailto:business@mrquizer.com"
                  class="text-primary hover:underline"
                  >business@mrquizer.com</a
                >
                <br />
                For collaborations, integrations, and enterprise.
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-base">💡 Product Feedback</h3>
              <p>
                <a
                  href="mailto:feedback@mrquizer.com"
                  class="text-primary hover:underline"
                  >feedback@mrquizer.com</a
                >
                <br />
                Got an idea or bug report? Let us know.
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-base">🕒 Support Hours</h3>
              <p>
                Mon–Fri, Mon–Fri, 4:00 PM – 12:00 AM (NZST)
                <br />
                Support available in English.
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-base">🏢 Address</h3>
              <p>
                12 Ballance Avenue, Papatoetoe, Auckland, New Zealand (2104)
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-base">📞 Phone</h3>
              <p>(+64) 7828 6113</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
<script>
export default {
  name: "ContactPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
};
</script>

<!-- contact@mrquizer.com  -->
