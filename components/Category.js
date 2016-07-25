import React, { Component } from 'react'

class Category extends Component {

  changeCategory(cat) {
    this.props.actions.changeCategory(cat)
    if (cat != this.props.content.category) this.props.actions.fetchList(cat, 1)
  }

  render () {
    var cats = [
      "planets",
      "starships",
      "vehicles",
      "people",
      "films",
      "species",
    ]

    return(
      <ul className="category">
        {cats.map((cat) => {
          var isActive = (this.props.content.category == cat)?"active item":"item"
          return <li key={cat} className={isActive} onClick={this.changeCategory.bind(this, cat)}>{cat}</li>
        })}
      </ul>
    )
  }
}

export default Category