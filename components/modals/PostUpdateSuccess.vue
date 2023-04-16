<script setup lang="ts">
const props = defineProps<{
  postId: string | any;
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
        Post successfully updated
      </div>
      <div class="text-center my-6">
        <a
          :href="`/p/${props.postId}`"
          class="px-8 py-2 text-sm bg-green-400 rounded-md text-white font-medium"
          >Go Home</a
        >
      </div>
    </div>
  </div>
</template>
