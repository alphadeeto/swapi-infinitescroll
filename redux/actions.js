var attrmap = {
  people: {
    identifier:"name",
    simpleinfo:[
      "gender",
      "birth_year",
    ],
    maininfo:[
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
    ],
    reference:[
      "homeworld",
      "films",
      "species",
      "vehicles",
      "starships",
    ],
    props:[
      "created",
      "edited",
      "url",
    ]
  },

  planets: {
    identifier:"name",
    simpleinfo:[
      "diameter",
      "population",
    ],
    maininfo:[
      "rotation_period",
      "orbital_period",
      "climate",
      "gravity",
      "terrain",
      "surface_water",
    ],
    reference:[
      "residents",
      "films",
    ],
    props:[
      "created",
      "edited",
      "url",
    ]
  },

  starships: {
    identifier:"name",
    simpleinfo:[
      "model",
      "manufacturer",
    ],
    maininfo:[
      "cost_in_credits",
      "length",
      "max_atmosphering_speed",
      "crew",
      "passengers",
      "cargo_capacity",
      "consumables",
      "hyperdrive_rating",
      "MGLT",
      "starship_class",
    ],
    reference:[
      "pilots",
      "films",
    ],
    props:[
      "created",
      "edited",
      "url",
    ]
  },

  vehicles: {
    identifier:"name",
    simpleinfo:[
      "model",
      "manufacturer",
    ],
    maininfo:[
      "cost_in_credits",
      "length",
      "max_atmosphering_speed",
      "crew",
      "passengers",
      "cargo_capacity",
      "consumables",
      "vehicle_class",
    ],
    reference:[
      "pilots",
      "films",
    ],
    props:[
      "created",
      "edited",
      "url",
    ]
  },

  films: {
    identifier:"title",
    simpleinfo:[
      "director",
      "producer",
    ],
    maininfo:[
      "episode_id",
      "opening_crawl",
      "release_date",
    ],
    reference:[
      "characters",
      "planets",
      "starships",
      "vehicles",
      "species",
    ],
    props:[
      "created",
      "edited",
      "url",
    ]
  },

  species: {
    identifier:"name",
    simpleinfo:[
      "classification",
      "designation",
    ],
    maininfo:[
      "average_height",
      "skin_colors",
      "hair_colors",
      "eye_colors",
      "average_lifespan",
      "language",
    ],
    reference:[
      "homeworld",
      "people",
      "films",
    ],
    props:[
      "created",
      "edited",
      "url",
    ]
  },
}

var refcat = {
      homeworld: "planets",
      films: "films",
      species: "species",
      vehicles: "vehicles",
      starships: "starships",
      residents: "people",
      pilots: "people",
      characters: "people",
      planets: "planets",
      people: "people",
}

let actions = {

  changeCategory: function(category) {
    return {
      type: 'CHANGE_CATEGORY',
      category: category
    }
  },

  loadList: function(data) {
    return {
      type: 'LOAD_LIST',
      list: data
    }
  },

  appendList: function(data) {
    return {
      type: 'APPEND_LIST',
      list: data
    }
  },

  clearList: function() {
    return {
      type: 'CLEAR_LIST'
    }
  },

  showDetail: function() {
    return {
      type: 'SHOW_DETAIL'
    }
  },

  hideDetail: function() {
    return {
      type: 'HIDE_DETAIL'
    }
  },

  loadDetail: function(data) {
    return {
      type: 'LOAD_DETAIL',
      detail: data
    }
  },

  clearDetail: function() {
    return {
      type: 'CLEAR_DETAIL'
    }
  },

  updateRef: function(key, idx, val) {
    return {
      type: 'UPDATE_REF',
      key: key,
      idx: idx,
      val: val
    }
  },

  fetchDetail: function(url, category) {
    return (dispatch) => {
      dispatch(actions.clearDetail())
      dispatch(actions.showDetail())
      fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        json.category=category
        /*CHANGE REF DATA STRUCTURE*/
        attrmap[category].reference.map((key) => {//iterate all ref attributes
          if (Array.isArray(json[key])) {//if the value is an array
            json[key].map((val, idx) => {
              json[key][idx] = {url:val, label:"loading...", cat:refcat[key]}
            })
          } else {
            let val = json[key]
            json[key] = []
            json[key][0] = {url:val, label:"loading...", cat:refcat[key]}
          }
        })

        dispatch(actions.loadDetail(json))

        attrmap[category].reference.map((key) => {//iterate all ref attributes
            json[key].map((val, idx) => {
              fetch(val.url)
              .then(response => {
                return response.json()
              })
              .then(resp => {
                let label = (typeof resp.name !== 'undefined')?resp.name:resp.title
                dispatch(actions.updateRef(key, idx, {url:val.url, label:label, cat:refcat[key]}))
              })
            })
          })

      })
    }
  },

  fetchList: function(category, page = 1) {
    return (dispatch) => {
      dispatch(actions.clearList())
      dispatch(actions.clearDetail())
      dispatch(actions.hideDetail())
      fetch("http://swapi.co/api/" + category + "/?page=" + page)
      .then(response => {
        return response.json()
      })
      .then(json => dispatch(actions.loadList(json)))
    }
  },

  nextList: function(url) {
    return (dispatch) => {
      fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => dispatch(actions.appendList(json)))
    }
  },

  changeListHeight: function(listheight) {
    return {
      type: 'CHANGE_LISTHEIGHT',
      listheight: listheight
    }
  },

}

export default actions
