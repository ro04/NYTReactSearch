import { Component } from 'react';

// Requiring our helper for saving data
import helpers from "../utils/helpers";

export class Results extends Component {
    saveArticle(title, date, url) {
        helpers.postSaved(title, date, url).then(function (data) {
            //console.log(data);
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