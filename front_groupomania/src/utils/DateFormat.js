export function dateFormat(tdate) {
  let system_date = new Date(Date.parse(tdate))
  let user_date = new Date()
  if (K.ie) {
    system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
  }
  let diff = Math.floor((user_date - system_date) / 1000)
  if (diff <= 1) {
    return ' 1 seconde'
  }
  if (diff < 20) {
    return diff + ' secondes'
  }
  if (diff < 40) {
    return diff + ' secondes'
  }
  if (diff < 60) {
    return "moins d'une minute"
  }
  if (diff <= 90) {
    return '1 minute'
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + ' minutes'
  }
  if (diff <= 5400) {
    return '1 heure'
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + ' heures'
  }
  if (diff <= 129600) {
    return '1 jour'
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + ' jours'
  }
  if (diff <= 777600) {
    return "plus d'une semaine"
  }
  return 'on ' + system_date
}

let K = (function () {
  let a = navigator.userAgent
  return {
    ie: a.match(/MSIE\s([^;]*)/),
  }
})()
