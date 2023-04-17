<script setup>
// SignUp UserFlow
import SignUpFlow from "../assets/icons/signup.svg";
import Google from "../assets/icons/google.svg";

// Components
import VerifyEmail from "~/components/modals/VerifyEmail.vue";
import Error from "~/components/modals/Error.vue";
import Loading from "~/components/loaders/Loading.vue";

import { userAuth } from "~/store/auth/authentication";

definePageMeta({
  layout: "custom",
});

const signUpAuth = userAuth();

const error = ref("");

const signUpDetail = ref({
  fullname: "",
  email: "",
  password: "",
});

const closeError = () => {
  signUpAuth.error = false;
};

const signUpHandler = () => {
  if (signUpDetail.value.password.length < 6) {
    error.value = "Password should be greater than 6 characters";
  } else {
    signUpAuth.loading = true;

    signUpAuth.SIGN_UP_USER(signUpDetail.value);
  }
};
</script>

<template>
  <main>
     <Head>
      <Title>DraftBlog</Title>
      <Meta name="description" content="DraftBlog signup page" />
    </Head>
    <Loading v-if="signUpAuth.loading" />
    <Error
      v-if="signUpAuth.error"
      :message="signUpAuth.errorMessage"
      @close="closeError"
    />
    <VerifyEmail
      :uuid="signUpAuth.user.uid"
      v-if="signUpAuth.verifyEmailModal"
    />

    <section class="lg:px-0 sm:px-8 px-6">
      <div class="grid lg:grid-cols-8 grid-cols-4">
        <div class="lg:col-span-4 lg:block hidden">
          <div class="w-full h-screen">
            <img :src="SignUpFlow" alt="Login Flow" class="w-full h-full" />
          </div>
        </div>
        <div class="lg:col-span-4 col-span-4 lg:pt-28 lg:pb-0 pt-24 pb-16">
          <form @submit.prevent="signUpHandler">
            <div class="lg:w-3/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5">
              <h1
                class="text-slate-700 font-serif font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-8 mb-8"
              >
                Sign Up
              </h1>

              <label for="" class="text-slate-700 font-serif text-sm"
                >Fullname</label
              >
              <input
                type="text"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-5 mt-2 font-serif placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="John Doe"
                v-model="signUpDetail.fullname"
                required
              />

              <label for="" class="text-slate-700 font-serif text-sm"
                >E-mail</label
              >
              <input
                type="email"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-5 mt-2 font-serif placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="name@gmail.com"
                v-model="signUpDetail.email"
                required
              />
              <label for="" class="text-slate-700 font-serif text-sm"
                >Password</label
              >
              <input
                type="password"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 font-serif placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="6+ characters"
                v-model="signUpDetail.password"
                required
              />
              <div v-show="error" class="text-red-400 text-xs">
                {{ error }}
              </div>
              <button
                class="w-full bg-green-500 py-2 outline-none text-white font-serif text-sm font-bold my-6 rounded-lg"
              >
                Sign up
              </button>

              <div
                class="w-full px-4 py-3 shadow-sm shadow-gray-200 bg-white rounded-lg flex flex-row items-center justify-center text-slate-700 space-x-6 font-semibold text-sm cursor-pointer hover:bg-gray-50"
              >
                <img :src="Google" alt="" class="w-4 h-4" />
                <p>Signup with Google</p>
              </div>
              <div class="font-serif text-sm text-slate-700 text-start mt-6">
                Already a member?
                <NuxtLink to="/sign-in" class="text-green-500"
                  >Sign In</NuxtLink
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
