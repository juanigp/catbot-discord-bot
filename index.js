const discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var client = new discord.Client();
const token = "NzEzOTExNTM5MDQzNjYzOTgz.XsnY6w.JD_lHAlqHeQXqBOsXayJd6kX8Qk";
client.on("ready", () => {
console.log("ready!");
client.user.setGame("hi!");
});

client.on("message", (message) => {
    if (message.content.valueOf("cat pls")){
        ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
            cat_url = data[0]["url"];
            console.log(cat_url);
            attachments = {
                "embed": {
                  "image": {
                    "url": cat_url
                  }
                }
              }    
            message.channel.send("", attachments);      
        });        
    }

});

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
        try {
          var data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          console.log(err.message + " in " + xmlhttp.responseText);
          return;
        }
        callback(data);
      }
    };
  
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }  

client.login(token);