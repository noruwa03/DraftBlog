import { defineStore } from "pinia";
import { firestore, storage } from "~/lib/firebase";

import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const accountUpdate = defineStore("account_update", {
  state: () => ({
    currentUser: [] as {}[] | any[],
    errorMessage: "",
    error: false,
    success: false,
    loading: true,
  }),
  actions: {
    async GET_CURRENT_USER(payload: string | any) {
      const docRef = doc(firestore, "users", payload);
      try {
        const user = await getDoc(docRef);
        this.currentUser.push({ ...user.data(), id: user.id });

        this.loading = false;
      } catch (error: string | any) {
        this.errorMessage = error.message;
        this.error = true;
      }
    },
    async UPDATE_PROFILE(payload: string | any) {
      if (payload.imageData.photoName) {
        if (this.currentUser[0].photoName.length == 0) {
          const updateRef = ref(
            storage,
            `documents/profile_image/${payload.imageData.photoName}`
          );

          const uploadTask = uploadBytesResumable(
            updateRef,
            payload.imageData.photoURL
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

              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const docRef = doc(firestore, "users", payload.slug);

                updateDoc(docRef, {
                  fullname: this.currentUser[0].fullname,
                  bio: this.currentUser[0].bio,
                  photoName: payload.imageData.photoName,
                  photoURL: downloadURL,
                  updatedAt: serverTimestamp(),
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
            `documents/profile_image/${this.currentUser[0].photoName}`
          );

          deleteObject(storageRef)
            .then(() => {
              // File deleted successfully

              const updateRef = ref(
                storage,
                `documents/profile_image/${payload.imageData.photoName}`
              );

              const uploadTask = uploadBytesResumable(
                updateRef,
                payload.imageData.photoURL
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
                      const docRef = doc(firestore, "users", payload.slug);

                      updateDoc(docRef, {
                        fullname: this.currentUser[0].fullname,
                        bio: this.currentUser[0].bio,
                        photoName: payload.imageData.photoName,
                        photoURL: downloadURL,
                        updatedAt: serverTimestamp(),
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
        const docRef = doc(firestore, "users", payload.slug);

        updateDoc(docRef, {
          fullname: this.currentUser[0].fullname,
          username: this.currentUser[0].username.toLowerCase(),
          bio: this.currentUser[0].bio,
          updatedAt: serverTimestamp(),
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
