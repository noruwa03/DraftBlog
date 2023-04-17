<script setup>
import Error from "~/components/modals/Error.vue";
import UnauthorizedUser from "~/components/modals/UnauthorizedUser.vue";
import AccountSettingSuccess from "~/components/modals/AccountSettingSuccess.vue";
import Loading from "~/components/loaders/Loading.vue";

import { profileUpdate } from "~/store/profile/index";
import { userAuth } from "~/store/auth/authentication";

const profileInfo = profileUpdate();

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

const { params } = useRoute();

const userObj = ref({
  photoName: "",
  photoURL: "",
});

const imageInputRef = ref();
const img = ref();

const imageInputClick = () => imageInputRef.value.click();

const imageChange = (evt) => {
  const file = evt.target.files[0];
  img.value = URL.createObjectURL(file);
  userObj.value.photoName = file.name;
  userObj.value.photoURL = file;
};

const closeError = () => {
  profileInfo.error = false;
};

const getCurrentUser = () => {
  profileInfo.GET_CURRENT_USER(params.slug);
};

getCurrentUser();

const submitHandler = () => {
  profileInfo.loading = true;

  const data = {
    imageData: userObj.value,
    slug: params.slug,
  };

  if (imageInputRef.value.files.length === 0) {
    profileInfo.loading = false;
    profileInfo.error = true;
    profileInfo.errorMessage = "Please upload an image";
  } else {
    profileInfo.UPDATE_PROFILE(data);
  }
};
</script>

<template>
  <main>
    <Head>
      <Title>DraftBlog</Title>
      <Meta
        name="description"
        content="Personal blogging site created by Obaseki Noruwa"
      />
    </Head>
    <Error
      v-if="profileInfo.error"
      :message="profileInfo.errorMessage"
      @close="closeError"
    />

    <div>
      <Loading v-if="profileInfo.loading" />
      <section v-else class="lg:pt-20 pt-20 lg:px-16 sm:px-8 px-6 py-16">
        <AccountSettingSuccess
          :username="profileInfo.currentUser[0].username"
          v-if="profileInfo.success"
        />

        <UnauthorizedUser
          v-if="auth.storedUser.uid !== profileInfo.currentUser[0].id"
        />

        <form @submit.prevent="submitHandler">
          <div class="lg:w-2/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5">
            <h1
              class="text-slate-700 font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-8 mb-16"
            >
              Profile Information
            </h1>

            <div class="grid place-content-center mb-6" v-if="img">
              <div class="w-32 h-32 rounded-full bg-red-200 relative">
                <img
                  :src="img"
                  alt=""
                  class="w-32 h-32 rounded-full object-cover"
                />
                <div
                  @click="imageInputClick"
                  class="absolute bottom-0 right-1 p-2 rounded-full bg-gray-100 border-2 border-green-200 grid place-content-center"
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
                </div>
              </div>
            </div>

            <div
              v-else
              @click="imageInputClick"
              class="border-[1px] border-dashed border-green-400 grid place-content-center w-5/5 h-16 mb-6 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-cloud-arrow-up fill-green-400"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                />
                <path
                  d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                />
              </svg>
            </div>
            <input
              type="file"
              name=""
              id=""
              class="hidden"
              ref="imageInputRef"
              accept="image/png, image/jpg, image/jpeg"
              @change="imageChange"
            />

            <label for="" class="text-slate-700 text-sm">Name</label>
            <input
              type="text"
              class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-base text-slate-700"
              placeholder=""
              v-model="profileInfo.currentUser[0].fullname"
            />

            <label for="" class="text-slate-700 text-sm">Bio</label>
            <textarea
              name=""
              id=""
              class="resize-none h-24 outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-base text-slate-700"
              v-model="profileInfo.currentUser[0].bio"
            />

            <button
              class="w-full bg-green-500 py-2 outline-none text-white text-sm font-bold my-6 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>
