# &lt;custom-component&gt;
This is a thing that might make it easy to create and register [custom
elements] that render as React components and pass their attributes as props.
In other words, you can express React in plain old HTML, and provide
`propTypes` to coerce attributes into the right types, such as numbers and
booleans.

## An example
```html
<my-component widgets="4" boom>
  This can be <a href="#">mixed content</a>, even
  <super-em>other components!</super-em>
</my-component>
```

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import {registerComponent} from 'custom-component'

// it works with classes
registerComponent(class MyComponent extends React.Component {
  static get propTypes() {
    return {
      widgets: PropTypes.number,
      whatever: PropTypes.bool
    }
  }

  render() {
    const {widgets = 0, boom, children} = this.props
    return (
      <div className='MyComponent'>
        <h1>Widgets: ${widgets}</h1>
        {children}
        {boom ? <strong>boom!</strong> : null}
      </div>
    )
  }
})

// and it works with functional (stateless) components, though
// you will need to pass an elementName if your "component" is
// an anonymous function:
registerComponent(({children}) => <em className='super'>{children}</em>, {
  elementName: 'super-em'
})
```

With any luck, you'd end up with the following in the DOM:

```html
<div class="MyComponent">
  <h1>Widgets: 4</h1>
  This can be <a href="#">mixed content</a>, even
  <em class="super">other components!</em>
  <strong>boom!</strong>
</div>
```

## Why?
Maybe you're working in a "legacy" environment in which you lack the ability to
execute JS server-side?

## Warning
This is, as should be obvious from the lack of documentation, an experiment.
**Please don't use it in a production environment.**

- [x] `createComponentClass(ReactComponent, options)` creates a custom element
  class that can be registered with `customElements.define()`.
- [x] `registerComponent(ReactComponent)` registers `<react-component>`
  automagically.
- [x] Once rendered, component output replaces the custom element in the DOM.
- [ ] Tests?
- [ ] Figure out how to work around the issue of rendering elements "owned"
  (already rendered) by a higher-level component.
- [ ] The highest-level component is assumed to manage state, and is
  responsible for re-rendering.
- [ ] Maybe [portals] are the thing? ¯\\\_(ツ)_/¯
- [ ] 💰


[custom elements]: https://developers.google.com/web/fundamentals/web-components/customelements
[portals]: https://reactjs.org/docs/portals.html
