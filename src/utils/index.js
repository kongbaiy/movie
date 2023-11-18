
//函数拷贝
export const copyObj = (obj = {}) => {  //变量先置空
    let newobj = null;

    //判断是否需要继续进行递归
    if (typeof (obj) == 'object' && obj !== null) {
        newobj = obj instanceof Array ? [] : {};  //进行下一层递归克隆
        for (let i in obj) {
            newobj[i] = copyObj(obj[i])
        }                //如果不是对象直接赋值
    } else newobj = obj;
    return newobj;
}

export const filterObjectAttr = (obj = {}, attrs = []) => {
    const newObj = copyObj(obj);

    for (let i in newObj) {
        if (attrs.indexOf(i) >= 0) delete newObj[i];
    }
    return newObj
}

export const touchEvent = (options = {}) => {
    const _taget = options.tagetElement || document;
    let startx, starty, movex, movey;
    // 获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };

    // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;

        // 如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }

        let angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }

        return result;
    }
    // 手指接触屏幕
    _taget.addEventListener("touchstart", function (e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;

        const touchInfo = {
            startx,
            starty,
        };

        if (typeof options.onStart === 'function') options.onStart(touchInfo); 
    }, false);

    _taget.addEventListener("touchmove", function (e) {
        movex = e.touches[0].pageX;
        movey = e.touches[0].pageY;
        
        const touchInfo = {
            startx,
            starty,
            movex,
            movey
        };

        if (typeof options.onMove === 'function') options.onMove(touchInfo); 
    }, false);

    // 手指离开屏幕
    _taget.addEventListener("touchend", function (e) {
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = getDirection(startx, starty, endx, endy);
        const touchInfo = {
            startx,
            starty,
            movex,
            movey,
            endx,
            endy
        };

        if (typeof options.onEnd !== 'function') return; 
        
        switch (direction) {
            case 0:
                // 未滑动！
                options.onEnd({
                    direction: null,
                    touchInfo
                })
                break;
            case 1:
                // 向上！
                options.onEnd({
                    direction: 'y',
                    touchInfo
                });
                break;
            case 2:
                // 向下！
                options.onEnd({
                    direction: '-y',
                    touchInfo
                });
                break;
            case 3:
                // 向左！
                options.onEnd({
                    direction: '-x',
                    touchInfo
                });
                break;
            case 4:
                // 向右！
                options.onEnd({
                    direction: 'x',
                    touchInfo
                });
                break;
            default:
        }
    }, false);

}
