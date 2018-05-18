import createComponentClass from './create-component-class'

export default function registerComponent(Component, options) {
  const CustomComponent = createComponentClass(Component, options)
  let {elementName} = CustomComponent
  if (!window.customElements.get(elementName)) {
    window.customElements.define(elementName, CustomComponent)
  }
  return CustomComponent
}
