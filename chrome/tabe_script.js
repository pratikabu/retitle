var originalTitle, originalFavicon;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if("tr" == request.updateWhat) {
			var newTitle = prompt("New Title", request.updateData);
			if(null == newTitle) {
				return;
			}
			
			request.updateWhat = "t";
			request.updateData = newTitle;
		} else if("initData" == request.updateWhat) {
			originalTitle = request.oTitle;
			originalFavicon = request.oFavicon;
		}
		
		if ("t" == request.updateWhat) {
			document.title = request.updateData;
		} else if("i" == request.updateWhat) {
			var links = document.getElementsByTagName('link');
			if(links) {
				for (var i = 0; i < links.length; i++) {
					var link = links[i];
					if(link.rel && -1 != link.rel.indexOf("icon")) {
						link.href = request.updateData;
					}
				}
			}
		}
	}
);