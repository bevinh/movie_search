var App = (function(){

$(".search-form").submit(function(evt){
    evt.preventDefault();
    var searchText = $("#search").val();
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
        page: "1",
        callback: ""
    };

    $.getJSON(url, data, function(data){
        if(data.Search) {
            $.each(data.Search, function (id, movie) {
                console.log(data.Search);
                    if (movie.Poster === "N/A") {
                        listingHTML += "<li><a href='http://www.imdb.com/title/" + movie.imdbID + "'><div class='poster-wrap'><i class='material-icons poster-placeholder'>crop_original</i></div>";
                    } else {
                        listingHTML += "<li><a href='http://www.imdb.com/title/" + movie.imdbID + "'><div class='poster-wrap'><img class='movie-poster' src='" + movie.Poster + "'/></div>";

                    }

                    listingHTML += "<span class='movie-title'>" + movie.Title + "</span>";
                    listingHTML += "<span class='movie-year'>" + movie.Year + "</span>";
                    listingHTML += "</a></li>";
            });
        } else {
            listingHTML += "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchText + ".</li>"
        }
        $("#movies").append(listingHTML);
    });
});
    return App;
})();