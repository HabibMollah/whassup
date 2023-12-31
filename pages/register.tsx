import { useAuthContext } from "@/contexts/authContext";
import { auth, googleProvider, facebookProvider, db } from "@/firebase";
import { profileColors, randomIndex } from "@/utils/profileColors";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";

const Register = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && currentUser) router.push("/");
  }, [currentUser, isLoading, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const displayName = form[0] as HTMLInputElement;
    const email = form[1] as HTMLInputElement;
    const password = form[2] as HTMLInputElement;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email.value,
        displayName: displayName.value,
        profileColor: profileColors[randomIndex],
      });
      await setDoc(doc(db, "userChat", user.uid), {});

      await updateProfile(user, { displayName: displayName.value });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error(error);
    }
  };
  return isLoading ? (
    <p className="text-center text-5xl text-red-500">Loading...</p>
  ) : (
    <>
      <Head>
        <title>Register | Whassup</title>
      </Head>
      <div className="flex h-[100vh] flex-col items-center justify-center bg-c0">
        <div className="text-center">
          <div className="mb-3 text-4xl font-bold">Create New Account</div>
          <p className="text-c3">Sign up. Connect. Chat.</p>
        </div>
        <div className="mt-8 flex flex-col gap-2 md:flex-row">
          <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <button
              onClick={handleSignInWithGoogle}
              className="flex w-full gap-1 rounded-md bg-c5 p-4 font-bold"
            >
              <IoLogoGoogle size={24} /> Sign up with Google
            </button>
          </div>
          <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <button
              onClick={handleSignInWithFacebook}
              className="flex w-full gap-1 rounded-md bg-c5 p-4 font-bold"
            >
              <IoLogoFacebook size={24} /> Sign up with Facebook
            </button>
          </div>
        </div>
        <div>
          <p className="my-4 font-semibold text-c3">- OR -</p>
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="mb-1 ml-2 block text-c3" htmlFor="display-name">
                Username
              </label>
              <input
                placeholder="Enter your username"
                className="h-12 w-[280px] rounded-md bg-c5 px-4 md:w-[466px]"
                type="text"
                id="display-name"
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 ml-2 block text-c3" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Enter your email"
                className="h-12 w-[280px] rounded-md bg-c5 px-4 md:w-[466px]"
                type="email"
                id="email"
              />
            </div>
            <div>
              <label className="mb-1 ml-2 block text-c3" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Enter your password"
                className="h-12 w-[280px] rounded-md bg-c5 px-4 md:w-[466px]"
                type="password"
                id="password"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="mt-8 w-[280px] rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-lg font-bold md:w-[466px]"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-c3">
            Already have an account?{" "}
            <Link
              className="text-center font-bold underline underline-offset-2 hover:text-white"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
