export default function getElementName(component, defaultName) {
  return component.name
    .replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}-${b}`)
    .toLowerCase()
}
