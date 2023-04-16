import { defineStore } from "pinia";
import { firestore } from "~/lib/firebase";

import { getDocs, collection, where, query } from "firebase/firestore";

export const bloggerPage = defineStore("blogger_page", {
  state: () => ({
    bloggerInfo: [] as {}[] | any[],
    bloggerPost: [] as {}[] | any[],
    errorMessage: "",
    error: false,
    success: false,
    loading: true,
  }),
  actions: {
    async GET_BLOGGER_INFO(payload: string | any) {
      const docRef = collection(firestore, "users");
      const queryRef = query(docRef, where("username", "==", payload));

      try {
        const user = await getDocs(queryRef);

        if (user.empty) {
          this.loading = false;
          this.errorMessage = "An error occured";
          this.error = true;
        } else {
          user.forEach((doc) => {
            this.bloggerInfo.push({ ...doc.data(), id: doc.id });

            const bloggerPostRef = collection(firestore, "posts");
            const bloggerPostQuery = query(
              bloggerPostRef,
              where("uid", "==", doc.id)
            );

            getDocs(bloggerPostQuery).then((docRes) => {
              if (docRes.empty) {
                this.loading = false;
                this.bloggerPost = [];
              } else {
                docRes.forEach((docData) => {
                  this.bloggerPost.push({ ...docData.data(), id: docData.id });
                  this.loading = false;
                });
              }
            }).catch((error: string | any) => {
               this.loading = false;
               this.errorMessage = error.message;
               this.error = true;
            });
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
