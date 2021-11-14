import { Route, Switch } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { RegisterPage } from '../auth/pages/RegisterPage'

const Routes = () => {
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
    </Switch>
  )
}

export default Routes
