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
    this.state = {
      active: false
    }
  }

  static get propTypes() {
    return {
      p: PropTypes.number,
      small: PropTypes.bool,
      prompt: PropTypes.string
    }
  }

  toggle() {
    this.setState({active: !this.state.active})
  }

  render() {
    const {active} = this.state
    const {
      p,
      small,
      prompt = 'click me',
      children
    } = this.props
    return (
      <span className={`border rounded-1 p-${p}${small ? ' text-small' : ''}`}>
        <button type='button' onClick={e => this.toggle()}>
          {prompt}
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
