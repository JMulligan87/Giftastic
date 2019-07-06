







$(document).ready(function () {
    var people = ["Rodney Mullen", "Daewon Song", "Richie Jackson", "Nyjah Huston", "Luan Oliveira"];
    
    function makeButtons() {
        $(".row1").empty();
        for (var i = 0; i < people.length; i++) {
            var buttons = $("<button class='buttons' data-type='" + people[i] + "'>" + people[i] + "</button>")
            $(".row1").append(buttons);

        }
    }

    makeButtons();

    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        var morePeople = $(".form-control").val().trim();
        people.push(morePeople);
        makeButtons();
        console.log(people);
    })
    
    $(".buttons").on("click", function () {
        var choice = $(this).attr("data-type")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=4P0BC1gDEzI52ZXavK4OkasG0b4E2efG&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                for (var j = 0; j < results.length; j++) {
                    var personDiv = $("<div>").addClass("random m-1");
                    var personImage = $("<img>");
                    personImage.attr("src", results[j].images.fixed_height.url);
                    personDiv.append(personImage);
                    $("#gifs-go-here").prepend(personDiv);

                }
            })

    })
   
});
