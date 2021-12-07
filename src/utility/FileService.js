import GLOBAL from '../GLOBAL'

export default class FileService {
  async updateFile(data) {
    const { upload_path, src, } = data

    const res_upload = await this.uploadFile({ upload_path: upload_path, src: src })

    if (res_upload.require) {
      if (src.old && src.old !== '') await this.deleteFile({ file_path: src.old })

      return res_upload.data.file_name
    } else {
      return src.old
    }
  }

  async uploadFile(data) {
    const { upload_path, src,names } = data

    if (src.file === undefined && src.file === null) {
      return { require: false, err: 'file not found!' }
    } else {
      const form_data = new FormData()

      form_data.append('upload_path', upload_path)
      form_data.append('files', src.file)
      form_data.append('names',names)


      return await fetch(GLOBAL.BASE_SERVER.URL_UPLOAD, {
        method: 'post',
        // headers: GLOBAL.ACCESS_TOKEN,
        body: form_data
      }).then((response) => response.json().then((responseJson) => {
        return responseJson
      })).catch((error) => {
        return { w: false, data: [], err: error }
      })
    }
  }

  async deleteFile(data) {
    return await fetch(GLOBAL.BASE_SERVER.URL_DELETE, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...GLOBAL.ACCESS_TOKEN,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json().then((responseJson) => {
      return responseJson
    })).catch((error) => {
      return { require: false, data: [], err: error }
    })
  }
}