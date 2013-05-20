var RT = "RT", TT = "TT", TI = "TI";

chrome.runtime.onInstalled.addListener(function() {
	var parentId = chrome.contextMenus.create({"title": "ReTitle", "id": "parent", "contexts":["page"]});
	chrome.contextMenus.create({"title": "Rename Tab Title", "id": RT, "contexts":["page"], "parentId": parentId});
	chrome.contextMenus.create({"title": "Toggle Title On/Off", "id": TT, "contexts":["page"], "parentId": parentId});
	chrome.contextMenus.create({"title": "Toggle Icon On/Off", "id": TI, "contexts":["page"], "parentId": parentId});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var uWhat = RT;
	var sendReq = false;
	
	if(RT == info.menuItemId) {
		sendReq = true;
	} else if(TT == info.menuItemId) {
		uWhat = TT;
		sendReq = true;
	} else if(TI == info.menuItemId) {
		uWhat = TI;
		sendReq = true;
	}
	
	if(sendReq) {
		chrome.tabs.sendMessage(tab.id, {updateWhat: uWhat});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if("complete" == changeInfo.status) {
		chrome.tabs.sendMessage(tab.id, {updateWhat: "initData", oTitle: tab.title, oFavicon: tab.favIconUrl});
	}
});