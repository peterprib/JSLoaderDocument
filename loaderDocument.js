/*
 * Copyright (C) 2016 Jaroslav Peter Prib
 * 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 */
function LoaderDocument(baseElement) {
	this.baseElement=baseElement||document.head;
}
LoaderDocument.prototype.load = function(url,callBack,callBackObject,callBackArgs) {
	console.log("LoaderDocument load "+url);
	var elementType = (url.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
	if(this.hasHistory(elementType,url)) {
		console.log("LoaderDocument already loaded "+url);
		if(callBack)
			callBack.apply(callBackObject,callBackArgs);
		return;
	}
	var thisObject=this
		,fileElement = document.createElement({js:"script",css:"link"}[elementType]);
	fileElement.type = "text/"+{js:"javascript",css:"css"}[elementType];
	switch (elementType) {
		case 'js' : 
			fileElement.src = url;
			break;
		case 'css':
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("href", filename)
			break;
	}
	fileElement.onload = function () {
			if(thisObject.hasHistory(elementType,url))
				console.error("LoaderDocument "+elementType+" already loaded before "+url+", could be timing");
			else {
				thisObject.history[elementType][url]=fileElement;
				console.log("LoaderDocument "+elementType+" loaded "+url);
			}
			if(callBack)
				callBack.apply(callBackObject,callBackArgs);
		}
	fileElement.onerror = function () {
			console.error("LoaderDocument error loading "+url);
		};
	this.baseElement.appendChild(fileElement);
};
LoaderDocument.prototype.hasHistory = function(elementType,url) {
		return this.history.hasOwnProperty(elementType) && this.history[elementType].hasOwnProperty(url);
	};
LoaderDocument.prototype.history = {
		js:{}
		,css:{}
	};
var loaderDocument = new LoaderDocument();

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function(require) {
    //The value returned from the function is
    //used as the module export visible to Node.
    return LoaderDocument;
});
