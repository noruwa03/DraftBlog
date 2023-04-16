<template>
  <div class="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
    <div
      class="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg"
    >
      <h1 class="text-6xl font-mono font-black text-green-500 text-center">404</h1>
      <div
        class="font-medium  font-mono lg:text-xl text-base text-center text-green-600 my-4"
      >
        Seems like you are lost?
      </div>
      <div class="text-center my-6">
        <NuxtLink
          to="/"
          class="px-8 py-3  font-mono  text-sm bg-green-400 rounded-md text-white font-medium"
          >Go Home</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
