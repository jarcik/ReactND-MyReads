import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import { Link, Route } from 'react-router-dom';
import Search from './Search';

const states = [{
  title: 'Currently reading',
  state: 'currentlyReading'
},
{
  title: 'Want to read',
  state: 'wantToRead'
},
{
  title: 'Read',
  state: 'read'
}];


class BooksApp extends Component {
  state = {
    //books in shelves
    books: [],
    //search query
    query: '',
    //searched books
    searched: []
  }

  //update shelf for a book on server
  updateBook = (b, shelve) => {
    //update book on server
    BooksAPI.update(b, shelve).then((res) => {
      //shelf for updated book
      b.shelf = shelve;
      //update component state
      this.setState((currentState) => ({
        books: currentState.books.filter(book => book.id !== b.id).concat(b)
      }));
    })
  }

  //life cycle of component - init of the component
  componentDidMount = () => {
    //get all books from server
    BooksAPI.getAll().then((books) => {
      //set fetched books to state of the component
      this.setState({
        books: books
      })
    })
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">

        <Route path='/search' render={() => (
          <Search onUpdateBook={this.updateBook} books={this.state.books} />
        )}
        />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {
                  states.map((state) => (
                    <Shelf
                      title={state.title}
                      key={state.state}
                      books={books.filter((book) => book.shelf === state.state)}
                      onUpdateBook={this.updateBook} />
                  ))
                }
            </div>
            <div className="open-search">
              <Link to="/search" className="search-link">Search</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
