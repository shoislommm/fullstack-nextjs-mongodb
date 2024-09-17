import "@/styles/globals.css";
import Nav from "@/src/components/nav";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
