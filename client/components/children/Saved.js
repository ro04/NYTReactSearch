import { Component } from 'react';

// Requiring our helper for updating data
import helpers from "../utils/helpers";

export class Saved extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.saved !== this.state.saved && this.state.saved.length !== 0) {
            console.log('componentDidUpdate');
        }
    }

    deleteArticle(title, date, url){
        helpers.deleteSaved(title, date, url).then(function(response) {
            //console.log("updated");
            // Get the latest saved articles.
            helpers.getSaved().then(function(response) {
                //console.log(response);
                if (response !== this.state.saved) {
                    //console.log("Saved Articles ", response.data);
                    this.setState({ saved: response.data });
                    //console.log("Saved Articles Array ", this.state.saved);
                }
            }.bind(this));
        }.bind(this))
    }

    render(){
        return(
            <div className="col-sm-12">
                <br /> 
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">
                            <strong>
                                <i className="fa fa-list-alt"></i>Search History
                            </strong>
                        </h3>
                    </div>
                    <br />
                    {Array.isArray(this.props.saved) && this.props.saved.map(function(search, i) {
                        return(
                            <div key={i} className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        {search.title}
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <h5 className="panel-date">
                                        {search.date}
                                    </h5>
                                    <a href={search.web_url}>
                                        {search.url}
                                    </a>
                                    <button onClick={() => this.deleteArticle(search.title, search.date, search.url)} className="btn btn-primary" id="delete-article">Delete</button>
                                </div>
                            </div> 
                        );
                    }.bind(this))};
                </div>
            </div>
        )
    };
}