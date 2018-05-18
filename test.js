import React from 'react'
import PropTypes from 'prop-types'
import {registerComponent} from '.'

class CustomOuter extends React.Component {
  static get propTypes() {
    return {
      m: PropTypes.number
    }
  }

  render() {
    const {m, children} = this.props
    return (
      <div className={`border m-${m}`}>
        {children}
      </div>
    )
  }
}

class CustomInner extends React.Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      active: false
    }
  }

  static get propTypes() {
    return {
      p: PropTypes.number
    }
  }

  toggle() {
    console.warn('toggle:', this.state)
    this.setState({active: !this.state.active})
  }

  render() {
    const {p, children} = this.props
    const {active} = this.state
    return (
      <span className={`border rounded-1 p-${p}`}>
        <button type='button' onClick={this.toggle} ref={b => console.warn('button', b)}>
          click me
        </button>
        <div hidden={!active}>
          {children}
        </div>
      </span>
    )
  }
}


registerComponent(CustomInner)
registerComponent(CustomOuter)

document.body.addEventListener('render', e => {
  console.warn('render', e.target, e.detail)
})
