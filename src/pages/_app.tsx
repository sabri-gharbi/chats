import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { type AppType } from "next/app";
import Head from "next/head";
import Layout from "~/components/layout";
import "~/styles/global.css";
import { ChatsTheme } from "~/styles/theme";
import { api } from "~/utils/api";

const theme = createTheme({ ...ChatsTheme });

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Chats</title>
                <meta name="description" content="finding your next life partner neve been eaisier !" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
};

export default api.withTRPC(MyApp);
