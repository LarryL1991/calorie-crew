
import Navbar from "@/components/Navbar"
import "../styles/globals.css"
import "../styles/Navbar.css"


 function App({ Component, pageProps }) {
  return (
    <>
        {/* <Navbar/> */}
        <Component {...pageProps} />
    
    </>

 
  )
}

export default App