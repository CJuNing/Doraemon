const domParser = new DOMParser()

class Element {
  constructor(elements) {
    this.els = elements
    this.els.forEach((e, i) => {
      this[i] = e
    })
    this.length = this.els.length
  }
  attr(a, b) {
    if (typeof a == "object") {
      for (var key in a) {
        this.els.forEach((e) => {
          e.setAttribute(key, a[key])
        })
      }
    } else if (b != undefined) {
      this.els.forEach((e) => {
        e.setAttribute(a, b)
      })
    } else {
      return this.els[0].getAttribute(a)
    }
  }
  css(a, b) {
    if (typeof a == "object") {
      for (var key in a) {
        this.els.forEach((e) => {
          e.style[key] = a[key]
        })
      }
    } else if (b != undefined) {
      this.els.forEach((e) => {
        e.style[a] = b
      })
    } else {
      return this.els[0].style[a]
    }
  }
  addClass(classNames) {
    classNames = classNames.split(" ")
    this.els.forEach((e) => {
      e.classList.add(...classNames)
    })
  }
  removeClass(classNames) {
    classNames = classNames.split(" ")
    this.els.forEach((e) => {
      e.classList.remove(...classNames)
    })
  }
  toggleClass(className) {
    this.els.forEach((e) => {
      e.classList.toggle(className)
    })
  }
  eq(i) {
    return new Element(this.els[i])
  }
  find(a) {
    return $(a, this.els[0])
  }
}

const $ = (a, parentNode) => {
  if (typeof a == "string") {
    if (a.startsWith("<")) {
      let nodes = domParser.parseFromString(a, "text/html").body.childNodes
      return new Element([...nodes])
    } else {
      parentNode = parentNode || document
      return new Element([...parentNode.querySelectorAll(a)])
    }
  } else {
    return new Element(a)
  }
}

export default $
