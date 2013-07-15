jQuery(function($) {
    var pos = { x: 0, y: 0, width: 0, height: 0 };
    var mousedown = false;
    var xelm = $("#x"), yelm = $("#y"), output = $("#output");
    var frame = $("#frame");
    var nameelm = $("#name"), colorelm = $("#color");
    $("#cover")
        .on("mousedown", function(e) {
            mousedown = true;
            $.extend(pos, { x: e.offsetX, y: e.offsetY });
            frame.css({ left: pos.x, top: pos.y, width: 0, height: 0 });
            console.log(e);
        })
        .on("mousemove", function(e) {
            if(mousedown) {
                var w = Math.abs(e.offsetX - pos.x);
                var h = Math.abs(e.offsetY - pos.y);
                $.extend(pos, { width: w, height: h });
                frame.css({ width: w, height: h });
            }
            xelm.text(e.offsetX);
            yelm.text(e.offsetY);
        })
        .on("mouseup", function(e) {
            mousedown = false;
            output.select().focus();
        })
        .on("mousedown mousemove mouseup", function(e) {
            output.val(build_json(pos));
        });

    function build_json(position) {
        return JSON.stringify($.extend({}, position, {
            name: nameelm.val()//, strokeStyle: colorelm.val()
        }, category(position)));
    }

    function category(p) {
        var cat = "", x = p.x, y = p.y;
        if(x > 75 && x < 180) {
            if(y > 85 && y < 535) { cat = "Agencies"; }
            else if(y > 544 && y < 700) { cat = "Ad Servers (Marketer)"; }
        } else if(x > 190 && x < 300) {
            if(y > 85 && y < 246) { cat = "Media Buying Platforms / Agency Desk"; }
            else if(y > 226 && y < 346) { cat = "Media Rep"; }
            else if(y > 360 && y < 496) { cat = "Creative Optimization"; }
            else if(y > 500 && y < 560) { cat = "Retargeting"; }
            else if(y > 567 && y < 700) { cat = "Verification / Privacy"; }
        } else if(x > 310 && x < 420) {
            if(y > 85 && y < 346) { cat = "DSPs"; }
            else if(y > 360 && y < 420) { cat = "Media Planning and Attribution"; }
            else if(y > 435 && y < 496) { cat = "Tag Management"; }
            else if(y > 500 && y < 560) { cat = "Data Feed"; }
            else if(y > 567 && y < 700) { cat = "Measurement and Analytics"; }
        } else if(x > 430 && x < 540) {
            if(y > 85 && y < 346) { cat = "Exchanges"; }
            else if(y > 360 && y < 560) { cat = "DMPs and Data Aggregators"; }
            else if(y > 567 && y < 700) { cat = "Data Suppliers"; }
        } else if(x > 545 && x < 760) {
            if(y > 85 && y < 265) { cat = "Ad Networks Horizontal"; }
            else if(y > 265 && y < 315) { cat = "Video / Rich Media"; }
            else if(y > 320 && y < 390) { cat = "Vertical / Targeted"; }
            else if(y > 400 && y < 495) { cat = "Performance"; }
            else if(y > 505 && y < 660) { cat = "Mobile"; }
        } else if (x > 765 && x < 870) {
            if(y > 85 && y < 185) { cat = "Sharing Data / Social Tools"; }
            else if(y > 190 && y < 395) { cat = "SSPs"; }
            else if(y > 405 && y < 480) { cat = "Publisher Tools"; }
            else if(y > 485 && y < 660) { cat = "Ad Servers (Publishers)"; }
        }
        return({ category: cat });
    }
});