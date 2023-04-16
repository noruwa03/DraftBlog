import { defineStore } from "pinia";
import { storage, firestore } from "~/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { userAuth } from "../auth/authentication";

export const createPost = defineStore("create_post", {
  state: () => ({
    errorMessage: "",
    error: false,
    success: false,
    loading: false,
  }),
  actions: {
    async CREATE_POST(payload: string | any) {
      // console.log(payload);
      // console.log(payload.blogPhoto);
      // console.log(payload.blogPhotoName);

      if (payload.blogPhoto) {
        const storageRef = ref(
          storage,
          `documents/cover_image/${payload.blogPhotoName}`
        );

        const uploadTask = uploadBytesResumable(storageRef, payload.blogPhoto);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error: string | any) => {
            // Handle unsuccessful uploads
            this.loading = false;
            this.errorMessage = error.message;
            this.error = true;
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);

              const authenticatedUser = userAuth();

              addDoc(collection(firestore, "posts"), {
                blogTitle: payload.blogTitle,
                blogHTML: payload.blogHTML,
                blogPhoto: payload.blogPhotoName,
                photoURL: downloadURL,
                uid: authenticatedUser.storedUser.uid,
                author: authenticatedUser.storedUser.fullname,
                username: authenticatedUser.storedUser.username,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              })
                .then((res) => {
                  this.loading = false;
                  const router = useRouter();
                  router.replace(`/p/${res.id}`);
                })
                .catch((error: string | any) => {
                  this.loading = false;
                  this.errorMessage = error.message;
                  this.error = true;
                });
            });
          }
        );
      } else {
        const authenticatedUser = userAuth();

        addDoc(collection(firestore, "posts"), {
          blogTitle: payload.blogTitle,
          blogHTML: payload.blogHTML,
          blogPhoto: "",
          photoURL: "",
          uid: authenticatedUser.storedUser.uid,
          author: authenticatedUser.storedUser.fullname,
          username: authenticatedUser.storedUser.username,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
          .then((res) => {
            this.loading = false;
            const router = useRouter();
            router.replace(`/p/${res.id}`);
          })
          .catch((error: string | any) => {
            this.loading = false;
            this.errorMessage = error.message;
            this.error = true;
          });
      }
    },
  },
});
