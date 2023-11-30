import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { client } from '@config/client';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#1F618D !important',
                        color: '#FFFFFF',
                    },
                },
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: '#154360 !important',
                        color: '#FFFFFF !important',
                        textTransform: 'none',
                        borderRadius: '10px',
                        fontSize: 18,
                    },
                },
            ],
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}
