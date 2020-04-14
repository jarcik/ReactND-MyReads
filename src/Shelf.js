import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Shelf extends Component {
    static propTypes = {
        //books to render
        books: PropTypes.array.isRequired,
        //funciton to update the book on server
        onUpdateBook: PropTypes.func.isRequired,
        //title of the shelve
        title: PropTypes.string.isRequired
    };
   
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((b) => (
                        <Book 
                            key={b.id} 
                            book={b}                            
                            onUpdateBook={this.props.onUpdateBook} />
                    ))}
                </ol>
                </div>
            </div>
        )
    }
} 

export default Shelf