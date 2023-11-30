import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={5}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{ color: '#1B4F72' }}
                    >
                        Gestion de Empleados - CogenTech
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={5}
                >
                    <Link href="/employees">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Ir a Gestion de Empleados
                        </Button>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={5}
                >
                    <Link href="/signup">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Ir a Registro Empleados
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </main>
    );
}
