//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the videos as if you were in the cinema.
Copyright (C) 2016 Stefan vd
www.stefanvd.net
www.turnoffthelights.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

chrome.runtime.onMessage.addListener(function request(request,sender,sendResponse){
// eye protection & autoplay & shortcut
if (request.name == "automatic") {chrome.tabs.executeScript(sender.tab.id, {file: "js/light.js"});}
// contextmenu
else if (request.name == "contextmenuon") {checkcontextmenus();}
else if (request.name == "contextmenuoff") {removecontexmenus();}
else if (request.name == 'currenttabforblur') {
        chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 50}, function(dataUrl) {
            sendResponse({ screenshotUrl: dataUrl });
        });
}
else if (request.name == "emergencyalf") {
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeOFF") {
if(request.value == true){chrome.storage.local.set({"eyea": true});chrome.storage.local.set({"eyen": false});}
else{chrome.storage.local.set({"eyea": false});chrome.storage.local.set({"eyen": true});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeON") {
if(request.value == true){chrome.storage.local.set({"eyea": true});chrome.storage.local.set({"eyen": false});}
else{chrome.storage.local.set({"eyea": false});chrome.storage.local.set({"eyen": true});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/reloadlight.js"});
            }
        }
    );
}
else if (request.name == "adddarkyoutube") {
chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(sender.tab.id, {allFrames: true, file: "js/youtubedark.js"});
        }
    );
}
else if (request.name == "addnormalyoutube") {
chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(sender.tab.id, {allFrames: true, file: "js/youtubewhite.js"});
        }
    );
}
else if (request.name == "nmcustomx") {
if(request.value){chrome.storage.local.set({"nmcustomx": request.value});}
}
else if (request.name == "nmcustomy") {
if(request.value){chrome.storage.local.set({"nmcustomy": request.value});}
}
else if (request.name == "mastertabdark") {
if(request.value == true){
	chrome.tabs.query({}, function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
				}
			}
		);
}
else{
	chrome.tabs.query({}, function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.executeScript(tabs[i].id, {file: "js/golight.js"});
				}
			}
		);
}
}
return true;
});

chrome.tabs.onActivated.addListener(function (activeInfo){
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        chrome.storage.local.get(['icon'], function(items){
            if(items["icon"] == undefined){items["icon"] = "icons/iconstick1@2x.png";}
            chrome.browserAction.setIcon({tabId : activeInfo.tabId, path : {"19": items["icon"],"38": items["icon"]}});
        });// chrome storage end
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		chrome.storage.local.get(['icon'], function(chromeset){
            if(chromeset["icon"] == undefined){chromeset["icon"] = "icons/iconstick1@2x.png";}
            chrome.browserAction.setIcon({tabId : tabId, path : {"19": chromeset["icon"],"38": chromeset["icon"]}});

			if((tab.url.match(/^http/i)||tab.url.match(/^file/i)||tab.url==browsernewtab)) {
                chrome.browserAction.setPopup({tabId : tabId, popup:''});
				if(tabId != null){
                    if((new URL(tab.url)).origin==browserstore){
                        chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
                    }
				}
			}else{
                if(tabId != null){
                chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
				}
            }
		});
});

chrome.tabs.onHighlighted.addListener(function(o) { tabId = o.tabIds[0];
    chrome.tabs.get(tabId, function(tab) {
			if((tab.url.match(/^http/i)||tab.url.match(/^file/i)||tab.url==browsernewtab)) {
                chrome.browserAction.setPopup({tabId : tabId, popup:''});
				if(tabId != null){
                    if((new URL(tab.url)).origin==browserstore){
                        chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
                    }
				}
			}else{
                if(tabId != null){
                chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
				}
            }
    });
});

chrome.browserAction.onClicked.addListener(function(tabs) {
    chrome.storage.local.get(['alllightsoff'], function(chromeset){
        if((chromeset["alllightsoff"]!=true) && (chromeset["alllightsoff"]!=true)){
            chrome.tabs.executeScript(tabs.id, {file: "js/light.js"}, function() {if (chrome.runtime.lastError) {
            // console.error(chrome.runtime.lastError.message);
            }});
        }else{
            chrome.tabs.executeScript(tabs.id, {file: "js/mastertab.js"}, function() {if (chrome.runtime.lastError) {
            // console.error(chrome.runtime.lastError.message);
            }});
        }
    });
});

chrome.commands.onCommand.addListener(function(command) {
if(command == "toggle-feature-nightmode"){
    chrome.tabs.executeScript(null,{code:"if(document.getElementById('stefanvdnightthemecheckbox')){document.getElementById('stefanvdnightthemecheckbox').click();}"});
}
});

