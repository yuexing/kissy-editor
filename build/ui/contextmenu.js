/**
 * contextmenu for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("contextmenu", function() {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node,
        DOM = S.DOM,
        Event = S.Event;
    var HTML = "<div class='ke-menu' onmousedown='return false;'></div>";


    function ContextMenu(config) {
        this.cfg = S.clone(config);
        KE.Utils.lazyRun(this, "_prepareShow", "_realShow");
    }

    var global_rules = [];
    /**
     * å¤èåç®¡ç?
     */
    ContextMenu.register = function(doc, cfg) {

        var cm = new ContextMenu(cfg);

        global_rules.push({
            doc:doc,
            rules:cfg.rules,
            instance:cm
        });

        if (!doc.ke_contextmenu) {
            doc.ke_contextmenu = 1;
            Event.on(doc, "mousedown", ContextMenu.hide);
            Event.on(doc, "contextmenu", function(ev) {
                ContextMenu.hide.call(this);
                var t = new Node(ev.target);
                while (t) {
                    var name = t._4e_name(),stop = false;
                    if (name == "body")break;
                    for (var i = 0; i < global_rules.length; i++) {
                        var instance = global_rules[i].instance,
                            rules = global_rules[i].rules,
                            doc2 = global_rules[i].doc;
                        if (doc === doc2 && applyRules(t[0], rules)) {


                            ev.preventDefault();
                            stop = true;
                            //ie å³é®ä½ç¨ä¸­ï¼ä¸ä¼åçç¦ç¹è½¬ç§»ï¼åæ ç§»å?
                            //åªè½å³é®ä½ç¨å®åæè½ï¼æä¼åçåæ ç§»å?rangeåå
                            //å¼æ­¥å³é®æä½
                            //qc #3764,#3767
                            setTimeout(function() {
                                instance.show(KE.Utils.getXY(ev.pageX, ev.pageY, doc, document));
                            }, 30);

                            break;
                        }
                    }
                    if (stop) break;
                    t = t.parent();
                }
            });
        }
        return cm;
    };

    function applyRules(elem, rules) {
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if (DOM.test(elem, rule))return true;
        }
        return false;
    }

    ContextMenu.hide = function() {
        var doc = this;
        for (var i = 0; i < global_rules.length; i++) {
            var instance = global_rules[i].instance,doc2 = global_rules[i].doc;
            if (doc === doc2)
                instance.hide();
        }
    };

    var Overlay = KE.SimpleOverlay;
    S.augment(ContextMenu, {
        /**
         * æ ¹æ®éç½®æé?å³é®èååå®¹
         */
        _init:function() {
            var self = this,cfg = self.cfg,funcs = cfg.funcs;
            self.elDom = new Node(HTML);
            var el = self.elDom;
            el.css("width", cfg.width);
            document.body.appendChild(el[0]);
            //ä½¿å®å·å¤ overlay çè½åï¼å¶å®è¿éå¹¶ä¸æ¯å®ä½å
            self.el = new Overlay({el:el});

            for (var f in funcs) {
                var a = new Node("<a href='#'>" + f + "</a>");
                el[0].appendChild(a[0]);
                (function(a, func) {
                    a._4e_unselectable();
                    a.on("click", function(ev) {
                        //å?hide è¿åç¼è¾å¨åç¦ç¹
                        self.hide();
                        //console.log("contextmenu hide");
                        ev.halt();
                        //ç»?ie ä¸?¹ hide() ä¸­çäºä»¶è§¦å handler è¿è¡æºä¼ï¼åç¼è¾å¨è·å¾ç¦ç¹ååè¿è¡ä¸æ­¥æä½?
                        setTimeout(func, 30);
                    });
                })(a, funcs[f]);
            }

        },

        hide : function() {
            this.el && this.el.hide();
        },
        _realShow:function(offset) {
            this.el.show(offset);
        },
        _prepareShow:function() {
            this._init();
        },
        show:function(offset) {
            this._prepareShow(offset);
        }
    });

    KE.ContextMenu = ContextMenu;
});
