const zero2 = v => (v >= 10 ? v : '0' + v)
/**
 *
 * @param timestamp
 * @param format
 * @return {string}
 */
export function formatDateTime (timestamp, format = 'yyyy/MM/DD') {
  if (timestamp === null || timestamp === undefined) {
    return ''
  }

  const t = new Date(timestamp)
  if (Number.isNaN(t)) {
    return ''
  }

  const used = {}
  return format.replace(/([yMDHms])/g, (char) => {
    if (used[char]) return ''
    used[char] = true

    switch (char) {
      case 'y':
        return t.getFullYear()
      case 'M':
        return zero2(t.getMonth() + 1)
      case 'D':
        return zero2(t.getDate())
      case 'H':
        return zero2(t.getHours())
      case 'm':
        return zero2(t.getMinutes())
      case 's':
        return zero2(t.getSeconds())
    }
  })
}
