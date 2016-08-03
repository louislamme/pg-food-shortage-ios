/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var my_client_id = "1024935207588997", // YOUR APP ID
            my_secret = "29923c4e7eceac05f917cfa030060e55", // YOUR APP SECRET 
            my_redirect_uri = "https://www.facebook.com/connect/login_success.html", // LEAVE THIS
            my_type = "user_agent",
            my_display = "touch"; // LEAVE THIS

        var facebook_token = "fbToken"; // OUR TOKEN KEEPER
        var ref; //IN APP BROWSER REFERENCE
        $('#fb-connect').on('click', function() {
              // body...
              // FACEBOOK
        var facebook = {
            init: function() {
                // Begin Authorization
                var authorize_url = "https://www.facebook.com/dialog/oauth?";
                authorize_url += "client_id=" + my_client_id;
                authorize_url += "&redirect_uri=" + my_redirect_uri;
                authorize_url += "&display=" + my_display;
                authorize_url += "&scope=publish_stream";

                //CALL IN APP BROWSER WITH THE LINK
                ref = cordova.InAppBrowser.open(authorize_url, '_blank', 'location=no');

                ref.addEventListener('loadstart', function(event) {

                    Facebook.facebookLocChanged(event.url);

                });

            },
            facebookLocChanged: function(loc) {

                if (loc.indexOf("code=") >= 1) {

                    //CLOSE INAPPBROWSER AND NAVIGATE TO INDEX
                    ref.close();

                    //THIS IS MEANT TO BE DONE ON SERVER SIDE TO PROTECT CLIENT SECRET
                    var codeUrl = 'https://graph.facebook.com/oauth/access_token?client_id=' + my_client_id + '&client_secret=' + my_secret + '&redirect_uri=' + my_redirect_uri + '&code=' + loc.split("=")[1];
                    console.log('CODE_URL::' + codeUrl);
                    $.ajax({
                        url: codeUrl,
                        data: {},
                        type: 'POST',
                        async: false,
                        cache: false,
                        success: function(data, status) {
                            //WE STORE THE TOKEN HERE
                            localStorage.setItem(facebook_token, data.split('=')[1].split('&')[0]);
                        },
                        error: function() {
                            alert("Unknown error Occured");
                        }
                    });
                }
            }
        }
        })

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
