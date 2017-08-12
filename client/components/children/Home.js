import React from 'react'
import { IndexLink, Link } from "react-router";
import { Main } from "../Main";
import { Search } from "./Search";
import { Results } from "./Results";
import { Saved } from "./Saved";

export class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            collapsed: true
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-12">
                    {/* Navigation  */}
                    <nav id="mainNav" className="navbar navbar-default navbar-fixed-top" role="navigation">
                        {/* Brand and toggle get grouped for better mobile display  */}
                        <div className="navbar-header page-scroll">
                            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse}>
                                <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                            </button>
                            <a className="navbar-brand page-scroll" href="#page-top">Home</a> 
                        </div>

                        {/* Collect the nav links, forms, and other content for toggling  */}
                        <div className="collapse navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nav">
                                {/* Hidden li included to remove active class from about link when scrolled up past about section  */}
                                <li className="hidden"> 
                                    <a className="page-scroll" href="#page-top"></a> 
                                </li> 
                                <li className={Search} id="scraped-art">
                                    <Link to = "search" className="page-scroll" data-target="#search" onClick={this.toggleCollapse}>Search</Link>
                                </li>
                                <li className={Results} id="scraped-art">
                                    <Link to = "results" className="page-scroll" data-target="#results" onClick={this.toggleCollapse}>Results</Link>
                                </li>
                                <li className={Saved} id="saved-art">
                                    <Link to = "saved" className="page-scroll" data-target="#saved" onClick={this.toggleCollapse}>Saved Articles</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {/* Jumbotron Section  */}
                    <section id="jumbo" className="jumbo-section">  
                        <div className="jumbotron"> 
                            <h1 className="text-center"><strong> 
                                <i className="fa fa-newspaper-o"></i>New York Times Search</strong> 
                            </h1> 
                            <p className="text-center"> 
                                <em>Enter a topic, start year, and end year to receive 10 articles relating to your topic.</em> 
                                <em>You can also save 5 articles to your search history for future reading.</em>
                            </p> 
                        </div> 
                    </section>
                </div>
            </div>
        )
    }
};