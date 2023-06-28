import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { currentUser, isLoading, logOut } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !currentUser) router.push("/login");
  }, [currentUser, isLoading, router]);

  if (isLoading)
    return <p className=" bg-white text-9xl text-red-500">Loading</p>;

  return (
    <div className="h-[100vh] bg-black">
      <button className="bg-slate-200 p-2 text-black" onClick={logOut}>
        Sign out
      </button>
    </div>
  );
};

export default Home;
