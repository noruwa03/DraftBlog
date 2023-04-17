<script setup>
import Error from "~/components/modals/Error.vue";
import Loading from "~/components/loaders/Loading.vue";

import { getAllPost } from "~/store/post/getAllPost";
import { userAuth } from "~/store/auth/authentication";

const auth = userAuth();

const allPost = getAllPost();

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

const closeError = () => {
  allPost.error = false;
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
    <Loading v-if="allPost.loading" />
    <div v-else>
      <Error
        v-if="allPost.error"
        :message="allPost.errorMessage"
        :close="closeError"
      />
      <div v-else>
        <div v-if="allPost.content.length == 0">
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
        <div v-else>
          <section
            class="lg:pt-10 pt-12 pb-0 lg:px-16 sm:px-8 px-6 lg:block hidden"
          >
            <div class="grid lg:grid-cols-8 sm:grid-cols-6 grid-cols-4 gap-8">
              <div class="lg:col-span-6 sm:col-span-4 col-span-4">
                <img
                  v-if="allPost.blogFeed[0].photoURL == ''"
                  src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                  alt="Image Placeholder"
                  class="w-full"
                />

                <img
                  v-else
                  :src="allPost.blogFeed[0].photoURL"
                  :alt="allPost.blogFeed[0].blogPhoto"
                  alt=""
                  class="w-full"
                />

                <h1
                  class="lg:text-2xl text-base text-slate-700 font-semibold capitalize mt-5 mb-2"
                >
                  <NuxtLink
                    :to="`/p/${allPost.blogFeed[0].id}`"
                    class="hover:underline decoration-wavy decoration-green-300"
                  >
                    {{ allPost.blogFeed[0].blogTitle.substring(0, 40) }}

                    <span v-if="allPost.blogFeed[0].blogTitle.length >= 40">
                      ...</span
                    >
                  </NuxtLink>
                </h1>
                <h2
                  class="sm:text-base text-sm text-slate-800 capitalize font-semibold mb-2"
                >
                  By:
                  <NuxtLink
                    :to="`/@${allPost.blogFeed[0].username}`"
                    class="hover:text-green-500"
                  >
                    {{ allPost.blogFeed[0].author }}
                  </NuxtLink>
                </h2>
              </div>
              <div class="lg:col-span-2 sm:col-span-2 col-span-4 space-y-8">
                <div
                  class="lg:col-span-2 sm:col-span-3 col-span-4"
                  v-for="item in allPost.blogFeed"
                  :key="allPost.blogFeed.id"
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

                    <div class="px-4 mt-3">
                      <h1
                        class="text-base text-slate-900 font-semibold capitalize"
                      >
                        <NuxtLink
                          :to="`/p/${item.id}`"
                          class="hover:underline decoration-wavy decoration-green-300"
                        >
                          {{ item.blogTitle.substring(0, 30) }}
                          <span v-if="item.blogTitle.length >= 30"> ...</span>
                        </NuxtLink>
                      </h1>
                      <h2
                        class="text-sm text-slate-900 capitalize font-semibold mt-2"
                      >
                        By:
                        <NuxtLink
                          :to="`/@${item.username}`"
                          class="hover:text-green-500"
                        >
                          {{ item.author }}
                        </NuxtLink>
                      </h2>

                      <h3
                        class="text-xs text-slate-900 capitalize font-semibold mt-1"
                      >
                        Posted on:
                        {{
                          new Date(item.createdAt).toDateString("en-us", {
                            dataStyle: "long",
                          })
                        }}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="lg:pt-20 pt-10 pb-20 lg:px-16 sm:px-8 px-6">
            <div class="grid lg:grid-cols-8 sm:grid-cols-8 grid-cols-2 gap-8">
              <div
                class="lg:col-span-2 sm:col-span-4 col-span-2"
                v-for="item in allPost.content"
                :key="allPost.content.id"
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

                  <div class="px-4 mt-3">
                    <h1
                      class="lg:text-base text-2xl text-slate-900 font-semibold capitalize"
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
                      class="text-base text-slate-900 capitalize font-semibold mt-2"
                    >
                      By:
                      <NuxtLink
                        :to="`/@${item.username}`"
                        class="hover:text-green-500"
                      >
                        {{ item.author }}
                      </NuxtLink>
                    </h2>
                    <h3
                      class="text-xs text-slate-900 capitalize font-semibold mt-2"
                    >
                      Posted on:
                      {{
                        new Date(item.createdAt).toDateString("en-us", {
                          dataStyle: "long",
                        })
                      }}
                    </h3>
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
