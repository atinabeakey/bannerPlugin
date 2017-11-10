$.extend({
	init:function(){
		/*$('.upDownlist').bannerSlider({
			imgBox: $('.upDownlist'),
            iconBox: $('.upDownlist .iconBtn'),
			active: 'action',
			autoPlay: true,
			interval: 2000,
			speed: 1000,
			direction: 'down'
		});*/
        $('.leftRight').bannerSlider({
            imgBox: $('.leftRight'),
            iconBox: $('.leftRight .iconBtn'),
            active: 'action',
            autoPlay: true,
            interval: 2000,
            speed: 1000,
            direction: 'right'
        });
	},
});

$.init()
