//devin87@qq.com
(function () {
    "use strict";

    //获取页名称
    function get_page_name(pathname) {
        pathname = pathname || location.pathname;
        pathname = pathname.toLowerCase().replace(/\\/g, "/");

        var index = pathname.lastIndexOf("/");

        return index != -1 ? pathname.slice(index + 1) : pathname;
    }

    var PAGE_NAME = get_page_name();

    var list_page = [
        // { title: "默认上传", href: "default.html" },
        // { title: "简单上传", href: "simple.html" },
        // { title: "秒传+断点续传（仅html5）", href: "slice.html" },
        // { title: "指定上传类型", href: "simple-filetype.html" },
        // { title: "图片预览+缩放+上传", href: "custom-image.html" },
        // { title: "html4+滚动区域", href: "scroll-view.html" },
        // { title: "文件单选", href: "simple-single.html" },
        // { title: "手动上传", href: "simple-not-auto.html" },
        // { title: "多个上传管理器", href: "tabs.html" },
        { title: "上传Unity zip文件", href: "index.html" },
        { title: "上传模型", href: "unitymodel.html" },
        { title: "展示模型", href: "unitymodellist.html" }  //展示模型 并删除和编辑操作 
    ];

    var map_page = {};

    function draw_sidebar() {
        var html = [];
        html.push('<div class="title">导航</div>');
        html.push('<ul>');
        for (var i = 0, len = list_page.length; i < len; i++) {
            var item = list_page[i],
                href = item.href;

            item.index = i;
            map_page[href] = item;

            html.push('<li' + (href == PAGE_NAME ? ' class="on"' : '') + '><a href="' + item.href + '">' + item.title + '</a></li>');
        }
        html.push('</ul>');

        document.getElementById("sidebar").innerHTML = html.join('');
    }

    function init() {
        draw_sidebar();

        var boxHeader = document.getElementById("header"),
            page = map_page[PAGE_NAME];

        if (!boxHeader || !page) return;

        if (boxHeader.innerHTML == "Header") boxHeader.innerHTML = page.title;
    }

    init();

    //------------------- export -------------------

    window.UPLOAD_URL = "/upload";

})();