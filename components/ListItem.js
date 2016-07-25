import React, { Component } from 'react'
import {attrmap} from './AttrMap'

class ListItem extends Component {

  showDetail() {
    this.props.actions.fetchDetail(this.props.item.url, this.props.category)
  }

  render() {

    return (
      <div className="item" onClick={this.showDetail.bind(this)}>
        <div className="id">{this.props.idx + 1}</div>
        <div className="label">{this.props.item[attrmap[this.props.category].identifier]}</div>
        <ul>
        {
          attrmap[this.props.category].simpleinfo.map((key) => {
            return (
              <li key={key} className="attr">
                <span className="key">{key.replace("_", " ")}</span>
                <span className="val">{this.props.item[key]}</span>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }

}

export default ListItem
