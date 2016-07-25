let categoryReducer = function(content = "", action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return Object.assign({}, content, {
        category: action.category
      });
    
    case 'LOAD_LIST':
      return Object.assign({}, content, {
        list: action.list
      });

    case 'APPEND_LIST':
      return Object.assign({}, content, {
        list: Object.assign({}, content.list, {
          results: [...content.list.results, ...action.list.results],
          next: action.list.next,
          previous: action.list.previous,
          count: action.list.count,
        })
      });

    case 'CLEAR_LIST':
      return Object.assign({}, content, {
        list: Object.assign({}, content.list, {
          results: [],
          next: null,
          previous: null,
          count: 0,
        })
      });

    case 'SHOW_DETAIL':
      return Object.assign({}, content, {
        detail: Object.assign({}, content.detail, {
          show: true
        })
      });

    case 'HIDE_DETAIL':
      return Object.assign({}, content, {
        detail: Object.assign({}, content.detail, {
          show: false
        })
      });

    case 'LOAD_DETAIL':
      return Object.assign({}, content, {
        detail: Object.assign({}, content.detail, {
          data: action.detail
        })
      });

    case 'CLEAR_DETAIL':
      return Object.assign({}, content, {
        detail: Object.assign({}, content.detail, {
          data: {}
        })
      });

    case 'UPDATE_REF':
      return Object.assign({}, content, {
        detail: Object.assign({}, content.detail, {
          data: Object.assign({}, content.detail.data, {
            [action.key]: Object.assign({}, content.detail.data[action.key], {
              [action.idx]: action.val
            })
          })
        })
      })

    case 'CHANGE_LISTHEIGHT':
      return Object.assign({}, content, {listheight: action.listheight});

    default: 
      return content;
  }
}

export default categoryReducer
