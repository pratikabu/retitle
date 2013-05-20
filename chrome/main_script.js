var originalTitle, originalFavicon, currentFavicon;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if("initData" == request.updateWhat) {
			originalTitle = request.oTitle;
			originalFavicon = request.oFavicon;
			currentFavicon = originalFavicon;
		} else if(!originalTitle) {
			alert("Page not yet loaded. Let the page load.");
			return;
		}
		
		if("RT" == request.updateWhat) {
			var newTitle = prompt("New Title", originalTitle);
			if(null == newTitle) {
				return;
			}
			document.title = newTitle;
		} else if ("TT" == request.updateWhat) {
			var uData = ".";
			if(uData == document.title) {
				uData = originalTitle;
			}
			document.title = uData;
		} else if("TI" == request.updateWhat) {
			var uData = chrome.extension.getURL("icons/favicon.ico");
			if(uData == currentFavicon) {
				uData = originalFavicon;
			}
			currentFavicon = uData;// update the currentFavicon url
			
			var links = document.getElementsByTagName('link');
			if(links) {
				for (var i = 0; i < links.length; i++) {
					var link = links[i];
					if(link.rel && -1 != link.rel.indexOf("icon")) {
						link.href = uData;
					}
				}
			}
		}
	}
);