import React, { Component } from 'react'

import Category from './Category'
import Infinite from 'react-infinite'
import ListItem from './ListItem'
import DetailView from './DetailView'

class Content extends Component {

  componentDidMount() {
    const cont = document.getElementById("content")
    const padding =  parseInt(window.getComputedStyle(cont, null).getPropertyValue('padding-top'))
    const listheight = cont.offsetHeight - padding - 10
    this.props.actions.changeListHeight(listheight)
    window.addEventListener("resize", this.resizeHandler.bind(this));
  }

  componentWillMount() {
    this.props.actions.fetchList(this.props.content.category, 1)
  }

  resizeHandler() {
    const cont = document.getElementById("content")
    const padding =  parseInt(window.getComputedStyle(cont, null).getPropertyValue('padding-top'))
    const listheight = cont.offsetHeight - padding - 10
    this.props.actions.changeListHeight(listheight)
  }

  nextList() {
    if (this.props.content.list.next != null) {
      this.props.actions.nextList(this.props.content.list.next)
    } else {
      //remove spinner
    }
  }

  elementInfiniteLoad() {
    return (
      <div className={"loader"}>
      </div>
    )
  }

  render () {
    return(
      <div className="content-container">
        <div id="content" className="content">
          <DetailView
            detail={this.props.content.detail}
            actions={this.props.actions}
            />
          <Category content={this.props.content} actions={this.props.actions}/>
          <Infinite
            className="list"
            containerHeight={this.props.content.listheight}
            preloadBatchSize={this.props.content.listheight}
            elementHeight={101}
            onInfiniteLoad={this.nextList.bind(this)}
            infiniteLoadBeginEdgeOffset={this.props.content.listheight}
            loadingSpinnerDelegate={this.elementInfiniteLoad()}
            >
            {
              (typeof this.props.content.list.results !== 'undefined')?
              this.props.content.list.results.map((item, idx) => {
                return <ListItem
                  key={idx}
                  idx={idx}
                  category={this.props.content.category}
                  item={item}
                  actions={this.props.actions}
                  />
              })
              :""
            }
          </Infinite>
        </div>
      </div>
    )
  }
}

export default Content