import { defineStore } from "pinia";
import { firestore, storage } from "~/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export const deletePost = defineStore("delete_post", {
  state: () => ({
    success: false,
    errorMessage: "",
    error: false,
    loading: false,
  }),
  actions: {
    async DELETE_POST(payload: string | any) {
      try {


        if (payload.photo) {
          const storageRef = ref(
            storage,
            `documents/cover_image/${payload.photo}`
          );
          deleteObject(storageRef)
            .then(() => {
              // File deleted successfully
              const docRef = doc(firestore, "posts", payload.id);
              deleteDoc(docRef)
                .then(() => {
                  this.loading = false;
                  this.success = true;
                })
                .catch((error: string | any) => {
                  this.loading = false;
                  this.errorMessage = error.message;
                  this.error = true;
                });
            })
            .catch((error: string | any) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.error = true;
            });
        } else {
          const docRef = doc(firestore, "posts", payload.id);

          deleteDoc(docRef)
            .then(() => {
              this.loading = false;
              this.success = true;
            })
            .catch((error: string | any) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.error = true;
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
