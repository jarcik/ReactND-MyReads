import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        //book to render
        book: PropTypes.object.isRequired,
        //function to update the book on the server
        onUpdateBook: PropTypes.func.isRequired
    };

    render() {
        return (
                <li>
                <div className="book">
                    <div className="book-top">
                        {
                            this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail && (
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+ this.props.book.imageLinks.smallThumbnail +'")' }}></div>
                            )
                        }
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.props.onUpdateBook(this.props.book, event.target.value)} value={this.props.book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    {
                        this.props.book.authors && (
                            <div className="book-authors">{this.props.book.authors.join(', ')}</div>
                        )
                    }
                </div>
                </li>
        )
    }
} 

export default Book