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
var glo;
var isZombie;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        nfc.addTagDiscoveredListener(function() {
            alert("saw a tag")
        });
        nfc.addNdefListener(function(tag) {
            glo = tag
            var s = ""
            var g = 0
            var z = 0
            var a = glo.tag.ndefMessage[0].payload;
            
            for (var i = 3; i < a.length; i++) {
                s += String.fromCharCode(a[i])
            }

            z = s[s.length - 1]

            for (var i = 0; i < s.length - 1; i++) {
                g += s[i]
            }

            alert(z)
            alert(s)
        }, function() {
            alert("successfully started")
        }, function() {
            alert("error conenction")
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
};

function random() {
    var message = [
        ndef.textRecord("hello, world")
    ];
    nfc.share(message, function(){
        alert("sent a tag using share")
    }), function(){
        alert("error in sending tag share")
    };
}
app.initialize();