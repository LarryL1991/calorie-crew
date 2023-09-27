import Navbar from "@/components/Navbar";
import "../styles/Home.css";
import "../styles/Navbar.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Navbar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
