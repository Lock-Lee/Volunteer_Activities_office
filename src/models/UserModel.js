import { BaseModel } from './MainModel'

export default class UserModel extends BaseModel {
  async checkLogin(data) {
    return this.directFetch({
      url: 'user/login/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getUserMaxCode(data) {
    return this.directFetch({
      url: 'user/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getUserBy(data) { 
    return this.directFetch({
      url: 'user/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getUserByCode(data) {
    return this.directFetch({
      url: 'user/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async checkUsernameBy(data) {
    return this.authFetch({
      url: 'user/checkUsernameBy',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateUserBy(data) {
    return this.directFetch({
      url: 'user/update/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async insertUser(data) {
    return this.directFetch({
      url: 'user/insert/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteUserByCode(data) {
    return this.directFetch({
      url: 'user/delete/index.php',
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}