import { defineStore } from "pinia";
import { signOut } from "firebase/auth";
import { auth, firestore } from "~/lib/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";

export const userAuth = defineStore("auth", {
  state: () => ({
    storedUser: {
      fullname: "",
      username: "",
      uid: "",
      email: ""
    },
    user: {},
    signedInUser: [] as {}[] | any[],
    error: false,
    errorMessage: "An error occured",
    loading: false,
    verifyEmailModal: false,
  }),
  actions: {
    async SIGN_UP_USER(payload: any) {
      try {
        const createUser = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );

        this.user = createUser.user;

        await setDoc(doc(firestore, "users", createUser.user.uid), {
          fullname: payload.fullname,
          email: payload.email,
          username: payload.fullname
            .slice(0, payload.fullname.indexOf(" "))
            .toLowerCase(),
          photoName: "",
          photoURL: "",
          bio: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const userObj = {
          fullname: payload.fullname,
          username: payload.fullname
            .slice(0, payload.fullname.indexOf(" "))
            .toLowerCase(),
          uid: createUser.user.uid,
          email: createUser.user.email,
        };

        window.localStorage.setItem("user", JSON.stringify(userObj));

        this.loading = false;

        await sendEmailVerification(createUser.user).then(() => {
          this.verifyEmailModal = true;
        });
      } catch (error: string | any) {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message;
      }
    },
    async SIGN_OUT() {
      signOut(auth)
        .then(() => {
          window.localStorage.removeItem("user");
          window.location.replace("/");
        })
        .catch((error: string | any) => {
          console.log(error.message);
        });
    },
    async SIGN_IN(payload: { email: string; password: string }) {
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        const docRef = doc(firestore, "users", result.user.uid);
        const user = await getDoc(docRef);

        this.signedInUser.push({ ...user.data(), id: user.id });
        this.user = result.user;

        const userObj = {
          fullname: this.signedInUser[0].fullname,
          username: this.signedInUser[0].username,
          uid: result.user.uid,
          email: result.user.email,
        };

        window.localStorage.setItem("user", JSON.stringify(userObj));

        this.loading = false;
        const router = useRouter();
        router.replace(`/@${this.signedInUser[0].username}`);
      } catch (error: string | any) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Invalid credentials";
      }
    },
  },
});
