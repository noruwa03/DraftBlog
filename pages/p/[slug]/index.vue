<script setup>
import { getSinglePost } from "~/store/post/getSinglePost";
import CustomError from "~/components/modals/CustomError.vue";
import Loading from "~/components/loaders/Loading.vue";

import { userAuth } from "~/store/auth/authentication";

definePageMeta({
  layout: "custom",
});

const auth = userAuth();

onMounted(() => {
  if (auth.storedUser.uid == "") {
    auth.storedUser = window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : {
          fullname: "",
          username: "",
          uid: "",
          email: "",
        };
  }
});

const postDetail = getSinglePost();

const { params } = useRoute();

const fetchData = () => {
  postDetail.loading = true;
  postDetail.GET_POST(params.slug);
};

fetchData();
</script>

<template>
  <main>
    <Loading v-if="postDetail.loading" />
    <div v-else>
      <CustomError v-if="postDetail.error" :message="postDetail.errorMessage" />

      <div v-else>
        <Head>
          <Title>{{ postDetail.content[0].blogTitle }}</Title>
          <Meta name="description" :content="postDetail.content[0].blogTitle" />
        </Head>
        <section class="lg:pt-8 lg:pb-28 pt-6 pb-20 lg:px-20 sm:px-8 px-6">
          <div>
            <div class="grid place-content-end mb-8">
              <div class="flex flex-row items-center space-x-4">
                <a
                  href="/"
                  class="px-8 py-2 sm:text-base text-sm border-2 border-green-400 rounded-md text-black font-medium"
                  >Go Home</a
                >

                <div v-if="auth.storedUser.uid === postDetail.content[0].uid">
                  <NuxtLink
                    :to="`/edit/${postDetail.content[0].id}`"
                    class="px-8 py-2 border-2 border-green-400 bg-green-400 sm:text-base text-sm rounded-md text-white font-medium"
                    >Edit</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="grid place-content-center mt-7 lg:mb-14 mb-10">
            <img
              v-if="postDetail.content[0].photoURL == ''"
              src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
              alt="Image Placeholder"
              class=""
            />

            <img
              v-else
              :src="postDetail.content[0].photoURL"
              :alt="postDetail.content[0].blogPhotoName"
              class=" "
            />
          </div>
          <h1 class="lg:text-3xl text-xl font-bold text-black mb-2">
            {{ postDetail.content[0].blogTitle }}
          </h1>
          <span class="lg:text-sm text-xs font-bold text-black">{{
            new Date(postDetail.content[0].updatedAt).toDateString("en-us", {
              dataStyle: "long",
            })
          }}</span>
          <div v-html="postDetail.content[0].blogHTML" class="mt-8 blogHTML"></div>
        </section>
      </div>
    </div>
  </main>
</template>