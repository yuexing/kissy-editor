KISSY.Editor.add("utils",function(l){var e=KISSY,m=e.Node,h=e.DOM,j=e.Config.debug,n=e.UA;l.Utils={debugUrl:function(a){if(!j)return"build/"+a.replace(/\.(js|css)/i,"-min.$1");if(j==="dev")return a;return"build/"+a},lazyRun:function(a,b,c){var d=a[b],f=a[c];a[b]=function(){d.apply(this,arguments);a[b]=a[c];return f.apply(this,arguments)}},getXY:function(a,b,c,d){c=c.defaultView||c.parentWindow;a-=h.scrollLeft(c);b-=h.scrollTop(c);if(d)if(c!=(d.defaultView||d.parentWindow)&&c.frameElement){d=h._4e_getOffset(c.frameElement,
d);a+=d.left;b+=d.top}return{left:a,top:b}},tryThese:function(){for(var a,b=0,c=arguments.length;b<c;b++){var d=arguments[b];try{a=d();break}catch(f){}}return a},arrayCompare:function(a,b){if(!a&&!b)return true;if(!a||!b||a.length!=b.length)return false;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return false;return true},getByAddress:function(a,b,c){a=a.documentElement;for(var d=0;a&&d<b.length;d++){var f=b[d];if(c)for(var k=-1,i=0;i<a.childNodes.length;i++){var g=a.childNodes[i];if(!(c===true&&g.nodeType==
3&&g.previousSibling&&g.previousSibling.nodeType==3)){k++;if(k==f){a=g;break}}}else a=a.childNodes[f]}return a?new m(a):null},clearAllMarkers:function(a){for(var b in a)a[b]._4e_clearMarkers(a,true)},htmlEncodeAttr:function(a){return a.replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/,"&gt;")},ltrim:function(a){return a.replace(/^\s+/,"")},rtrim:function(a){return a.replace(/\s+$/,"")},trim:function(a){return this.ltrim(this.rtrim(a))},mix:function(){for(var a={},b=0;b<arguments.length;b++)a=
e.mix(a,arguments[b]);return a},isCustomDomain:function(){if(!n.ie)return false;var a=document.domain,b=window.location.hostname;return a!=b&&a!="["+b+"]"}}});
