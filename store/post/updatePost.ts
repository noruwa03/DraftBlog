import { defineStore } from "pinia";
import { firestore, storage } from "~/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { userAuth } from "../auth/authentication";

export const updatePost = defineStore("update_post", {
  state: () => ({
    content: [] as {}[] | any[],
    success: false,
    errorMessage: "",
    error: false,
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
    async UPDATE_POST(payload: string | any) {
      if (payload.blogPhoto) {
        if (this.content[0].blogPhoto.length == 0) {
          const updateRef = ref(
            storage,
            `documents/cover_image/${payload.blogPhotoName}`
          );

          const uploadTask = uploadBytesResumable(updateRef, payload.blogPhoto);

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

              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const docRef = doc(firestore, "posts", this.content[0].id);

                const authenticatedUser = userAuth();

                updateDoc(docRef, {
                  blogTitle: this.content[0].blogTitle,
                  blogHTML: this.content[0].blogHTML,
                  blogPhoto: payload.blogPhotoName,
                  photoURL: downloadURL,
                  uid: authenticatedUser.storedUser.uid,
                  author: authenticatedUser.storedUser.fullname,
                  username: authenticatedUser.storedUser.username,
                  updatedAt: Date.now(),
                })
                  .then(() => {
                    this.loading = false;
                    this.success = true;
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
          const storageRef = ref(
            storage,
            `documents/cover_image/${this.content[0].blogPhoto}`
          );

          deleteObject(storageRef)
            .then(() => {
              // File deleted successfully

              const updateRef = ref(
                storage,
                `documents/cover_image/${payload.blogPhotoName}`
              );

              const uploadTask = uploadBytesResumable(
                updateRef,
                payload.blogPhoto
              );

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

                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      const docRef = doc(
                        firestore,
                        "posts",
                        this.content[0].id
                      );

                      const authenticatedUser = userAuth();

                      updateDoc(docRef, {
                        blogTitle: this.content[0].blogTitle,
                        blogHTML: this.content[0].blogHTML,
                        blogPhoto: payload.blogPhotoName,
                        photoURL: downloadURL,
                        uid: authenticatedUser.storedUser.uid,
                        author: authenticatedUser.storedUser.fullname,
                        username: authenticatedUser.storedUser.username,
                        updatedAt: Date.now(),
                      })
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
                  );
                }
              );
            })
            .catch((error: string | any) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.error = true;
            });
        }
      } else {
        const docRef = doc(firestore, "posts", this.content[0].id);

        const authenticatedUser = userAuth();

        updateDoc(docRef, {
          blogTitle: this.content[0].blogTitle,
          blogHTML: this.content[0].blogHTML,
          uid: authenticatedUser.storedUser.uid,
          author: authenticatedUser.storedUser.fullname,
          username: authenticatedUser.storedUser.username,
          updatedAt: Date.now(),
        })
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
    },
  },
});
