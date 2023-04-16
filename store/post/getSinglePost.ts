import { defineStore } from "pinia";
import { firestore } from "~/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getSinglePost = defineStore("get_single_post", {
  state: () => ({
    content: [] as {}[] | any[],
    errorMessage: "",
    error: false,
    success: false,
    loading: false,
  }),
  actions: {
    async GET_POST(payload: string | any) {
      const docRef = doc(firestore, "posts", payload);

      try {
        const result = await getDoc(docRef);

        if (result.exists()) {
          this.content.push({ ...result.data(), id: result.id });
          this.loading = false;
        
        } else {
          this.loading = false;
          this.errorMessage = "An error occured";
          this.error = true;
        }
      } catch (error: string | any) {
        this.loading = false;
        this.errorMessage = error.message;
        this.error = true;
      }
    },
  },
});
