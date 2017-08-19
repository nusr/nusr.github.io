/**
 * Created by Steve Xu on 2017/5/11.
 * 封装好的兼容工具包
 */
/**
 * 获取下一个兄弟元素的兼容函数
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取上一个兄弟元素的兼容函数
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var next = element.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取元素文本的兼容函数
 * @param element
 * @returns {*|string}
 */
function getInnerText(element) {
    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
/**
 * 设置元素文本的兼容函数
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}
/**
 * 获取第一个元素子节点
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType !== 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取最后一个元素子节点
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType !== 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 通过类名获得对象
 * @param element
 * @param className
 * @returns {*}
 */
function getElementsByClassName(element, className) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        var elements = element.getElementsByTagName("*");
        var filterArr = [];
        for (var i = 0; i < elements.length; i++) {
            var names = elements[i].className.split(" ");
            for (var j = 0; j < names.length; j++) {
                if (names[i] === className) {
                    filterArr.push(elements[i]);
                    break;
                }
            }

        }
        return filterArr;
    }
}
/**
 * 改变元素的类名，兼容多个类名
 * @param element
 * @param oldStr
 * @param newStr
 */
function replaceClassName(element, oldStr, newStr) {
    var arr = element.className.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === oldStr) {
            arr[i] = newStr;
        }
    }
    element.className = arr.join(" ");
}

/**
 * 封装的移动端点击tap事件,在PC端不能响应
 * @param domNode
 * @param callback
 */
function tap(domNode, callback) {
    var startX = 0,
        startY = 0,
        startTime = 0,
        endX = 0,
        endY = 0,
        endTime;
    domNode.addEventListener("touchstart", function(e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
        startTime = new Date();
    });
    domNode.addEventListener("touchend", function(e) {
        if (e.changedTouches.length > 1) {
            return;
        }
        endTime = new Date() - startTime;
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        if (endTime > 150) {
            return;
        }
        if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
            console.log("移动端的点击事件");
            console.log(endTime);
            callback && callback();
        }
    });
}

/*
通用事件监听器
 */
