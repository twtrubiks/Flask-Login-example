/**
 * Created by twtrubiks on 2016/11/27.
 */
function FBlogin() {
    FB.login(function (response) {
        var obj = {
            userID: response.authResponse.userID,
            accessToken: response.authResponse.accessToken
        };
        var data_json = JSON.stringify(obj);
        $.ajax({
            url: "/API_FB_login",
            type: "POST",
            data: data_json,
            dataType: "json",
            async: false,
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                if (data == "11") {
                    location.replace("/");
                }
            }
        });
    }, {
        scope: 'publish_actions,email,user_friends',
        return_scopes: true
    });
}

function fetchUserDetail() {
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
    });
}

function checkFBlogin() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            fetchUserDetail();
        } else if (response.status === 'not_authorized') {
            FBlogin();
            console.log("Please log into this app.")
        } else {
            FBlogin();
            console.log("Please log into this Facebook.")
        }
    });
}