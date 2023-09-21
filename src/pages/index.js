import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router"
import { useEffect } from "react"


const inter = Inter({ subsets: ["latin"] });


export default function Home() {

  const router = new useRouter;

  useEffect(() => {
    router.push('/login')
  }, )

  return (
    <>
      You're not supposed to be here, traveler
    </>
  );
}
