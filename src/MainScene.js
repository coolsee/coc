/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MainLayer = cc.Layer.extend({
    _uiLayer: null,
    _widget: null,
    _topDisplayLabel:null,
    _bottomDisplayLabel:null,
    ctor: function () {
        cc.Layer.prototype.ctor.call(this)
        this._uiLayer = null;
        this._widget = null;
    },
    init: function () {
        if (this._super()) {
            this._uiLayer = ccs.UILayer.create();
            this.addChild(this._uiLayer);

            this._widget = ccs.GUIReader.getInstance().widgetFromJsonFile(s_SceneMain);
            this._uiLayer.addWidget(this._widget);

            var btnAnimationTest = this._uiLayer.getWidgetByName("btnAniTest");
            btnAnimationTest.addTouchEventListener(this.onClick_btnAnimationTest ,this);

            var btnFightScene = this._uiLayer.getWidgetByName("btnFightScene");
            btnFightScene.addTouchEventListener(this.onClick_btnFightScene ,this);

            var btnTile = this._uiLayer.getWidgetByName("btnTile");
            btnTile.addTouchEventListener(this.onClick_btnTile ,this);

            return true;
        }
        return false;
    },
    onClick_btnAnimationTest:function(){
        cc.log("xxxxxxxxxxxxxxxxxxxxx")
        // initialize director
        var director = cc.Director.getInstance();
        director.replaceScene(new AnimationScene());
    },
    onClick_btnFightScene:function(){
        cc.log("xxxxxxxxxxxxxxxxxxxxx")
        // initialize director
        var director = cc.Director.getInstance();
        director.replaceScene(new FightScene());
    },
    onClick_btnTile:function(){
        cc.log("xxxxxxxxxxxxxxxxxxxxx TileScene")
        // initialize director
        var director = cc.Director.getInstance();
        director.replaceScene(new TileScene());
    },

});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
        layer.init();
    }
});
