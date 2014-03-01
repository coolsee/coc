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

            var desSize = cc.EGLView.getInstance().getDesignResolutionSize()
            var winSize = cc.Director.getInstance().getWinSize();
            cc.log(JSON.stringify(desSize))
            cc.log("XZXXXXXXXXXXx")
            cc.log(JSON.stringify(winSize))
            var scale = winSize.height / desSize.height;
            this._uiLayer.setAnchorPoint(0,0);
            this._uiLayer.setScale(scale);
            this._uiLayer.setPosition(cc.p((winSize.width - desSize.width * scale) / 2, (winSize.height - desSize.height * scale) / 2));

            // 添加模型

            //人物模型r
            ccs.ArmatureDataManager.getInstance().addArmatureFileInfo(s_hero_json);
            var armature = ccs.Armature.create("Hero");
            this.m_hero = armature;
            armature.getAnimation().play("loading");
            armature.setAnchorPoint(0.5, 0.5);
            armature.setPosition(333, 333);
            var objPanel = this._uiLayer.getWidgetByName("Panel_55");
            objPanel.addChild(armature);

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
    }

});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
        layer.init();
    }
});
