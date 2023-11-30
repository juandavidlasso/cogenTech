import { AppBar, Box, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

interface Props {
    title: string;
    pageDescription: string;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, pageDescription, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
            </Head>

            <nav style={{ background: 'yellow', height: '70px' }}>
                <AppBar sx={{ background: '#154360', height: '70px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            className="text-center mt-1"
                        >
                            Cogen Tech
                        </Typography>
                    </Box>
                </AppBar>
            </nav>

            <main
                style={{
                    marginTop: 10,
                }}
            >
                {children}
            </main>
        </>
    );
};

export default Layout;