markyun.Event = {
    // 页面加载完成后
    readyEvent: function(fn) {
        if (fn == null) {
            fn = document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 参数： 操作的元素,事件名称 ,事件处理程序
    addEvent: function(element, type, handler) {
        if (element.addEventListener) {
            //事件类型、需要执行的函数、是否捕捉
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },
    // 移除事件
    removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.datachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
    stopPropagation: function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    // 取消事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 获取事件目标
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
    getEvent: function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
};
/**
 * 判断日期格式是否有效
 * @param  {[type]}  value      [description]
 * @param  {[type]}  userFormat [description]
 * @return {Boolean}            [description]
 */
function isValidDate(value, userFormat) {

    // Set default format if format is not provided
    userFormat = userFormat || 'mm/dd/yyyy';

    // Find custom delimiter by excluding
    // month, day and year characters
    var delimiter = /[^mdy]/.exec(userFormat)[0];

    // Create an array with month, day and year
    // so we know the format order by index
    var theFormat = userFormat.split(delimiter);

    // Create array from user date
    var theDate = value.split(delimiter);

    function isDate(date, format) {
        var m, d, y, i = 0,
            len = format.length,
            f;
        for (i; i < len; i++) {
            f = format[i];
            if (/m/.test(f)) m = date[i];
            if (/d/.test(f)) d = date[i];
            if (/y/.test(f)) y = date[i];
        }
        return (
            m > 0 && m < 13 &&
            y && y.length === 4 &&
            d > 0 &&
            // Check if it's a valid day of the month
            d <= (new Date(y, m, 0)).getDate()
        );
    }

    return isDate(theDate, theFormat);
}
isValidDate('dd-mm-yyyy', '31/11/2012');

/**
 * 获取元素的最大高度，jQuery
 * @param  {[type]} $elms [description]
 * @return {[type]}       [description]
 */
var getMaxHeight = function($elms) {
    var maxHeight = 0;
    $elms.each(function() {
        // In some cases you may want to use outerHeight() instead
        var height = $(this).height();
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    return maxHeight;
};
$(elements).height(getMaxHeight($(elements)));

/**
 * 高亮文本
 * @param  {[type]} text  [description]
 * @param  {[type]} words [description]
 * @param  {[type]} tag   [description]
 * @return {[type]}       [description]
 */
function highlight(text, words, tag) {

    // Default tag if no tag is provided
    tag = tag || 'span';

    var i, len = words.length,
        re;
    for (i = 0; i < len; i++) {
        // Global regex to highlight all matches
        re = new RegExp(words[i], 'g');
        if (re.test(text)) {
            text = text.replace(re, '<' + tag + '>$&</' + tag + '>');
        }
    }

    return text;
}
/**
 * 取消高亮
 * @param  {[type]} text [description]
 * @param  {[type]} tag  [description]
 * @return {[type]}      [description]
 */
function unhighlight(text, tag) {
    // Default tag if no tag is provided
    tag = tag || 'span';
    var re = new RegExp('(<' + tag + '.+?>|<\/' + tag + '>)', 'g');
    return text.replace(re, '');
}
$('p').html(highlight(
    $('p').html(), // the text
    ['foo', 'bar', 'baz', 'hello world'], // list of words or phrases to highlight
    'strong' // custom tag
));

/**
 * 文字动起来，结合css3 transition更好
 * @param  {[type]} delay [description]
 * @param  {[type]} klass [description]
 * @return {[type]}       [description]
 */
$.fn.animateText = function(delay, klass) {

    var text = this.text();
    var letters = text.split('');

    return this.each(function() {
        var $this = $(this);
        $this.html(text.replace(/./g, '<span>$&</span>'));
        $this.find('span.letter').each(function(i, el) {
            setTimeout(function() { $(el).addClass(klass); }, delay * i);
        });
    });

};
$('p').animateText(15, 'foo');
/**
 * 逐个掩藏元素
 * @param  {[type]} ops [description]
 * @return {[type]}     [description]
 */
$.fn.fadeAll = function(ops) {
    var o = $.extend({
        delay: 500, // delay between elements
        speed: 500, // animation speed
        ease: 'swing' // other require easing plugin
    }, ops);
    var $el = this;
    for (var i = 0, d = 0, l = $el.length; i < l; i++, d += o.delay) {
        $el.eq(i).delay(d).fadeIn(o.speed, o.ease);
    }
    return $el;
}
$(elements).fadeAll({ delay: 300, speed: 300 });
/**
 * 限制文本字数
 * @param  {[type]} str    [description]
 * @param  {[type]} nwords [description]
 * @return {[type]}        [description]
 */
function excerpt(str, nwords) {
    var words = str.split(' ');
    words.splice(nwords, words.length - 1);
    return words.join(' ') +
        (words.length !== str.split(' ').length ? '…' : '');
}
/**
 * 判断响应布局中的适配度
 * @param  {[type]}  bp [description]
 * @return {Boolean}    [description]
 */
function isBreakPoint(bp) {
    // The breakpoints that you set in your css
    var bps = [320, 480, 768, 1024];
    var w = $(window).width();
    var min, max;
    for (var i = 0, l = bps.length; i < l; i++) {
        if (bps[i] === bp) {
            min = bps[i - 1] || 0;
            max = bps[i];
            break;
        }
    }
    return w > min && w <= max;
}
if (isBreakPoint(320)) {
    // breakpoint at 320 or less
}
if (isBreakPoint(480)) {
    // breakpoint between 320 and 480
}
/**
 * 全局计数
 */
$(element)
    .data('counter', 0) // begin counter at zero
    .click(function() {
        var counter = $(this).data('counter'); // get
        $(this).data('counter', counter + 1); // set
        // do something else...
    });

/**
 * 嵌入优酷视频
 * @param  {[type]} link [description]
 * @param  {[type]} ops  [description]
 * @return {[type]}      [description]
 */
function embedYouku(link, ops) {

    var o = $.extend({
        width: 480,
        height: 320,
        params: ''
    }, ops);

    var id = /\?v\=(\w+)/.exec(link)[1];

    return '<embed allowFullScreen="true" id="embedid"  quality="high" width="' + o.width + '" height="' + o.height + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" src="' + id + '?' + o.ops '"';
}
embedYouku(
    'http://static.youku.com/v/swf/qplayer.swf', { 'winType=adshow&VideoIDS=XMTE3NzQ0NTky&isAutoPlay=false&isShowRelatedVideo=false' }
);
/**
 * 动态菜单或下拉菜单
 * @param  {[type]} items [description]
 * @param  {[type]} tags  [description]
 * @return {[type]}       [description]
 */
function makeMenu(items, tags) {

    tags = tags || ['ul', 'li']; // default tags
    var parent = tags[0];
    var child = tags[1];

    var item, value = '';
    for (var i = 0, l = items.length; i < l; i++) {
        item = items[i];
        // Separate item and value if value is present
        if (/:/.test(item)) {
            item = items[i].split(':')[0];
            value = items[i].split(':')[1];
        }
        // Wrap the item in tag
        items[i] = '<' + child + ' ' +
            (value && 'value="' + value + '"') + '>' + // add value if present
            item + '</' + child + '>';
    }

    return '<' + parent + '>' + items.join('') + '</' + parent + '>';
}
// Dropdown select month
makeMenu(
    ['January:JAN', 'February:FEB', 'March:MAR'], // item:value
    ['select', 'option']
);

// List of groceries
makeMenu(
    ['Carrots', 'Lettuce', 'Tomatos', 'Milk'], ['ol', 'li']
);