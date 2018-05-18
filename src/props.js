import invariant from 'invariant'
import PropTypes from 'prop-types'

const propMap = {
  'class': 'className'
}

export default function getProps(element, propTypes) {
  const props = getRawProps(element)
  return propTypes ? coerceTypedProps(props, propTypes) : props
}

export function getRawProps(element) {
  return [...element.attributes].reduce((props, {name, value}) => {
    const prop = propMap[name] || name
    props[prop] = value
    return props
  }, {})
}

export function coerceTypedProps(props, propTypes) {
  invariant(props && typeof props === 'object', 'coerceTypedProps() expects a props object')
  invariant(propTypes && typeof propTypes === 'object', 'coerceTypedProps() expects a propTypes object')
  return [...Object.entries(propTypes)]
    .filter(([prop, type]) => {
      return props.hasOwnProperty(prop)
    })
    .map(([prop, type]) => {
      let value = props[prop]
      value = coerceTypedValue(value, type)
      return [prop, value]
    })
    .reduce((coerced, [prop, value]) => {
      coerced[prop] = value
      return coerced
    }, {})
}

export function coerceTypedValue(value, type) {
  invariant(typeof value === 'string', 'coerceTypedValue() expects a string')
  switch (type) {
    case PropTypes.bool:
      return value === 'true'
    case PropTypes.number:
      return Number(value)
    case PropTypes.string:
      return value
    // TODO: handle arrays, shapes, etc.
  }
}
