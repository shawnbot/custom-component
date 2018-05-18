import React from 'react'
import ReactDOM from 'react-dom'
import getChildren from './children'
import getElementName from './get-element-name'
import getProps from './props'
import replaceWith from './replace-with'

const CONNECTED = 'connected'
const CREATED = 'created'

export default function createComponentClass(component, options = {}) {
  const {
    renderOn = CONNECTED,
    elementName = getElementName(component)
  } = options

  return class CustomComponentElement extends HTMLElement {
    static get elementName() {
      return elementName
    }

    static get component() {
      return component
    }

    createdCallback() {
      if (renderOn === CREATED) {
        this.render()
      }
    }

    connectedCallback() {
      if (renderOn === CONNECTED) {
        this.render()
      }
    }

    render() {
      const children = getChildren(this.childNodes)
      const props = getProps(this, component.propTypes)
      const output = React.createElement(component, props, children)
      ReactDOM.render(output, this, () => {
        const detail = {component, props, children}
        this.dispatchEvent(new CustomEvent('render', {detail, bubbles: true}))
        replaceWith(this, this.childNodes)
      })
    }
  }
}

export {CONNECTED, CREATED}
