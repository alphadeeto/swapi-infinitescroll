import React, { Component } from 'react'
import {attrmap} from './AttrMap'

class DetailView extends Component {

  hideDetail() {
    this.props.actions.hideDetail()
    this.props.actions.clearDetail()
  }

  showDetail(val, cat) {
    this.props.actions.fetchDetail(val.url, val.cat)
  }

  render() {
    if (this.props.detail.show) {
      if (Object.keys(this.props.detail.data).length === 0 && this.props.detail.data.constructor === Object) {
        return ( 
          <div className="detail">
            <div className="header">
              Detail View
              <div className="closebutton" onClick={this.hideDetail.bind(this)}>close</div>
            </div>
            <div className="container">
              <div className="loader"></div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="detail">
            <div className="header">
              Detail View
              <div className="closebutton" onClick={this.hideDetail.bind(this)}>close</div>
            </div>
            <div className="container">
              <div className="label">{this.props.detail.data[attrmap[this.props.detail.data.category].identifier]}</div>
              <ul className="simple">
              {
                attrmap[this.props.detail.data.category].simpleinfo.map((key) => {
                  return (
                    <li key={key} className="attr">
                      <span className="key">{key.replace("_", " ")}</span>
                      <span className="val">{this.props.detail.data[key]}</span>
                    </li>
                  )
                })
              }
              </ul>
              <ul className="main">
              {
                attrmap[this.props.detail.data.category].maininfo.map((key) => {
                  return (
                    <li key={key} className="attr">
                      <span className="key">{key.replace("_", " ")}</span>
                      <span className="val">{this.props.detail.data[key]}</span>
                    </li>
                  )
                })
              }
              </ul>
              <ul className="ref">
              {
                attrmap[this.props.detail.data.category].reference.map((key) => {
                  return (
                    <li key={key} className="attr">
                      <span className="key">{key.replace("_", " ")}</span>
                      {
                        Object.keys(this.props.detail.data[key]).map((key2, idx) => {
                          let val = this.props.detail.data[key][key2]
                          return(<div><span key={idx} className="val" onClick={this.showDetail.bind(this, val)}>{val.label}</span></div>)
                        })
                      }
                    </li>
                  )
                })
              }
              </ul>
              <ul className="props">
              {
                attrmap[this.props.detail.data.category].props.map((key) => {
                  return (
                    <li key={key} className="attr">
                      <span className="key">{key.replace("_", " ")}</span>
                      <span className="val">{this.props.detail.data[key]}</span>
                    </li>
                  )
                })
              }
              </ul>
            </div>
          </div>
        )
      }
    } else {
      return(<div className="detail hidden"></div>)
    }
  }

}

export default DetailView
