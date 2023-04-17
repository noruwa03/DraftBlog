<script setup lang="ts">
import { userAuth } from "~/store/auth/authentication";
definePageMeta({
  layout: "custom",
});

const auth = userAuth();
const email = ref("");

const submit = () => {
  auth.SEND_PASSWORD_RESET(email.value);
};
</script>

<template>
  <main>
    <Head>
      <Title>DraftBlog - Blogging site created by Obaseki Noruwa</Title>
      <Meta
        name="description"
        content="Personal blogging site created by Obaseki Noruwa"
      />
    </Head>
    <div class="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
      <div
        v-if="auth.passwordReset"
        class="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg"
      >
        <div class="lg:text-xl text-base text-center text-green-400 my-4">
          Password reset email sent!, check your email.
        </div>

        <div class="text-center my-6">
          <NuxtLink
            to="/"
            class="px-8 py-3 text-base bg-green-400 rounded-md text-white font-medium"
            >Go Home</NuxtLink
          >
        </div>
      </div>
      <div
        v-else
        class="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg"
      >
        <form @submit.prevent="submit">
          <input
            type="email"
            class="outline-none border-[1px] border-gray-200 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-5 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-sm lg:text-base text-slate-700"
            placeholder="name@gmail.com"
            v-model="email"
            required
          />
          <button
            class="w-full bg-green-500 py-2 outline-none text-white text-sm font-bold mt-0 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
