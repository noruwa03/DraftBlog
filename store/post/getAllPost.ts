import { defineStore } from "pinia";
import { firestore } from "~/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export const getAllPost = defineStore("get_all_post", {
  state: () => ({
    content: [] as {}[] | any[],
    errorMessage: "",
    error: false,
    success: false,
    loading: false,
  }),
  getters: {
    blogFeed: (state) => state.content.slice(0, 2),
  },
  actions: {
    async GET_POST() {
      const colRef = collection(firestore, "posts");

      const q = query(colRef, orderBy("createdAt", "desc"));

      try {
        const result = await getDocs(q);

        if (result.empty) {
          this.loading = false;
        } else {
          result.docs.forEach((doc) => {
            this.content.push({ ...doc.data(), id: doc.id });
            this.loading = false;
          });
        }
      } catch (error: string | any) {
        this.loading = false;
        this.errorMessage = error.message;
        this.error = true;
      }
    },
  },
});
