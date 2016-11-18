var apiKey = require("./../.env").apiKey;

function User() {
}

User.prototype.getUsers =  function(username) {
  var results = $(".results");
  $.get("https://api.github.com/users/" + username + "?access_token=" + apiKey).then(function(response) {
    console.log(response);
    results.append(
      "<ul class='list-group'>" +
          "<li class='list-group-item'>Username: " + response.login + "</li>" +
          "<li class='list-group-item'>Name: " + response.name + "</li>" +
          "<li class='list-group-item'><img width='233' height='233' src='" + response.avatar_url + "' alt='avatar'></li>" +
          "<li class='list-group-item'>Location: " + response.location + "</li>" +
      "</ul>"
    );
  }).fail(function(error) {
    results.append("<h3>Sorry, we can't seem to find what your looking for :(</h3>");
    console.log(error.responseJSON.message);
  });
};

User.prototype.getRepos = function(username) {
  var repos = $(".repos");
  $.get("https://api.github.com/users/" + username + "/repos?access_token=" + apiKey).then(function(response) {
    console.log(response.length);
    repos.append("<h3>Repositories</h3>");
    for (var i = 0; i < response.length; i++) {
      repos.append(
        "<ul class='list-group'>" +
          "<li class='list-group-item'>Name: " + response[i].name + "</li>" +
          "<li class='list-group-item'>Descrition: " + response[i].description + "</li>" +
          "<li class='list-group-item'>Link: <a href='" + response[i].clone_url + "'>" + response[i].clone_url + "</a></li>" +
        "</ul>"
      );
    }
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  });
};

exports.userModule = User;
