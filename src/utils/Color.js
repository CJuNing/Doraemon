// 关于 rbga 参数理解 请参考
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba()

// 关于 rbg 参数理解 请参考
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb()

/**
 * rgb参数转hex
 * @param {Int} r [0-255]
 * @param {Int} g [0-255]
 * @param {Int} b [0-255]
 * @returns {String}
 */
const rgbToHex = (r, g, b) => {
  return [r, g, b].reduce((r, x) => {
    return r + x.toString(16).padStart(2, "0")
  }, "#")
}

/**
 * rgba参数转hex
 * @param {Int} r [0-255]
 * @param {Int} g [0-255]
 * @param {Int} b [0-255]
 * @param {Number} a [0-1]
 * @returns {String}
 */
const rgbaToHex = (r, g, b, a = 1) => {
  return [r, g, b, Math.round(255 * a)].reduce((r, x) => {
    return r + x.toString(16).padStart(2, "0")
  }, "#")
}

const _padHex = (hex) => {
  hex = hex.toLowerCase().replace("#", "")
  if (hex.length === 3 || hex.length === 4) {
    let _hex = "#"
    for (let i = 0; i < hex.length; i++) {
      _hex += hex[i] + hex[i]
    }
    return _hex
  } else {
    return "#" + hex
  }
}

const hexToRgba = (hex) => {
  hex = _padHex(hex).replace("#", "")
  if (hex.length == 6) {
    hex += "ff"
  }
  let rgba = []
  for (let i = 0; i < 8; i = i + 2) {
    rgba.push(parseInt("0x" + hex.slice(i, i + 2)))
  }
  // 修复7-8位a的值, 因为a的取值为[0,1]小数点精度为2的数字
  rgba[3] = Number((rgba[3] / 255).toFixed(2))
  return `rgba(${rgba.join(", ")})`
}

const hexToRgb = (hex) => {
  hex = _padHex(hex).replace("#", "")
  let rgba = []
  for (let i = 0; i < 6; i = i + 2) {
    rgba.push(parseInt("0x" + hex.slice(i, i + 2)))
  }
  return `rgba(${rgba.join(", ")})`
}

const toColor = (color) => {
  color = color.toLowerCase()
  let hex, rgb, rgba, hexArr, rgbaArr
  if (color.startsWith("#")) {
    hex = color
  } else if (color.startsWith("rgb")) {
    hex = rgbaToHex(color)
  }
  rgba = hexToRgba(hex)
  rgb = hexToRgb(hex)
  let _hex = hex.padEnd(9, "f")
  hexArr = [0, 1, 2, 3].map((i) => {
    return Number(_hex.slice(1 + i * 2, 3 + i * 2))
  })
  rgbaArr = rbga.match(/(\d|\.)+/g).map(Number)
  return {
    hex,
    rgb,
    rgba,
    hexArr,
    rgbaArr,
  }
}

module.exports = { rgbToHex, rgbaToHex, hexToRgb, hexToRgba, toColor }
