import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import type { SyntheticEvent } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Mini Insta</title>
        <meta name="description" content="Mini insta using TRPC" />
        <link rel="icon" href="/" />
      </Head>
      <main className="flex min-h-screen w-screen items-center justify-center ">
        <WelcomeBox />
      </main>
    </>
  );
};

export default Home;

const WelcomeBox: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleGetstarted = () => {
    if (sessionData) void router.push("/home");
    else void signIn();
  };
  return (
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          {" "}
          You should have a discord account to proceed.{" "}
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
        <button className="btn-primary btn" onClick={handleGetstarted}>
          Get Started
        </button>
        {sessionData && (
          <button className="btn-secondary btn ml-6"> Logout </button>
        )}
        <button className="btn-neutral btn ml-6">About</button>
      </div>
    </div>
  );
};
