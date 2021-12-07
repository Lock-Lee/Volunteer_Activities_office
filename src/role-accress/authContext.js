import { createContext } from "react"

const authContext = createContext({
  authcertifying: true,
  authenticated: false,
  permissions: [],
  user: {},
  handleLogin: () => { },
  initiateAuthentication: () => { },
  logout: () => { }
})

export const AuthProvider = authContext.Provider
export const AuthConsumer = authContext.Consumer