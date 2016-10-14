var apiKey = require("./../.env").apiKey;

function User() {
}

User.prototype.getUsers =  function(username) {
    $.get("https://api.github.com/users/" + username + "?access_token=" + apiKey).then(function(response) {
        console.log(response);
        var results = $(".results");
        results.append(
                        "<ul class='list-group'>" +
                            "<li class='list-group-item'>Username: " + response.login + "</li>" +
                            "<li class='list-group-item'><img width='233' height='233' src='" + response.avatar_url + "'></li>" +
                            "<li class='list-group-item'>Location: " + response.location + "</li>" +
                        "</ul>"
                    );
    }).fail(function(error) {
        console.log(error.responseJSON.message);
    });
};

exports.userModule = User;
