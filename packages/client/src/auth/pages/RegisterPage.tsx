import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../mutation/CreateUser';
import { useToast } from '../../providers/SnackbarProvider';
import { CREATE_SESSION } from '../mutation/CreateSession';
import { LoadingBackdrop } from '../../shared/components/LoadingBackdrop';
import { useHistory } from 'react-router';

export const RegisterPage = () => {
  const [signUp, { loading: creatingUser }] = useMutation(CREATE_USER)
  const [signIn, { loading: loggingIn }] = useMutation(CREATE_SESSION)

  const toast = useToast()
  const history = useHistory()

  const handleUserCreated = async (email: string, password: string) => {
    await signIn({
      variables: {
        email,
        password
      }
    })

    history.push('/home')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password')
    }

    try {
      await signUp({
        variables: payload
      })

      toast.show({
        kind: 'success',
        message: 'User created!'
      })

      await handleUserCreated(payload.email! as string, payload.password! as string)

    } catch (err) {
      console.error(err)
      toast.show({
        kind: 'error',
        message: 'Error creating user. Please try again'
      })
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={creatingUser}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <LoadingBackdrop isOpen={loggingIn} />
    </Container>
  );
}
