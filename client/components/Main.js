// Include React
import { Component } from 'react'

// Include Children
import { Search } from "./children/Search";
import { Results } from "./children/Results";
import { Saved } from "./children/Saved";

// Requiring our helper for making API calls
import helpers from "./utils/helpers";

export class Main extends Component {
    // ===== Here we set a generic state associated with the text being searched for =====
    constructor(props) {
        super(props)
        this.state = {
            search_term: "",
            start_year: 0,
            end_year: 0,
            results: [],
            saved: []
        }

        this.setTerm = this.setTerm.bind(this);
      
    }

    // ===== The moment the page renders get the Saved articles ======
    componentDidMount() {
        console.log('componentDidMount');
        // Get the latest saved articles.
        helpers.getSaved().then(function(response) {
            //console.log(response);
            if (response !== this.state.saved) {
                //console.log("Saved Articles ", response.data);
                this.setState({ saved: response.data });
                //console.log("Saved Articles Array ", this.state.saved);
            }
        }.bind(this));
    }

    // ===== If the component changes (i.e. if a search is entered)... ===== 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.search_term !== this.state.search_term) {
            console.log('componentDidUpdate');
            // Run the query 
            helpers.runQuery(this.state.search_term, this.state.start_year, this.state.end_year).then(function(NYTdata) {
                if(NYTdata !== this.state.results) {
                    this.setState({results: NYTdata});
                    //console.log(this.state.results); 
                };
            }.bind(this));
        };
    }

    //===== Change the state of the search paramaters ================
    setTerm(searchTerm, startYear, endYear) {
        this.setState({search_term: searchTerm});
        this.setState({start_year: startYear});
        this.setState({end_year: endYear});
    };

    //===============================================================
    render() {
        return (
            <div className="container">
                {/*Row for Searching New York Times */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="jumbotron">
                            <h1 className="text-center"><strong>
                                <i className="fa fa-newspaper-o"></i>New York Times Search</strong>
                            </h1>
                            <p className="text-center">
                                <em>Enter a topic, start year, and end year to receive 10 articles relating to your topic.</em>
                                <em>You can also save 5 articles to your search history for future reading.</em>
                            </p>
                        </div>
                        <br />
                        <div className="article-search">
                            <Search setTerm={this.setTerm} />
                        </div>
                        <div className="article-results"> 
                            <Results results={this.state.results}/>  
                        </div> 
                        <div className="article-saved"> 
                            <Saved saved={this.state.saved}/>   
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
};