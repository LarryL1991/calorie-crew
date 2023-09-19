import { useRouter } from "next/router"
import { useEffect } from "react"


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
w