<script setup>
import { bloggerPage } from "~/store/blogger/index";
import { userAuth } from "~/store/auth/authentication";
import { deletePost } from "~/store/post/deletePost";

import CustomError from "~/components/modals/CustomError.vue";
import PostDeleteSuccess from "~/components/modals/PostDeleteSuccess.vue";
import PreviewProfileImage from "~/components/modals/PreviewProfileImage.vue";
import Loading from "~/components/loaders/Loading.vue";

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
const blogger = bloggerPage();

const { params } = useRoute();

const getCurrentUser = async () => {
  blogger.GET_BLOGGER_INFO(params.slug);
};

getCurrentUser();

const delRef = deletePost();

const delPost = (val) => {
  delRef.loading = true;
  delRef.DELETE_POST(val);
};

const previewImage = ref(false);

const previewProfileAvatar = () => {
  previewImage.value = true;
};

const closePreviewProfileImage = () => {
  previewImage.value = false;
};
</script>

<template>
  <main>
    <div>
      <Loading v-if="blogger.loading" />
      <div v-else>
        <CustomError v-if="blogger.error" :message="blogger.errorMessage" />

        <div v-else>
          <Head>
            <Title>{{ blogger.bloggerInfo[0].fullname }}</Title>
            <Meta
              name="description"
              content="Personal blogging site created by Obaseki Noruwa"
            />
          </Head>
          <PreviewProfileImage
            :close="closePreviewProfileImage"
            :photoURL="blogger.bloggerInfo[0].photoURL"
            v-if="previewImage"
          />
          <Loading v-if="delRef.loading" />
          <CustomError v-if="delRef.error" :message="delRef.errorMessage" />
          <PostDeleteSuccess v-if="delRef.success" />
          <section class="lg:pt-8 pt-6 lg:px-20 sm:px-8 px-6">
            <div v-if="auth.storedUser.uid.length > 0">
              <div
                v-if="auth.storedUser.uid === blogger.bloggerInfo[0].id"
                class="grid place-content-end mb-4"
              >
                <div class="flex flex-row items-center space-x-4">
                  <NuxtLink
                    to="/create"
                    class="px-8 py-2 border-2 border-green-400 bg-green-400 sm:text-base text-sm rounded-md text-white font-medium"
                    >Create Post</NuxtLink
                  >

                  <div
                    @click="auth.SIGN_OUT"
                    class="cursor-pointer px-8 py-2 border-2 border-red-400 sm:text-base text-sm rounded-md text-slate-700 font-medium"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>

            <div class="grid place-content-end mb-8">
              <NuxtLink
                to="/"
                class="px-8 py-2 border-2 border-green-400 bg-green-400 sm:text-base text-sm rounded-md text-white font-medium"
                >Go Home</NuxtLink
              >
            </div>

            <div class="grid place-content-center">
              <div class="w-32 h-32 rounded-full relative">
                <img
                  v-if="blogger.bloggerInfo[0].photoURL"
                  :src="blogger.bloggerInfo[0].photoURL"
                  :alt="blogger.bloggerInfo[0].photoName"
                  class="w-32 h-32 rounded-full object-cover"
                  @click="previewProfileAvatar"
                />

                <img
                  v-else
                  src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                  alt="Image Placeholder"
                  class="w-32 h-32 rounded-full object-cover"
                />
                <div
                  v-if="auth.storedUser.uid === blogger.bloggerInfo[0].id"
                  class="absolute bottom-0 right-1"
                >
                  <NuxtLink
                    :to="`/account/${blogger.bloggerInfo[0].id}`"
                    class="p-2 rounded-full bg-gray-100 border-2 border-green-200 grid place-content-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                      />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <h1
              class="lg:text-xl text-base font-semibold text-center text-slate-800 mt-4"
            >
              {{ blogger.bloggerInfo[0].fullname }}
            </h1>

            <h2
              class="sm:text-base text-sm text-center text-slate-800 mt-2 lg:w-2/5 w-5/5 mx-auto"
            >
              {{ blogger.bloggerInfo[0].bio }}
            </h2>
          </section>
          <div v-if="blogger.bloggerPost.length == 0">
            <div class="grid place-content-center mt-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-list-columns-reverse"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"
                />
              </svg>
            </div>
            <div class="text-center text-xl font-medium mt-6">No posts yet</div>
          </div>
          <section v-else class="lg:pt-16 pt-20 pb-20 lg:px-16 sm:px-8 px-6">
            <div class="grid lg:grid-cols-8 sm:grid-cols-8 grid-cols-2 gap-8">
              <div
                class="lg:col-span-2 sm:col-span-4 col-span-2"
                v-for="item in blogger.bloggerPost"
                :key="blogger.bloggerPost.id"
              >
                <div
                  class="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-md pb-6 relative"
                >
                  <div class="w-full h-48 overflow-hidden">
                    <img
                      v-if="item.photoURL == ''"
                      src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                      alt="Image Placeholder"
                      class="w-full h-full object-cover hover:scale-110 transition-all duration-150"
                    />

                    <img
                      v-else
                      :src="item.photoURL"
                      :alt="item.blogPhoto"
                      class="w-full h-full object-cover hover:scale-110 transition-all duration-150"
                    />
                  </div>
                  <div v-if="auth.storedUser.uid.length > 0">
                    <div
                      v-if="auth.storedUser.uid === blogger.bloggerInfo[0].id"
                      class="absolute top-3 right-4 flex items-center space-x-4"
                    >
                      <NuxtLink
                        :to="`/edit/${item.id}`"
                        class="grid place-content-center p-2 rounded-full bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                          />
                        </svg>
                      </NuxtLink>
                      <div
                        @click="delPost({ id: item.id, photo: item.blogPhoto })"
                        class="grid place-content-center p-2 rounded-full bg-gray-100 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                          />
                          <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="px-4 mt-3">
                    <h1
                      class="text-base text-slate-900 font-semibold capitalize"
                    >
                      <NuxtLink
                        :to="`/p/${item.id}`"
                        class="hover:underline decoration-wavy decoration-green-300"
                      >
                        {{ item.blogTitle.substring(0, 23) }}
                        <span v-if="item.blogTitle.length >= 23"> ...</span>
                      </NuxtLink>
                    </h1>
                    <h2
                      class="text-xs text-slate-900 capitalize font-semibold mt-2"
                    >
                      Posted on:
                      {{
                        new Date(item.createdAt).toDateString("en-us", {
                          dataStyle: "long",
                        })
                      }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
