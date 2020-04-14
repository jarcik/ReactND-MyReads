import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {
    static propTypes = {
        //function for updating the book on server
        onUpdateBook: PropTypes.func.isRequired,
        //books on shelves for getting the state 'shelf' of the book
        books: PropTypes.array.isRequired
    };

    state = {
        //serached books
        searched: [],
        //query by the user
        query: '',
        //is there error from the server?
        error: false
    };

    //search for the books on the server
    search = (event) => {
        //get searched text
        let query = event.target.value.trim();
        //update the state of the component with the query
        this.setState({query: query});
        //empty string? do not search
        if(query === '') {
            this.setState({
                searched: [],
                error: false
            });
            return;
        }
        //serach for the books
        BooksAPI.search(query)
        .then((result) => {
            //results?
            if(result && result.length > 0) {   
                //assign shelve for the books             
                result.forEach(b => {
                    let q = this.props.books.find((q) => q.id === b.id);
                    q ? b.shelf = q.shelf : b.shelf = 'none';
                });
                //set state for result
                this.setState({searched: result, error: false});
            } else {
                //no reults - with error text
                this.setState({searched: [], error: true});
            }
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.search} />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searched && this.state.searched.length > 0 &&
                            this.state.searched.map((b) => (
                                <Book key={b.id} book={b} onUpdateBook={this.props.onUpdateBook} />
                            ))
                        }
                    </ol>
                    {this.state.error && (
                        <p>No book found. Please try it again :)</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Search