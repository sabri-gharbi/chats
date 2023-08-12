import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { type AppType } from "next/app";
import Head from "next/head";
import { ChatsTheme } from "~/styles/theme";
import { api } from "~/utils/api";

const theme = createTheme({ ...ChatsTheme });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Chats</title>
        <meta
          name="description"
          content="finding your next life partner neve been eaisier !"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      ;
    </>
  );
};

export default api.withTRPC(MyApp);
