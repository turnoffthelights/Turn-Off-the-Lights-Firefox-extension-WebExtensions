function $(id) { return document.getElementById(id); }
// Install on www.stefanvd.net
// Install on www.turnoffthelights.com
if(window.location.href.match(/^http(s)?:\/\/(www\.)?stefanvd.net/i)||window.location.href.match(/^http(s)?:\/\/(www\.)?turnoffthelights.com/i)){
	if($('turnoffthelights-firefox-install-button')){
		$('turnoffthelights-firefox-install-button').style.display = 'none';
		$('turnoffthelights-firefox-thanks-button').style.display = 'block';
	}
}
var totlscreenshotpage = "https://www.turnoffthelights.com/extension/capture-screenshot-of-video.html";
var developerwebsite = "https://www.turnoffthelights.com";
var totloptionspage = "https://www.turnoffthelights.com/extension/options.html";
var ambientaureaproduct = "https://addons.mozilla.org/firefox/addon/ambient-aurea";
var datetodayproduct = "https://addons.mozilla.org/firefox/addon/date-today";
var turnoffthelightsproduct = "https://addons.mozilla.org/firefox/addon/turn-off-the-lights";
var financetoolbarproduct = "https://addons.mozilla.org/firefox/addon/finance-toolbar";
var propermenubarproduct = "https://addons.mozilla.org/firefox/addon/proper-menubar";
var fullscreenproduct = "https://addons.mozilla.org/firefox/addon/full-screen-for-firefox";
var zoomproduct = "https://addons.mozilla.org/firefox/addon/zoom";
var donatewebsite = "https://www.turnoffthelights.com/donate.html";
var writereview = "https://addons.mozilla.org/en-US/firefox/addon/turn-off-the-lights/reviews/";
var linkchangelog = "https://www.turnoffthelights.com/extension/firefoxchangelog.html";
var linktranslate = "https://www.turnoffthelights.com/extension/translate.html";
var linksupport = "https://www.turnoffthelights.com/support/";
var linkwelcomepage = "https://www.turnoffthelights.com/extension/firefoxwelcome.html";
var linkuninstall = "https://www.turnoffthelights.com/extension/firefoxuninstalled.html";
var linkguide = "https://www.turnoffthelights.com/extension/firefoxguide.html";
var linkshare = "https://www.turnoffthelights.com/shareextension.html";
var linkthemedownload = "https://www.turnoffthelights.com/browser/theme.html";
var browsernewtab = "null";
var browserstore = "https://addons.mozilla.org";
var linkyoutube = "https://www.youtube.com/c/turnoffthelights?sub_confirmation=1";
var linkauroraplayerapp = "https://www.stefanvd.net/project/aurora-player/";
var linktotlmobileapp = "https://www.turnoffthelights.com/mobile.html";
var devmode = false;