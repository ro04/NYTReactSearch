import { Component } from 'react';

// Requiring our helper for saving data
import helpers from "../utils/helpers";

export class Results extends Component {
        constructor(props) {
        super(props)
        this.state = {
             saved: []
        }
        this.saveArticle = this.saveArticle.bind(this);
    }
 
    // ==== Post the Save Article to the db =====
    saveArticle(title, date, url) {
        helpers.postSaved(title, date, url).then(function (response) {
            //console.log(response);
            // Get the latest saved articles.
            helpers.getSaved().then(function(response) {
                console.log(response);
                if (response !== this.setState.saved) {
                    console.log("Saved Articles ", this.state.saved);
                     this.setState({ saved: response.data });
                     this.props.setSavedArticles(this.state.saved);
                    console.log("Saved Articles Array ", this.state.saved);
                }
            }.bind(this));
        }.bind(this));

        //Show modal 
        $('#saveArticleModal').modal();
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
                                    <a href={search.web_url}>
                                        {search.web_url}
                                    </a>
                                    <div class="col-md-4 center-block"> 
                                        <button onClick={() => this.saveArticle(search.headline.main, search.pub_date, search.web_url)} className="btn btn-primary center-block" id="save-article">Save</button>
                                    </div>
                                </div>
                            </div> 
                        );
                    }.bind(this))};
                </div>

                {/* Modal  */}
                    <div id="saveArticleModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            {/* Modal content */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" id="article-saved-btn" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Your article is saved</h4>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
};