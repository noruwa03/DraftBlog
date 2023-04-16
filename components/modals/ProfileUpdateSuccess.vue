<script setup lang="ts">
const props = defineProps<{
  close: () => void;
}>();
</script>

<template>
  <div class="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
    <div
      class="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        class="bi bi-x-circle absolute top-3 right-4"
        viewBox="0 0 16 16"
        @click="props.close"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <div
        class="font-semibold lg:text-xl text-base text-center text-green-500 my-4"
      >
        Your profile has been updated successfully.
      </div>
    </div>
  </div>
</template>