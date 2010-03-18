/*
Copyright 2010, KISSY UI Library v1.0.4
MIT Licensed
build: 498 Mar 18 13:49
*/
KISSY.add("suggest",function(l,p){function h(a,b,c){var d=this;if(!(d instanceof h))return new h(a,b,c);d.textInput=f.get(a);d.dataSource=b;d.JSONDataSource=i.isObject(b)?b:null;d.returnedData=null;d.config=i.merge(r,c||{});d.container=null;d.query="";d.queryParams="";d._timer=null;d._isRunning=false;d.dataScript=null;d._dataCache={};d._latestScriptTime="";d._scriptDataIsOut=false;d._onKeyboardSelecting=false;d.selectedItem=null;d._init()}var n=YAHOO.util,f=n.Dom,g=n.Event,i=YAHOO.lang,m=window,e=
document,o=e.getElementsByTagName("head")[0],k=YAHOO.env.ua.ie,r={containerClass:"",containerWidth:"auto",resultFormat:"\u7ea6%result%\u6761\u7ed3\u679c",showCloseBtn:false,closeBtnText:"\u5173\u95ed",useShim:k===6,timerDelay:200,autoFocus:false,submitFormOnClickSelect:true};l.mix(h.prototype,{_init:function(){var a=this;a._initTextInput();a._initContainer();a.config.useShim&&a._initShim();a._initStyle();a.createEvent("beforeDataRequest");a.createEvent("onDataReturn");a.createEvent("beforeShow");a.createEvent("onItemSelect");
a._initResizeEvent()},_initTextInput:function(){var a=this;a.textInput.setAttribute("autocomplete","off");g.on(a.textInput,"blur",function(){a.stop();a.hide()});a.config.autoFocus&&a.textInput.focus();var b=0;g.on(a.textInput,"keydown",function(c){c=c.keyCode;switch(c){case 27:a.hide();a.textInput.value=a.query;break;case 13:a.textInput.blur();a._onKeyboardSelecting&&a.textInput.value==a._getSelectedItemKey()&&a.fireEvent("onItemSelect",a.textInput.value);a._submitForm();break;case 40:case 38:if(b++==
0){a._isRunning&&a.stop();a._onKeyboardSelecting=true;a.selectItem(c==40)}else if(b==3)b=0;break}if(c!=40&&c!=38){a._isRunning||a.start();a._onKeyboardSelecting=false}});g.on(a.textInput,"keyup",function(){b=0})},_initContainer:function(){var a=e.createElement("div"),b=this.config.containerClass;a.className="suggest-container";if(b)a.className+=" "+b;a.style.position="absolute";a.style.visibility="hidden";this.container=a;this._setContainerRegion();this._initContainerEvent();e.body.insertBefore(a,
e.body.firstChild)},_setContainerRegion:function(){var a=this,b=f.getRegion(a.textInput),c=b.left,d=b.right-c-2;d=d>0?d:0;if(e.documentMode===7&&(k===7||k===8))c-=2;else YAHOO.env.ua.gecko&&c++;a.container.style.left=c+"px";a.container.style.top=b.bottom+"px";a.container.style.width=a.config.containerWidth=="auto"?d+"px":a.config.containerWidth},_initContainerEvent:function(){var a=this;g.on(a.container,"mousemove",function(c){c=g.getTarget(c);if(c.nodeName!="LI")c=f.getAncestorByTagName(c,"li");
if(f.isAncestor(a.container,c))if(c!=a.selectedItem){a._removeSelectedItem();a._setSelectedItem(c)}});var b=null;a.container.onmousedown=function(c){c=c||m.event;b=c.target||c.srcElement;a.textInput.onbeforedeactivate=function(){m.event.returnValue=false;a.textInput.onbeforedeactivate=null};return false};g.on(a.container,"mouseup",function(c){if(a._isInContainer(g.getXY(c))){c=g.getTarget(c);if(c==b)if(c.className=="suggest-close-btn")a.hide();else{if(c.nodeName!="LI")c=f.getAncestorByTagName(c,"li");
if(f.isAncestor(a.container,c)){a._updateInputFromSelectItem(c);a.fireEvent("onItemSelect",a.textInput.value);a.textInput.blur();a._submitForm()}}}})},_submitForm:function(){if(this.config.submitFormOnClickSelect){var a=this.textInput.form;if(a){if(e.createEvent){var b=e.createEvent("MouseEvents");b.initEvent("submit",true,false);a.dispatchEvent(b)}else e.createEventObject&&a.fireEvent("onsubmit");a.submit()}}},_isInContainer:function(a){var b=f.getRegion(this.container);return a[0]>=b.left&&a[0]<=
b.right&&a[1]>=b.top&&a[1]<=b.bottom},_initShim:function(){var a=e.createElement("iframe");a.src="about:blank";a.className="suggest-shim";a.style.position="absolute";a.style.visibility="hidden";a.style.border="none";this.container.shim=a;this._setShimRegion();e.body.insertBefore(a,e.body.firstChild)},_setShimRegion:function(){var a=this.container,b=a.shim;if(b){b.style.left=parseInt(a.style.left)-2+"px";b.style.top=a.style.top;b.style.width=parseInt(a.style.width)+2+"px"}},_initStyle:function(){var a=
f.get("suggest-style");if(!a){a=e.createElement("style");a.id="suggest-style";o.appendChild(a);if(a.styleSheet)a.styleSheet.cssText=".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}";
else a.appendChild(e.createTextNode(".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}"))}},
_initResizeEvent:function(){var a=this,b;g.on(m,"resize",function(){b&&clearTimeout(b);b=setTimeout(function(){a._setContainerRegion();a._setShimRegion()},50)})},start:function(){var a=this;h.focusInstance=a;a._timer=setTimeout(function(){a.updateContent();a._timer=setTimeout(arguments.callee,a.config.timerDelay)},a.config.timerDelay);a._isRunning=true},stop:function(){h.focusInstance=null;clearTimeout(this._timer);this._isRunning=false},show:function(){if(!this.isVisible()){var a=this.container,
b=a.shim;a.style.visibility="";if(b){if(!b.style.height){a=f.getRegion(a);b.style.height=a.bottom-a.top-2+"px"}b.style.visibility=""}}},hide:function(){if(this.isVisible()){var a=this.container,b=a.shim;if(b)b.style.visibility="hidden";a.style.visibility="hidden"}},isVisible:function(){return this.container.style.visibility!="hidden"},updateContent:function(){var a=this;if(a._needUpdate()){a._updateQueryValueFromInput();var b=a.query;if(i.trim(b).length)if(a._dataCache[b]!==p){a.returnedData="using cache";
a._fillContainer(a._dataCache[b]);a._displayContainer()}else a.JSONDataSource?a.handleResponse(a.JSONDataSource[b]):a.requestData();else{a._fillContainer("");a.hide()}}},_needUpdate:function(){return this.textInput.value!=this.query},requestData:function(){var a=this;if(!k)a.dataScript=null;if(!a.dataScript){var b=e.createElement("script");b.type="text/javascript";b.charset="utf-8";o.insertBefore(b,o.firstChild);a.dataScript=b;if(!k){var c=(new Date).getTime();a._latestScriptTime=c;b.setAttribute("time",
c);g.on(b,"load",function(){a._scriptDataIsOut=b.getAttribute("time")!=a._latestScriptTime})}}a.queryParams="q="+encodeURIComponent(a.query)+"&code=utf-8&callback=g_ks_suggest_callback";a.fireEvent("beforeDataRequest",a.query);a.dataScript.src=a.dataSource+"?"+a.queryParams},handleResponse:function(a){var b=this;if(!b._scriptDataIsOut){b.returnedData=a;b.fireEvent("onDataReturn",a);b.returnedData=b.formatData(b.returnedData);var c="";a=b.returnedData.length;if(a>0){c=e.createElement("ol");for(var d=
0;d<a;++d){var j=b.returnedData[d],q=b.formatItem(j.key,j.result);q.setAttribute("key",j.key);c.appendChild(q)}c=c}b._fillContainer(c);a>0&&b.appendBottom();i.trim(b.container.innerHTML)&&b.fireEvent("beforeShow",b.container);b._dataCache[b.query]=b.container.innerHTML;b._displayContainer()}},formatData:function(a){var b=[];if(!a)return b;if(i.isArray(a.result))a=a.result;var c=a.length;if(!c)return b;for(var d,j=0;j<c;++j){d=a[j];b[j]=i.isString(d)?{key:d}:i.isArray(d)&&d.length>=2?{key:d[0],result:d[1]}:
d}return b},formatItem:function(a,b){var c=e.createElement("li"),d=e.createElement("span");d.className="suggest-key";d.appendChild(e.createTextNode(a));c.appendChild(d);if(b!==p){a=this.config.resultFormat.replace("%result%",b);if(i.trim(a)){b=e.createElement("span");b.className="suggest-result";b.appendChild(e.createTextNode(a));c.appendChild(b)}}return c},appendBottom:function(){var a=e.createElement("div");a.className="suggest-bottom";if(this.config.showCloseBtn){var b=e.createElement("a");b.href=
"javascript: void(0)";b.setAttribute("target","_self");b.className="suggest-close-btn";b.appendChild(e.createTextNode(this.config.closeBtnText));a.appendChild(b)}i.trim(a.innerHTML)&&this.container.appendChild(a)},_fillContainer:function(a){if(a.nodeType==1){this.container.innerHTML="";this.container.appendChild(a)}else this.container.innerHTML=a;this.selectedItem=null},_displayContainer:function(){l.trim(this.container.innerHTML)?this.show():this.hide()},selectItem:function(a){var b=this,c=b.container.getElementsByTagName("li");
if(c.length!=0)if(b.isVisible()){if(b.selectedItem){a=f[a?"getNextSibling":"getPreviousSibling"](b.selectedItem);if(!a)b.textInput.value=b.query}else a=c[a?0:c.length-1];b._removeSelectedItem();if(a){b._setSelectedItem(a);b._updateInputFromSelectItem()}}else b.show()},_removeSelectedItem:function(){f.removeClass(this.selectedItem,"selected");this.selectedItem=null},_setSelectedItem:function(a){f.addClass(a,"selected");this.selectedItem=a},_getSelectedItemKey:function(){if(!this.selectedItem)return"";
return this.selectedItem.getAttribute("key")},_updateQueryValueFromInput:function(){this.query=this.textInput.value},_updateInputFromSelectItem:function(){this.textInput.value=this._getSelectedItemKey(this.selectedItem)}});l.augment(h,n.EventProvider);m.g_ks_suggest_callback=function(a){h.focusInstance&&setTimeout(function(){h.focusInstance.handleResponse(a)},0)};l.Suggest=h});
