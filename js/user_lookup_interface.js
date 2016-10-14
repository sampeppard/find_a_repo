var User = require("./../js/user_lookup.js").userModule;

$(document).ready(function() {
    var newUserSearch = new User();
    $("#user-lookup").submit(function(event) {
        event.preventDefault();
        var username = $("#user").val();
        newUserSearch.getUsers(username);
    });
}); // end ready
