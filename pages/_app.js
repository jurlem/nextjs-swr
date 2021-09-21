import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { Global, css } from '@emotion/react';



const GlobalStyle = ({ children }) => (
  <>
    <Global
      styles={css`
        // ::selection {
        //   background-color: #0af5f4;
        //   color: #fefefe;
        // }
        // html {
        //   min-width: 360px;
        //   scroll-behavior: smooth;
        // }
        // #__next {
        //   display: flex;
        //   flex-direction: column;
        //   min-height: 100vh;
        //   background: white;
        // }
      `}
    />
    {children}
  </>
);

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp

