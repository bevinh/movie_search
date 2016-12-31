var App = (function(){
$(".search-form").submit(function(evt){
    evt.preventDefault();
    var searchText = $("#search").val();
    var year = $("#year").val();
    var url = "http://www.omdbapi.com/";
    var listingHTML = '';
    //empty out the movies to prevent search results appending endlessly
    $("#movies").empty();
    $(".desc").remove();
    //set up the data for the movie
    var data = {
        s: searchText,
        type: "Movie",
        r: "json",
        y: year,
        page: "1",
        callback: ""
    };

$.getJSON(url, data, function(data){
    //retrieves the list of movies
        if(data.Search) {
            $.each(data.Search, function (id, movie) {
                    if (movie.Poster === "N/A") {
                        listingHTML += "<li id='" + movie.imdbID + "'><div class='poster-wrap'><i class='material-icons poster-placeholder'>crop_original</i></div>";
                    } else {
                        listingHTML += "<li id='" + movie.imdbID + "'><div class='poster-wrap'><img class='movie-poster' src='" + movie.Poster + "'/></div>";
                    }


                    listingHTML += "<span class='movie-title'>" + movie.Title + "</span>";
                    listingHTML += "<span class='movie-year'>" + movie.Year + "</span>";
                    listingHTML += "</a></li>";

                //setting up the html for the description
                    //

            });
        } else {
            listingHTML += "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchText + ".</li>";
        }

        $("#movies").append(listingHTML);
        function getDescription (){
            var movie = $(this).attr('id');
            //gets rid of any old html in there from a previous retrieval
            $("#descHTML").empty();
            //sets up the description html
            var descHTML =  '<div id="descHTML"><div class="topbar-description"><div id="backNav"><i class="material-icons white">keyboard_arrow_left</i><span class="small-text gray">Search Results</span></div>';

            var descData = {
                i: movie,
                type: "Movie",
                r: "json",
                page: "1",
                callback: ""
            };

            $.getJSON(url, descData, function(movie) {
                //gets the specific movie description from imdb when the movie icon is clicked
                if (movie.Poster === "N/A") {
                    descHTML += '<div class="wrap-small-poster"><div class="poster-wrap small-poster"><i class="material-icons poster-placeholder">crop_original</i></div></div>';
                } else {
                    descHTML += '<div class="wrap-small-poster"><div class="poster-wrap small-poster"><img src="' + movie.Poster + '"/></div></div>';
                }
                descHTML +=  '<div class="description-text"><div><span class="title-description white">' + movie.Title + '(' + movie.Year + ')</span></div><div><span class="imdb-rating gray">IMDB Rating ' + movie.imdbRating + '</span></div></div>';
                descHTML += '</div><div class="wrap"><div class="synopsis"><span class="synopsis-title">Plot Synopsis:</span>';
                descHTML += '<p class="synopsis-text">' + movie.Plot + '</p>';
                descHTML += '<button id="button-imdb" class="button-imdb">View on IMDB</button></div>';
                $("#movies").hide();
                $(".main-content").append(descHTML);
                function returnToSearch(){
                    $("#descHTML").remove();
                    $("#movies").show();
                    movie = '';
                }
                function viewOnIMDB(){
                    var imdb = 'http://www.imdb.com/title/' + movie.imdbID;
                    window.open(imdb);
                }
                document.getElementById("backNav").addEventListener('click', returnToSearch);
                document.getElementById("button-imdb").addEventListener('click', viewOnIMDB);
            });


        }
        //adds the description function to each click
        $('li').each(function(index){
            this.addEventListener('click', getDescription);
        });
    });

});
    return App;
})();