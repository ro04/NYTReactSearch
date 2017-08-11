import React from 'react'

// Requiring our helper for updating data
import helpers from "../utils/helpers";

export class Saved extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: []
        }
        this.deleteArticle = this.deleteArticle.bind(this);
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
                    this.props.setSavedArticles(this.state.saved);
                    //console.log("Saved Articles Array ", this.state.saved);
                }
            }.bind(this));
        }.bind(this));

         //Show modal 
        $('#deleteArticleModal').modal();
    }

    render(){
        return(
            <section id="saved" className="saved-section">
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
                                        <a href={search.web_url}>
                                            {search.url}
                                        </a>
                                        <div className="col-md-4 center-block"> 
                                            <button onClick={() => this.deleteArticle(search.title, search.date, search.url)} className="btn btn-primary center-block" id="delete-article">Delete</button>
                                        </div>
                                    </div>
                                </div> 
                            );
                        }.bind(this))};
                    </div>

                    {/* Modal  */}
                    <div id="deleteArticleModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            {/* Modal content */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" id="article-saved-btn" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Your article is deleted</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    };
}