import Head from "next/head";
import Link from "next/link";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";

const Register = () => {
  return (
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
            <button className="flex w-full gap-1 rounded-md bg-c5 p-4 font-bold">
              <IoLogoGoogle size={24} /> Sign up with Google
            </button>
          </div>
          <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <button className="flex w-full gap-1 rounded-md bg-c5 p-4 font-bold">
              <IoLogoFacebook size={24} /> Sign up with Facebook
            </button>
          </div>
        </div>
        <div>
          <p className="my-4 font-semibold text-c3">- OR -</p>
        </div>
        <div className="flex flex-col">
          <form>
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
