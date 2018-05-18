export default function replaceWith(element, nodes) {
  const fragment = document.createDocumentFragment()
  for (const node of nodes) {
    fragment.appendChild(node)
  }
  element.parentNode.insertBefore(fragment, element)
  element.remove()
}
