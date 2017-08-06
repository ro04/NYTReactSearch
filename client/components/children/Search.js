// Include React
import { Component } from 'react'

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_term: "",
            start_year: 0,
            end_year: 0
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
    }

    //=====This function will respond to the user input=====
    handleChange(event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }

    // ====== This function will respond to the user clicking the seach button ======
    searchClick(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
        event.preventDefault();
        // Set the parent to have the search term, start year, and end year
        this.props.setTerm(this.state.search_term, this.state.start_year, this.state.end_year);
   }
    

    // ===== This function will respond to the user clicking the clear button =====
    clearClick(event) {
        event.preventDefault();
        this.setState(
            {
                search_term: "",
                start_year: 0,
                end_year: 0
            }
        )
    }
  
    // ===============================================================================
    render() {
        return (
            <div className="col-sm-12">
                <br />
                {/*First panel is for handling the search parameters */}
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">
                            <strong>
                                <i className="fa fa-list-alt"></i>Search Paramaters
                            </strong>
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/*Here we create an HTML Form for handling the inputs*/}
                        <form role="form">
                            {/*
                                Here we create the text box for capturing the search term
                                Also note how each has an onChange event associated with our handleChange event.
                            */}
                            <div className="form-group">
                                <label htmlFor="search">Search Term:</label>
                                <input value={this.state.search_term} type="text" className="form-control" id="search_term" onChange={this.handleChange} required/>
                            </div>

                            {/*
                                Here we capture the Start Year Parameter
                                Also note how each has an onChange event associated with our handleChange event.
                            */}
                            <div className="form-group">
                                <label htmlFor="start-year">Start Year (Optional):</label>
                                <input value={this.state.start_year} type="text" className="form-control" id="start_year" onChange={this.handleChange} required/>
                            </div>

                            {/*
                                Here we capture the End Year Parameter 
                                Also note how each has an onChange event associated with our handleChange event.
                            */}
                            <div className="form-group">
                                <label htmlFor="end-year">End Year (Optional):</label>
                                <input value={this.state.end_year} type="text" className="form-control" id="end_year" onChange={this.handleChange} required/>
                            </div>

                                {/*
                                Here we have our final submit button 
                                Note how we have an onClick event associated with our handleClick function.
                                this.handleClick references the handleClick function defined above our render function
                                */}
                            <button className="btn btn-default" id="run-search" type="submit" onClick={this.searchClick}><i className="fa fa-search"></i> Search</button>
                            <button className="btn btn-default" id="clear-all" type="submit" onClick={this.clearClick}><i className="fa fa-trash"></i> Clear</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};