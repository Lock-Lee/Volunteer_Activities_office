import moment from 'moment'

const moments = require('moment-timezone')

moments().tz("Asia/Bangkok").format()

const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

export default class TimeFormat {
  strToDate(str) {
    const date = new Date(str)

    return str && moment(date).isValid() ? date : ''
  }

  toDateStr(date) {
    return date && moment(date).isValid() ? moment.utc(date).tz("Asia/Bangkok").format('YYYY-MM-DD') : ''
  }

  toTimeStr(date) {
    return date && moment(date).isValid() ? moment.utc(date).tz("Asia/Bangkok").format('HHmm') : ''
  }

  toDateTimeStr(date) {
    return date && moment(date).isValid() ? moment.utc(date).tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss') : ''
  }

  showDateTH(date) {
    if (date && moment(date).isValid()) {
      const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
      const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
      const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')

      return `${day}/${month}/${year}`
    } else {
      return ''
    }
  }

  showDateTimeTH(date) {
    if (date && moment(date).isValid()) {
      const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
      const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
      const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
      const time = moment.utc(date).tz("Asia/Bangkok").format('HH:mm')

      return `${day}/${month}/${year} ${time}`
    } else {
      return ''
    }
  }

  showFullDateTH(date) {
    if (date && moment(date).isValid()) {
      const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
      const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
      const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')

      return `${day} ${monthNames[parseInt(month) - 1]} ${year}`
    } else {
      return ''
    }
  }

  showFullDateTimeTH(date) {
    if (date && moment(date).isValid()) {
      const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
      const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
      const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
      const time = moment.utc(date).tz("Asia/Bangkok").format('HH:mm')

      return `${day} ${monthNames[parseInt(month) - 1]} ${year} เวลา ${time} น.`
    } else {
      return ''
    }
  }
}