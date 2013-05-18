var RT = "RT", TT = "TT", TI = "TI";
var tabDetails = {};// default values

chrome.runtime.onInstalled.addListener(function() {
	
	var parentId = chrome.contextMenus.create({"title": "TabE", "id": "parent", "contexts":["page"]});
	chrome.contextMenus.create({"title": "Rename Tab Title", "id": RT, "contexts":["page"], "parentId": parentId});
	chrome.contextMenus.create({"title": "Toggle Title On/Off", "id": TT, "contexts":["page"], "parentId": parentId});
	chrome.contextMenus.create({"title": "Toggle Icon On/Off", "id": TI, "contexts":["page"], "parentId": parentId});

	chrome.contextMenus.onClicked.addListener(function(info, tab) {
		var uData = ".";
		var uWhat = "t";
		var updateRequired = true;
		if(RT == info.menuItemId) {
			uWhat = "tr";
			uData = tabDetails[tab.id + "t"];
		} else {
			uWhat = (TT == info.menuItemId) ? "t" : "i";
			updateRequired = (0 != tabDetails[tab.id + uWhat]);
			
			if("i" == uWhat) {
				if(chrome.extension.getURL("icons/favicon.ico") == tab.favIconUrl) {
					uData = tabDetails[tab.id + uWhat];
				} else {
					uData = chrome.extension.getURL("icons/favicon.ico");
				}
			} else if("t" == uWhat && uData == tab.title) {
				uData = tabDetails[tab.id + uWhat];
			}
		}
		
		if(updateRequired) {
			chrome.tabs.sendMessage(tab.id, {updateData: uData, updateWhat: uWhat});
		}
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if("complete" == changeInfo.status) {
			tabDetails[tabId + "t"] = tab.title;
			tabDetails[tabId + "i"] = tab.favIconUrl;
		}
	});

	chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
		delete tabDetails[tabId + "t"];
		delete tabDetails[tabId + "i"];
	});
	
});