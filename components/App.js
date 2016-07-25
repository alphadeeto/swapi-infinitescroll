
import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'

import actions                  from '../redux/actions'

import Header                   from './Header'
import Content                  from './Content'

class App extends Component {

  render() {

    return (
      <div>
        <Header content={this.props.content} actions={this.props.actions}/>
        <Content content={this.props.content} actions={this.props.actions}/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
