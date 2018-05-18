import React from 'react'
import getProps from './props'

function isCustomElementName(name) {
  return name.indexOf('-') > 0
}

export default function getChildren(nodes) {
  return [...nodes].map((node, key) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (isCustomElementName(node.localName)) {
        return getPossibleComponent(node, {key})
      } else {
        return getReactElement(node, {key})
      }
    } else {
      return null
    }
  })
}

export function getPossibleComponent(element, otherProps) {
  const klass = window.customElements.get(element.localName)
  if (klass && typeof klass.component === 'function') {
    const props = Object.assign(element.props, otherProps)
    const children = getChildren(element.childNodes)
    return React.createElement(klass.component, props, children)
  } else {
    return getReactElement(element, otherProps)
  }
}

export function getReactElement(element, otherProps) {
  const props = Object.assign(getProps(element), otherProps)
  const children = getChildren(element.childNodes)
  return React.createElement(element.localName, props, children)
}
