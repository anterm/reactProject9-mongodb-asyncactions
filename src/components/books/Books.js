import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as BookActions from '../../actions/books'

import Book from './book/Book'
import styles from './books.css'

class Books extends Component {
  static fetchData(dispatch, params) {
    return dispatch(BookActions.fetch())
  };
  
  componentDidMount() {
    const { actions, books } = this.this.props
    
    if(books.status == null) {
      actions.books.fetch()
    }
  }
  
  render() {
    const { books } = this.props

    return <div className={styles.block}>
      <span className={styles.title}>
        Список книг ({books.value.length}):
      </span>
      {this.renderStatus()}
    </div>
  }
  
  renderStatus = () => {
    const { books, actions } = this.props
    
    switch(books.status) {
      case 'pending':
        return <span className={styles.pending}>Загрузка...</span>
        
      case 'rejected':
        return <span className={styles.error}>Произошла ошибка</span>
      
      case 'fulfilled':
        const bookHtml = books.value.map(book => {
          return <Book 
            key={book._id}
            book={book}
            actions={actions} />
        })

        return <div>
          <table className={styles.book_list}>
            <tbody>{bookHtml}</tbody>
          </table>
          <input ref="name" placeholder="Название" />
          <input ref="author" placeholder="Автор" />
          <input ref="price" placeholder="Цена" />
          <a href="#" onClick={this.add}>Добавить книгу</a>
        </div>
        
      default:
        null
    }
  };
  
  add = () => {
    const { name, author, price } = this.refs
    if(!name.value || !author.value || !price.value)
      return
    
    this.props.actions.books.add({
      name: name.value,
      author: author.value,
      price: price.value
    })
    name.value = author.value = price.value = ""
  };
}


export default connect(
  state => ({ books: state.books }),
  dispatch => ({
    actions: { 
      books: bindActionCreators(BookActions, dispatch) 
    }
  })
)(Books)