(function($) {
    $.extend($, {
        imap: function() {
            var json;
            $.getJSON('data/latest.json'+'?'+$.now())
                .done(function(data, status) {
                    json = data;
                    build();
                });

            function build() {
                if($('#companies #c0').length == 0) {
                    $('#companies').append(
                        $('<input type="radio">').attr({ id: 'c0', name: 'c' })
                            .on('click', function() {
                                $('#imap')
                                    .removeLayerGroup('choice')
                                    .drawLayers();
                            }).hide()
                    ).append(
                        $('<label for="c0">').append(
                            $('<span>').text("選択解除"))
                    );
                }

                $.each(json.data, function(i, company) {
                    if($('#companies #c'+(i+1)).length > 0) return true;
                    $('#companies').append(
                        $('<input type="radio">').attr({
                            id: 'c'+(i+1), name: 'c'
                        })
                            .on('click', function() {
                                $('#imap')
                                    .removeLayerGroup('choice')
                                    .drawLayers()
                                    .drawRect({
                                        x:0, y:0, width: 1000, height: 746,
                                        fromCenter: false,
                                        fillStyle: "rgba(0,0,0,0.5)",
                                        layer: true, group: 'choice',
                                        name: null
                                    });
                                $.each(company.parts, function(j, area) {
                                    $('#imap')
                                        .drawImage($.extend({}, area, {
                                            source: 'img/cmap_2013.png',
                                            fromCenter: false,
                                            sx: area.x, sy: area.y,
                                            sWidth: area.width,
                                            sHeight : area.height,
                                            cropFromCenter: false,
                                            strokeStyle: company.color,
                                            strokeWidth: 3,
                                            cornerRadius: 3,
                                            layer: true, group: 'choice',
                                            name: null
                                        }));
                                });
                            })
                    ).append(
                        $('<label for="c'+(i+1)+'">').append(
                            $('<img>').attr('src', 'img/c/'+company.logo)
                        )
                    );
                });
            }
        }
    });
})(jQuery);

jQuery(function($) {
    $('#imap')
        .drawImage({
            source: 'img/cmap_2013.png', fromCenter: false,
            layer: true, name: 'stage',
            load: $.imap
        });
});