<script setup>
import "./styles/global.css";
import { getAllPost } from "~/store/post/getAllPost";

const allPost = getAllPost();

const fetchData = () => {
  allPost.loading = true;
  allPost.GET_POST();
};

fetchData();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
