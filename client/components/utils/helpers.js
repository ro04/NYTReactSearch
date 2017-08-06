// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// This variable will be pre-programmed with our authentication key
const authKey = "0fad6d0e41b5487fb545737ccf2401ae";

// Counter to keep track of article numbers as they come in
const articleCounter = 0;

// Helper functions for making API Calls
const helpers = {
    runQuery(searchTerm, startYear, endYear) {
        // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
        const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
        // The AJAX function uses the queryURL and GETS the JSON data associated with it.
        // The data then gets stored in the variable called: "data"
        const queryURL = queryURLBase + searchTerm + "&begin_date" + startYear + "0101" + "&end_date" + endYear + "0101".trim();
        //console.log(queryURL);
        return axios.get(queryURL).then (function (data) {
            //console.log(data);
            return data.data.response.docs; 
        });
    },
            
    // This function hits our own server to retrieve the record of saved results
    getSaved() {
        return axios.get("/api");
    },

    // This function posts new searches to our database.
    postSaved(title, date, url) {
        return axios.post("/api", 
            { 
                title: title,
                date: date,
                url: url
            }
        );
    },

    // This function deletes the saved article from our database.
    deleteSaved(title, date, url) {
        return axios.post("/deleteArticle", 
            {
                title: title, 
                date: date, 
                url: url
            }
        );
    },
};

export default helpers;