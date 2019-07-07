
$(document).ready(function () {
    var people = ["Rodney Mullen", "Daewon Song", "Richie Jackson", "Nyjah Huston", "Luan Oliveira"];
    var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/Skateboard Ollie-SoundBible.com-509351003.mp3");

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
        audioElement.play();
        var morePeople = $(".form-control").val()
        people.push(morePeople);
        makeButtons();
        console.log(people);
    })

    $(".buttons").on("click", function () {
        audioElement.play();
        var choice = $(this).attr("data-type")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=4P0BC1gDEzI52ZXavK4OkasG0b4E2efG&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                for (var j = 0; j < results.length; j++) {
                    var personDiv = $("<div>").addClass("random m-1");
                    var personImage = $("<img>");
                    personImage.attr("src", results[j].images.fixed_height.url);
                    personImage.attr("data-still", results[j].images.fixed_height_still.url);
                    personImage.attr("data-animate", results[j].images.fixed_height.url);
                    personImage.attr("data-state", "still");
                    personImage.attr("class", "gif");
                    personDiv.append(personImage);
                    $("#gifs-go-here").prepend(personDiv);

                }
            })

            function pauseGifs() {
                var dataState = $(this).attr("data-state");
                var dataAnimate = $(this).attr("data-animate");
                var dataStill = $(this).attr("data-still");
                
                if (dataState == "still") {
                    $(this).attr("src", dataAnimate);
                    $(this).attr("data-state", dataAnimate);
                    
                }else {
                    $(this).attr("src", dataStill);
                    $(this).attr("data-state", dataStill);

                };
                
            }
            
            $(document).on("click", ".gif", pauseGifs);
        })
    });
