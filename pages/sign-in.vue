<script setup>
import SignInFlow from "../assets/icons/signin.svg";
import Google from "../assets/icons/google.svg";
import Error from "~/components/modals/Error.vue";
import Loading from "~/components/loaders/Loading.vue";
import { userAuth } from "~/store/auth/authentication";

definePageMeta({
  layout: "custom",
});

const auth = userAuth();

const userObj = ref({
  email: "",
  password: "",
});

const closeError = () => {
  auth.error = false;
};

const submitHandler = () => {
  auth.loading = true;

  auth.SIGN_IN(userObj.value);
};
</script>

<template>
  <main>
    <Head>
      <Title>DraftBlog</Title>
      <Meta name="description" content="DraftBlog signin page" />
    </Head>
    <Loading v-if="auth.loading" />
    <Error v-if="auth.error" :message="auth.errorMessage" @close="closeError" />

    <section class="lg:px-0 sm:px-8 px-6">
      <div class="grid lg:grid-cols-8 grid-cols-4">
        <div class="lg:col-span-4 lg:block hidden">
          <div class="w-full h-screen">
            <img :src="SignInFlow" alt="Login Flow" class="w-full h-full" />
          </div>
        </div>
        <div class="lg:col-span-4 col-span-4 lg:pt-32 lg:pb-0 pt-24 pb-16">
          <form @submit.prevent="submitHandler">
            <div class="lg:w-3/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5">
              <h1
                class="text-slate-700 font-serif font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-8 mb-8"
              >
                Sign In to Draft<span class="text-green-400">Blog</span>
              </h1>

              <label for="" class="text-slate-700 font-serif text-sm"
                >E-mail</label
              >
              <input
                type="email"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-5 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="name@gmail.com"
                v-model="userObj.email"
                required
              />
              <label for="" class="text-slate-700 font-serif text-sm"
                >Password</label
              >
              <input
                type="password"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="6+ characters"
                v-model="userObj.password"
                required
              />
              <div class="grid place-content-end">
                <div
                  class="font-serif text-sm text-slate-700 flex flex-row items-center space-x-3 mt-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-info-circle-fill fill-slate-500"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    />
                  </svg>
                  <NuxtLink to="/forgot-password">Forgot Password?</NuxtLink>
                </div>
              </div>
              <button
                class="w-full bg-green-500 py-2 outline-none text-white font-serif text-sm font-bold my-6 rounded-lg"
              >
                Sign in
              </button>

              <div
                class="w-full px-4 py-3 shadow-sm shadow-gray-200 bg-white rounded-lg flex flex-row items-center justify-center text-slate-700 space-x-6 font-semibold text-sm cursor-pointer hover:bg-gray-50"
              >
                <img :src="Google" alt="" class="w-4 h-4" />
                <p>Signin with Google</p>
              </div>
              <div class="font-serif text-sm text-slate-700 text-start mt-6">
                Not a member yet?
                <NuxtLink to="/sign-up" class="text-green-500"
                  >Sign Up</NuxtLink
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
