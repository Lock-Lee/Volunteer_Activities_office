import GLOBAL from '../GLOBAL'

class MainModel {
  async directEndpointFetch(endpoint, data) {
    const response = await fetch(endpoint, {
      method: data.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data.body,
    }).then((response) => response.json().then((responseJson) => {
      return responseJson
    })).catch((error) => {
      return { require: false, data: [], err: error }
    })

    return response
  }

  async authEndpointFetch(endpoint, data) {
    const response = await fetch(endpoint, {
      method: data.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...GLOBAL.ACCESS_TOKEN,
      },
      body: data.body,
    }).then((response) => response.json().then((responseJson) => {
      return responseJson
    })).catch((error) => {
      return { require: false, data: [], err: error }
    })

    if (response.unauthorized) {
      localStorage.clear()
      window.location.reload()
    }

    return response
  }
}

export class AccountModel extends MainModel {
  async directFetch(data) {
    return await this.directEndpointFetch(GLOBAL.ACCOUNT_SERVER.URL + data.url, data)
  }

  async authFetch(data) {
    return await this.authEndpointFetch(GLOBAL.ACCOUNT_SERVER.URL + data.url, data)
  }
}

export class BaseModel extends MainModel {
  async directFetch(data) {
    return await this.directEndpointFetch(GLOBAL.BASE_SERVER.URL + data.url, data)
  }

  async authFetch(data) {
    return await this.authEndpointFetch(GLOBAL.BASE_SERVER.URL + data.url, data)
  }
}

export class FinanceModel extends MainModel {
  async directFetch(data) {
    return await this.directEndpointFetch(GLOBAL.FINANCE_SERVER.URL + data.url, data)
  }

  async authFetch(data) {
    return await this.authEndpointFetch(GLOBAL.FINANCE_SERVER.URL + data.url, data)
  }
}

export class PurchaseModel extends MainModel {
  async directFetch(data) {
    return await this.directEndpointFetch(GLOBAL.PURCHASE_SERVER.URL + data.url, data)
  }

  async authFetch(data) {
    return await this.authEndpointFetch(GLOBAL.PURCHASE_SERVER.URL + data.url, data)
  }
}

export class SaleModel extends MainModel {
  async directFetch(data) {
    return await this.directEndpointFetch(GLOBAL.SALE_SERVER.URL + data.url, data)
  }

  async authFetch(data) {
    return await this.authEndpointFetch(GLOBAL.SALE_SERVER.URL + data.url, data)
  }
}

export class StockModel extends MainModel {
  async directFetch(data) {
    return await this.directEndpointFetch(GLOBAL.STOCK_SERVER.URL + data.url, data)
  }

  async authFetch(data) {
    return await this.authEndpointFetch(GLOBAL.STOCK_SERVER.URL + data.url, data)
  }
}
