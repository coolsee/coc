

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

var AnimationLayer = cc.Layer.extend({
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
//            var desSize = cc.EGLView.getInstance().getDesignResolutionSize()
//            var winSize = cc.Director.getInstance().getWinSize();
//            var scale = winSize.height / desSize.height;
//            this._uiLayer.setAnchorPoint(0,0);
//            this._uiLayer.setScale(scale);
//            this._uiLayer.setPosition(cc.p((winSize.width - desSize.width * scale) / 2, (winSize.height - desSize.height * scale) / 2));


            this._uiLayer = ccs.UILayer.create();
            this.addChild(this._uiLayer);
            this._widget = ccs.GUIReader.getInstance().widgetFromJsonFile(s_SceneAniTest);
            this._uiLayer.addWidget(this._widget);

            var btnBack = this._uiLayer.getWidgetByName("btnBack");
            btnBack.addTouchEventListener(this.onClick_btnBack,this);
            var btnAnimationTest = this._uiLayer.getWidgetByName("btnAniLoading");
            btnAnimationTest.addTouchEventListener(this.onClick_btnAniLoading,this);
            var btnAnimationTest = this._uiLayer.getWidgetByName("btnAniRun");
            btnAnimationTest.addTouchEventListener(this.onClick_btnAniRun,this);
            var btnAnimationTest = this._uiLayer.getWidgetByName("btnAniAtk");
            btnAnimationTest.addTouchEventListener(this.onClick_btnAniAtk,this);
            var btnAnimationTest = this._uiLayer.getWidgetByName("btnAniSmitten");
            btnAnimationTest.addTouchEventListener(this.onClick_btnAniSmitten,this);
            var btnAnimationTest = this._uiLayer.getWidgetByName("btnAniDeath");
            btnAnimationTest.addTouchEventListener(this.onClick_btnAniDeath,this);

            //人物模型r
            ccs.ArmatureDataManager.getInstance().addArmatureFileInfo(s_hero_json);
            var armature = ccs.Armature.create("Hero");
            this.m_hero = armature;
            armature.getAnimation().play("loading");
            armature.setAnchorPoint(0.5, 0.5);
            armature.setPosition(winSize.width / 2, winSize.height / 2);
            this.addChild(armature);
            return true;
        }
        return false;
    },
    onClick_btnAniLoading:function(){
         this.m_hero.getAnimation().play("loading")
    },
    onClick_btnAniRun:function(){
        this.m_hero.getAnimation().play("run")
    },
    onClick_btnAniAtk:function(){
        this.m_hero.getAnimation().play("attack")
    },
    onClick_btnAniSmitten:function(){
        this.m_hero.getAnimation().play("smitten")
    },
    onClick_btnAniDeath:function(){
        this.m_hero.getAnimation().play("death")
    },
    onClick_btnBack:function(){
        var director = cc.Director.getInstance();
        director.replaceScene(new MainScene());
    }

});

var AnimationScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AnimationLayer();
        this.addChild(layer);
        layer.init();
    }
});
