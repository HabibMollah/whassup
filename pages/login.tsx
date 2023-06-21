import Head from "next/head";
import Link from "next/link";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { auth, facebookProvider, googleProvider } from "../firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";
import ToastMessage from "@/components/ToastMessage";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuthContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoading && currentUser) router.push("/");
  }, [currentUser, isLoading, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form[0] as HTMLInputElement;
    const password = form[1] as HTMLInputElement;
    await signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleForgotPassword = async () => {
    try {
      toast.promise(
        async () => {
          await sendPasswordResetEmail(auth, email);
        },
        {
          pending: "Generating password reset link...",
          success: "Password reset email sent!",
          error: "You've entered an invalid email",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading || (!isLoading && currentUser) ? (
    "Loading..."
  ) : (
    <>
      <Head>
        <title>Login | Whassup</title>
      </Head>
      <div className="flex h-[100vh] flex-col items-center justify-center bg-c0">
        <ToastMessage />
        <div className="text-center">
          <div className="mb-3 text-4xl font-bold">Login to Your Account</div>
          <p className="text-c3">connect and chat with anyone, anywhere</p>
        </div>
        <div className="mt-8 flex flex-col gap-2 md:flex-row">
          <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <button
              onClick={handleSignInWithGoogle}
              className="flex w-full gap-1 rounded-md bg-c5 p-4 font-bold"
            >
              <IoLogoGoogle size={24} /> Log in with Google
            </button>
          </div>
          <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <button
              onClick={handleSignInWithFacebook}
              className="flex w-full gap-1 rounded-md bg-c5 p-4 font-bold"
            >
              <IoLogoFacebook size={24} /> Log in with Facebook
            </button>
          </div>
        </div>
        <div>
          <p className="my-4 font-semibold text-c3">- OR -</p>
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="mb-1 ml-2 block text-c3" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Enter your email"
                className="h-12 w-[280px] rounded-md bg-c5 px-4 md:w-[466px]"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="mt-2 text-end text-c3 underline underline-offset-2 hover:text-white">
              <a onClick={handleForgotPassword}>forgot password?</a>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="mt-8 w-[280px] rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-lg font-bold md:w-[466px]"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-c3">
            Don&apos;t have an account?{" "}
            <Link
              className="text-center font-bold underline underline-offset-2 hover:text-white"
              href="/register"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