// contextMenus
function onClickHandler(info, tab) {
var str = info.menuItemId;var resvideo = str.substring(0, 9);var respage = str.substring(0, 8);
if (resvideo == "totlvideo" || respage == "totlpage") {chrome.tabs.executeScript(tab.id, {file: "js/light.js"});}
else if (info.menuItemId == "totlguideemenu") {window.open(linkguide, "_blank");}
else if (info.menuItemId == "totldevelopmenu") {window.open(donatewebsite, "_blank");}
else if (info.menuItemId == "totlratemenu") {window.open(writereview, "_blank");}
else if (info.menuItemId == "totlsharemenu") {window.open(linkshare, "_blank");}
else if (info.menuItemId == "totlshareemail") {window.open("mailto:youremail?subject="+chrome.i18n.getMessage("sharetexta")+"&body="+chrome.i18n.getMessage("sharetextb")+" "+turnoffthelightsproduct, "_blank");}
else if (info.menuItemId == "totlsharetwitter") {var sturnoffthelightsproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextc")+" "+turnoffthelightsproduct);window.open("https://twitter.com/home?status="+sturnoffthelightsproductcodeurl, "_blank");}
else if (info.menuItemId == "totlsharefacebook") {window.open("https://www.facebook.com/sharer/sharer.php?u="+turnoffthelightsproduct, "_blank");}
else if (info.menuItemId == "totlsharegoogleplus") {window.open("https://plus.google.com/share?url="+turnoffthelightsproduct, "_blank");}
}

// check to remove all contextmenus
chrome.contextMenus.removeAll(function() {
//console.log("contextMenus.removeAll callback");
});

var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenupostongoogleplus = chrome.i18n.getMessage("sharemenupostongoogleplus");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");

var contexts = ["browser_action"];
chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts":contexts});

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts":contexts});
var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "parentId": parent});
var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "parentId": parent});
var child3 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "parentId": parent});
var child4 = chrome.contextMenus.create({"title": sharemenupostongoogleplus, "id": "totlsharegoogleplus", "parentId": parent});

chrome.contextMenus.onClicked.addListener(onClickHandler);

// context menu for page and video
var menupage = null;
var menuvideo = null;
var contextmenuadded = false;
var contextarrayvideo = [];
var contextarraypage = [];
function checkcontextmenus(){
    if(contextmenuadded == false){
    contextmenuadded = true;

    // video
    var contexts = ["video"];
    for (var i = 0; i < contexts.length; i++){
    var context = contexts[i];
    var videotitle = chrome.i18n.getMessage("videotitle");
    menuvideo = chrome.contextMenus.create({"title": videotitle, "type":"normal", "id": "totlvideo"+i, "contexts":[context]});
    contextarrayvideo.push(menuvideo);
    }

    // page
    var contexts = ["page","selection","link","editable","image","audio"];
    for (var i = 0; i < contexts.length; i++){
    var context = contexts[i];
    var pagetitle = chrome.i18n.getMessage("pagetitle");
    menupage = chrome.contextMenus.create({"title": pagetitle, "type":"normal", "id": "totlpage"+i, "contexts":[context]});
    contextarraypage.push(menupage);
    }
    
    }
}

function removecontexmenus(){
    if (contextarrayvideo.length > 0) {
        for (var i=0;i<contextarrayvideo.length;i++) {
            if (contextarrayvideo[i] === undefined || contextarrayvideo[i] === null){}else{
            chrome.contextMenus.remove(contextarrayvideo[i]);
            }
        }
    }
    if (contextarraypage.length > 0) {
        for (var i=0;i<contextarraypage.length;i++) {
            if (contextarraypage[i] === undefined || contextarraypage[i] === null){}else{
            chrome.contextMenus.remove(contextarraypage[i]);
            }
        }
    }
    contextarrayvideo = [];
    contextarraypage = [];
    contextmenuadded = false;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
   for (key in changes) {
        var storageChange = changes[key];
        if(changes['contextmenus']){if(changes['contextmenus'].newValue == true){checkcontextmenus()}else{removecontexmenus()}}
        if(changes['icon']){if(changes['icon'].newValue){
            chrome.browserAction.setIcon({tabId : tabId,
              path : {
                "19": changes['icon'].newValue,
                "38": changes['icon'].newValue
              }
            });  
            }
        }
        if(changes['ecosaver']){
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.executeScript(tabs[i].id, {file: "js/reloadlight.js"});
                }
            });
        }
    }
})

try{ chrome.runtime.setUninstallUrl(linkuninstall); }
catch(e){}

function initwelcome(){
chrome.storage.local.get(['firstRun'], function(chromeset){
if ((chromeset["firstRun"]!="false") && (chromeset["firstRun"]!=false)){
  chrome.tabs.create({url: linkwelcomepage, active:true})
  chrome.tabs.create({url: linkguide, active:false})
  chrome.storage.local.set({"firstRun": false, "version": "2.4"});
}
});
}
initwelcome();