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

Conf_Block_list = [3,4]
Conf_Normal_list = [1,2]

Conf_Noral_Type = 1;
Conf_Block_Type = 2;


var MapController = ccs.ComController.extend({
    ctor: function () {
        this._super();
        this._name = "MapController";
        this._running = true
    },
    init: function () {

        return true;
    },

    onEnter: function () {
//        var pos = this._owner.getLayer("baseLayer").getPositionAt(cc.p(9,9))
//        cc.log("pos " + JSON.stringify(pos))

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

    /**
     * default implements are used to call script callback if exist<br/>
     * you must override these touch functions if you wish to utilize them
     * @param {cc.Touch} touch
     * @param {event} event
     * @return {Boolean}
     */
    onTouchBegan:function (touch, event) {
        return true;
    },

    /**
     * callback when a touch event moved
     * @param {cc.Touch} touch
     * @param {event} event
     */
    onTouchMoved:function (touch, event) {
        cc.log("MapController onMouseDragged")
        var delta = event.getDelta();
        var node = this._owner;
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },

    /**
     * callback when a touch event finished
     * @param {cc.Touch} touch
     * @param {event} event
     */
    onTouchEnded:function (touch, event) {
    },

    /**
     * default implements are used to call script callback if exist<br/>
     * you must override these touch functions if you wish to utilize them
     * @param {cc.Touch} touch
     * @param {event} event
     * @return {Boolean}
     */
    onTouchesBegan:function (touch, event) {
        return true;
    },

    /**
     * callback when a touch event moved
     * @param {cc.Touch} touch
     * @param {event} event
     */
    onTouchesMoved:function (touch, event) {
        cc.log("MapController onMouseDragged")
        var delta = event.getDelta();
        var node = this._owner;
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },

    /**
     * callback when a touch event finished
     * @param {cc.Touch} touch
     * @param {event} event
     */
    onTouchesEnded:function (touch, event) {
    },

    onMouseDragged:function (event) {
        cc.log("MapController onMouseDragged")
        var delta = event.getDelta();
        var node = this._owner;
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },
    onMouseDown:function (mouse) {
        cc.log("mouse" + JSON.stringify(mouse))
        return false;
    },
    onMouseUp:function (mouse) {
        return false;
    },

    getRelativePos:function (pos) {
        var basepos = this._owner.getPosition();
        return cc.p(pos.x-basepos.x, pos.y-basepos.y);
    },
    getMapTiledPos:function (pos) {
        var relPos = this.getRelativePos(pos);

        var map = this._owner;
        var mapSize = map.getMapSize();
        var tiledSize = map.getTileSize();

//        // 缩放
//        var scalx = relPos.x / tiledSize.width;
//        var scaly = relPos.y / tiledSize.height;
//        /* pos为笛卡尔坐标系的坐标，所以y轴需要修正 */
//        scaly = mapSize.height - scaly;
//        // 旋转
//        var x = scalx + scaly ;
//        var y = scaly - scalx ;
//        // 位移 在tile坐标系中，坐标系位移（w/2，-w/2)
//        x = x - mapSize.height/2;
//        y = y + mapSize.height/2;

        var scalx = relPos.x / tiledSize.width;
        var scaly = relPos.y / tiledSize.height;

        var x = scalx - scaly  + mapSize.height/2;
        var y =  mapSize.height - scaly - scalx  + mapSize.height/2;
        var ret = cc.p(Math.floor(x), Math.floor(y));
        return ret;
    },

    getAbsolutePosition:function (pos) {
        var basepos = this._owner.getPosition();
        return cc.p(pos.x+basepos.x, pos.y+basepos.y);
    },

    getPos:function (tilePos) {
        var map = this._owner;
        var mapSize = map.getMapSize();
        var tiledSize = map.getTileSize();

        // 逆运算
        var scalx = (tilePos.x - tilePos.y + mapSize.height)/2;
        var scaly = mapSize.height - (tilePos.y + tilePos.x)/2;
        return cc.p(scalx*tiledSize.width, scaly*tiledSize.height);
    },

    getPosType:function (tiledPos) {
        var map = this._owner;
        var mapSize = map.getMapSize();
        var tiledSize = map.getTileSize();

        if(tiledPos.x < 0 || tiledPos.y < 0 ||tiledPos.x > mapSize.width | tiledPos.y>mapSize.height){
            return Conf_Block_Type;
        }
        var map = this._owner;
        var gid = map.getLayer("baseLayer").getTileGIDAt(tiledPos);
        if(Conf_Block_list.indexOf(gid) != -1){
            return Conf_Block_Type;
        }
        return Conf_Noral_Type;
    },

    describeTiledPos:function (tiledPos) {
        var type = this.getPosType(tiledPos);
        if(type == Conf_Block_Type){
            var des = "障碍"
        }
        if(type == Conf_Noral_Type){
            var des = "普通点"
        }
        cc.info("tiledPos %s des %s", JSON.stringify(tiledPos), des)
    },
});

MapController.create = function () {
    var controller = new MapController();
    controller.init();
    return controller;
};