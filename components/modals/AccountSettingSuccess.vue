<script setup lang="ts">
const props = defineProps<{
  username: string | any;
}>();
</script>

<template>
  <div class="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
    <div
      class="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg"
    >
      <div
        class="font-semibold lg:text-xl text-base text-center text-green-500 my-4"
      >
        Your profile has been updated successfully, Click the link below.
      </div>
      <div class="text-center my-6">
        <NuxtLink
          :to="`/@${props.username}`"
          class="px-8 py-3 border-[1px] border-green-300 text-base rounded-md text-slate-800 font-medium capitalize"
          >Continue</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
