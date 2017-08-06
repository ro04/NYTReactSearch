import { Component } from 'react';

// Requiring our helper for saving data
import helpers from "../utils/helpers";

export class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.saved !== this.state.saved && this.state.saved.length !== 0) {
            console.log('componentDidUpdate');
            /*helpers.getSaved().then(function(response) {
                //console.log(response);
                if (response !== this.state.saved) {
                    //console.log("Saved Articles ", response.data);
                     this.setState({ saved: response.data });
                    //console.log("Saved Articles Array ", this.state.saved);
                }
            }.bind(this));*/
        }
    }
  
    // ==== Post the Save Article to the db =====
    saveArticle(title, date, url) {
        helpers.postSaved(title, date, url).then(function (response) {
            //console.log(data);
            // Get the latest saved articles.
            helpers.getSaved().then(function(response) {
                //console.log(response);
                if (response !== this.state.saved) {
                    //console.log("Saved Articles ", response.data);
                     this.setState({ saved: response.data });
                    //console.log("Saved Articles Array ", this.state.saved);
                }
            }.bind(this));
        }.bind(this));
    }

    render(){
        return (
            <div className="col-sm-12">
                <br /> 
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">
                            <strong>
                                <i className="fa fa-list-alt"></i>Results
                            </strong>
                        </h3>
                    </div>
                    <br />
                    {this.props.results.map(function(search, i){
                        return(
                            <div key={i} className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        {search.headline.main}
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <h5 className="panel-date">
                                        {search.pub_date}
                                    </h5>
                                    <a href={search.web_url}>
                                        {search.web_url}
                                    </a>
                                    <button onClick={() => this.saveArticle(search.headline.main, search.pub_date, search.web_url)} className="btn btn-primary" id="save-article">Save</button>
                                </div>
                            </div> 
                        );
                    }.bind(this))};
                </div>
            </div>
        )
    }
};