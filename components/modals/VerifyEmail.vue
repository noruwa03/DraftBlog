<script setup lang="ts">
const props = defineProps<{
  uuid: string | any;
}>();
</script>

<template>
  <div class="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
    <div
      class="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-6 bg-white shadow-sm shadow-green-300 rounded-lg"
    >
      <div class="font-semibold text-center text-slate-700 my-4">
        A link to verify your email will be sent to you shortly.
      </div>
      <div class="text-center my-6">
        <NuxtLink
          :to="`/profile/${props.uuid}`"
          class="px-8 py-3 text-base bg-green-500 rounded-md text-white font-medium"
          >Continue</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
