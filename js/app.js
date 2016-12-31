(function(){

$(".search-form").submit(function(evt){
    evt.preventDefault();
    var searchText = $("#search").val();
    var url = "http://www.omdbapi.com/?s=" + searchText + "&r=json";
    var listingHTML;
    $(".desc").remove();
    $.getJSON(url, function(data){
        console.log(data.Search);
        if(data.Search) {
            $.each(data.Search, function (id, movie) {
                if (movie.Poster === "N/A") {
                    listingHTML += "<li><div class='poster-wrap'><i class='material-icons poster-placeholder'>crop_original</i></div>";
                } else {
                    listingHTML += "<li><div class='poster-wrap'><img class='movie-poster' src='" + movie.Poster + "'/></div>";

                }

                listingHTML += "<span class='movie-title'>" + movie.Title + "</span>";
                listingHTML += "<span class='movie-year'>" + movie.Year + "</span>";
                listingHTML += "</li>";
            });
        } else {
            listingHTML += "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchText + ".</li>"
        }
        $("#movies").append(listingHTML);
    }).fail(function(){
        console.log("error");
    });

});

})();