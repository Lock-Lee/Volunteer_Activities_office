import React, { Component } from 'react'
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode"

import { AuthProvider } from '../../role-accress/authContext'

import Authoring from './Authoring'

import GLOBAL from '../../GLOBAL'

import UserModel from '../../models/UserModel'

const user_model = new UserModel()

class Auth extends Component {
  state = {
    loading: true,
    authcertifying: true,
    authenticated: false,
    permissions: [],
    user: {},
  }

  componentDidMount() {
    this.initiateAuthentication()
  }

  handleLogin = (data) => {
    if (this.state.loading === false) {
      this.setState({
        loading: true,
      }, async () => {
        const login_result = await user_model.checkLogin({
          user_username: data.user_username,
          user_password: data.user_password,
        })
console.log(login_result);
        if (login_result.require === false) {
          this.setState({
            loading: false,
            authcertifying: false,
          }, () => {
            Swal.fire({
              title: "Can not login!",
              text: "Sorry, Someting worng!",
              icon: "error",
            })
          })
        } else if (login_result.data === undefined) {
          this.setState({
            loading: false,
            authcertifying: false,
          }, () => {
            Swal.fire({
              title: "Can not login!",
              text: "Please check your username and password!",
              icon: "warning",
            })
          })
        } else {
          this.setSession({
            x_access_token: login_result.x_access_token,
            permissions_token: login_result.permissions_token,
            user: login_result.data,
          })
        }
      })
    }
  }

  initiateAuthentication = async () => {
    try {
      const serialized = localStorage.getItem('session-user')

      if (serialized !== null) {
        const login_token = JSON.parse(serialized)

        const login_result = await user_model.checkLogin({
          user_username: login_token.user_username,
          user_password: login_token.user_password,
        })
        console.log("login_result",login_result);
        this.setState({
          loading: false,
          authcertifying: false,
        }, () => {
          if (login_result.require === true && login_result.data !== undefined) {
            this.setSession({
              x_access_token: login_result.x_access_token,
              permissions_token: login_result.permissions_token,
              user: login_result.data,
            })
          }
        })
      } else {
        this.setState({
          loading: false,
          authcertifying: false,
        })
      }
    } catch (e) {
      console.log('initiateAuthentication ', e)
    }
  }

  setSession(session) {
    try {
      localStorage.setItem('x-access-token', session.x_access_token)
      localStorage.setItem('session-user', JSON.stringify(session.user))

      GLOBAL.ACCESS_TOKEN = { 'x-access-token': session.x_access_token }
      // const { permissions } = jwt_decode(session.permissions_token)

      this.setState({
        loading: false,
        authcertifying: false,
        authenticated: true,
        // permissions: permissions || [],
        user: session.user,
      },()=>{
      } )
    } catch (e) {
      console.log('setSession ', e)
    }
  }

  logout() {
    try {
      localStorage.clear()
      window.location.reload()
    } catch (e) {
      console.log('logout ', e)
    }
  }

  render() {
    const authProviderValue = {
      ...this.state,
      handleLogin: this.handleLogin,
      initiateAuthentication: this.initiateAuthentication,
      logout: this.logout
    }

    return (
      <AuthProvider value={authProviderValue}>
        {this.state.authcertifying ? <Authoring /> : this.props.children}
      </AuthProvider>
    )
  }
}

export default Auth