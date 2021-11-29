import { useQuery } from '@apollo/client'
import { Route, Switch, useHistory } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { RegisterPage } from '../auth/pages/RegisterPage'
import { GET_SESSION } from '../auth/queries/Session'
import { HomePage } from '../home/pages/HomePage'
import { useToast } from '../providers/SnackbarProvider'

const unauthenticatedPathNames = ['/login', '/register']

const Routes = () => {
  const history = useHistory()
  const toast = useToast()

  const { data, loading: loadingSession, error: sessionError } = useQuery(GET_SESSION)

  const { session } = data || {}

  const { location: { pathname } } = history


  if (sessionError || (!loadingSession && !session && !unauthenticatedPathNames.includes(pathname))) {
    toast.show({
      kind: 'error',
      message: 'You must log in first',
    })

    history.push('/login')
  }

  if (!loadingSession && session && unauthenticatedPathNames.includes(pathname)) {
    history.push('/home')
  }

  return (
    <Switch>
      {/* todo: Create component that defines initial page */}
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>

      <Route path="/home">
        {/* TODO: implement authentication guard */}
        <HomePage />
      </Route>
    </Switch>
  )
}

export default Routes
