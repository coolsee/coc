/****************************************************************************
 Copyright (c) 2013 cocos2d-x.org

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

var ActorController = ccs.ComController.extend({
    ctor: function () {
        this._super();
        cc.log("ActorController ctor")
        this.setName("ActorController")
        this._isTouchMoved = false;

        this._running = true
    },

    onEnter: function () {
        this._owner.getAnimation().play("loading");
        this._owner.setAnchorPoint(0.8, 0.2);
        this._mapCon = this._owner.getParent().getComponent("MapController");

        this._owner.setScale(0.5);
        this.setTiledPos(cc.p(0,9));

        cc.log("MapController onEnter")
        if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
    },

    onExit: function () {

    },

    update: function (dt) {
    },

    onMouseDragged:function (event) {
        var delta = event.getDelta();
        if(delta.width >0 || delta.height>0){
            this._isTouchMoved = true;
        }
        return false;
    },
    onMouseDown:function (mouse) {
        this._isTouchMoved = false;
        return false;
    },
    /**
     * <p> called when the "mouseMoved" event is received.            <br/>
     * Return YES to avoid propagating the event to other delegates.  </p>
     * @param event
     * @return {Boolean}
     */
    onMouseMoved:function (event) {
        return false;
    },

    onMouseUp:function (mouse) {
        if(!this._isTouchMoved){
            var tilePos = this._mapCon.getMapTiledPos(mouse._point);
            cc.log("tilePos " + JSON.stringify(tilePos));
            this._mapCon.describeTiledPos(tilePos);

            if(this._mapCon.getPosType(tilePos) == Conf_Block_Type){
                return;
            }
            var pos = this._mapCon.getPos(tilePos);
            this._owner.setPosition(pos);
        }
        return false;
    },

    // func
    setTiledPos: function (tiledPos) {
        var pos = this._mapCon.getPos(tiledPos);
        this._owner.setPosition(pos);
    }

});

ActorController.create = function () {
    var controller = new ActorController();
    controller.init();
    return controller;
};