(function($) {
    $.allData={
        sliderOl:'',
        sliderLi:'',
        initSet:{},
        index:0,
        timer:null
    }
	$.fn.extend({
		bannerSlider: function(options){
            $.allData.initSet = {
			    //内容容器
				contentBox: $(this),
                //图标容器
                iconBox: $(this),
                //自动播放
                autoplay: true,
                //时间间隔
                interval: 2000,
                //轮播速度
                speed: 500,
                //滚动方向 (left,right,up,down)
                direction:null,
                //当前小图标
                active:null
			};
            options  = options || {};
            $.extend( $.allData.initSet , options);
            $.allData.sliderOl = $.allData.initSet.contentBox.find('ul');
            $.allData.sliderLi = $.allData.initSet.contentBox.find('ul>li');
            /*console.log($.allData.sliderOl)
            console.log($.allData.sliderLi)*/
            $.appendIcon()
            $.iconClick()
            $.autoPlay()
            $.stopAnimate()
		}
	})
	
})(jQuery);

$.extend({
    //添加小图标
    appendIcon:function () {
        //复制第一个页面的节点
        let str =  $.allData.sliderLi.first().clone()
        //将复制的第一个节点添加到最后面
        $.allData.sliderOl.append(str)
        //添加下面的按钮
        for(let i=0;i<$.allData.sliderLi.length;i++){
            let icon = '<span ></span>';
            $.allData.initSet.iconBox.append(icon)
        }
        $.allData.initSet.iconBox.find('span').eq(0).addClass($.allData.initSet.active);
    },
    //小图标点击事件
    iconClick: function () {
        $.allData.initSet.iconBox.find('span').click(function () {
            if(!$.allData.sliderOl.is(':animated')){
                $(this).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
                $.allData.index = $(this).index()
                if($.allData.initSet.direction =='up' || $.allData.initSet.direction =='down'){
                    $.allData.sliderOl.stop().animate({
                        'margin-top': -$.allData.index*$.allData.sliderLi.eq(0).height()
                    },$.allData.initSet.speed);
                }else{
                    $.allData.sliderOl.stop().animate({
                        'margin-left': -$.allData.index*$.allData.sliderLi.eq(0).width()
                    },$.allData.initSet.speed);
                }

            }
        })
    },
    //轮播函数
    autoScroll:function () {
        let num =0
        //向上轮播
        if($.allData.initSet.direction =='up'){
            $.allData.index++;
            num++
            if($.allData.index ==$.allData.initSet.contentBox.find('ul>li').length){
                $.allData.sliderOl.css({
                    'margin-top': 0
                });
                $.allData.index = 1;
                $.allData.initSet.iconBox.find('span').eq(0).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
            }
            if($.allData.index ==$.allData.sliderLi.length){
                num=0
            }
            $.allData.sliderOl.stop().animate({
                'margin-top': -$.allData.index*$.allData.sliderLi.eq(0).height()
            }, $.allData.initSet.speed);
            $.allData.initSet.iconBox.find('span').eq(num).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
        }
        //向下轮播
        if($.allData.initSet.direction =='down'){
            $.allData.index--;
            if($.allData.index ==-1){
                let Top = ($.allData.initSet.contentBox.find('ul>li').length - 1) * $.allData.sliderLi.eq(0).height();
                $.allData.sliderOl.css({
                    'margin-top': -Top
                });
                $.allData.index = $.allData.initSet.contentBox.find('ul>li').length -2;
            }
            $.allData.sliderOl.stop().animate({
                'margin-top': -$.allData.index*$.allData.sliderLi.eq(0).height()
            }, $.allData.initSet.speed);
            $.allData.initSet.iconBox.find('span').eq($.allData.index).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
        }
        //向左轮播
       if($.allData.initSet.direction =='left'){
           $.allData.index++;
           if($.allData.index ==$.allData.initSet.contentBox.find('ul>li').length){
               $.allData.sliderOl.css({
                   'margin-left': 0
               });
               $.allData.index = 1;
               $.allData.initSet.iconBox.find('span').eq(0).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
           }
           let n=$.allData.index;
           if(n>=$.allData.sliderLi.length){
               n=0
           }
           $.allData.sliderOl.stop().animate({
               'margin-left': -$.allData.index*$.allData.sliderLi.eq(0).width()
           }, $.allData.initSet.speed);
           $.allData.initSet.iconBox.find('span').eq(n).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
       }
        //向右轮播
        if($.allData.initSet.direction =='right'){
            $.allData.index--;
            if($.allData.index ==-1){
                let Left = ($.allData.initSet.contentBox.find('ul>li').length - 1) * $.allData.sliderLi.eq(0).width();
                $.allData.sliderOl.css({
                    'margin-left': -Left
                });
                $.allData.index = $.allData.initSet.contentBox.find('ul>li').length -2;
                $.allData.initSet.iconBox.find('span').eq(0).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
            }
            let n=$.allData.index;
            if(n>=$.allData.sliderLi.length){
                n=0
            }
            $.allData.sliderOl.stop().animate({
                'margin-left': -$.allData.index*$.allData.sliderLi.eq(0).width()
            }, $.allData.initSet.speed);
            $.allData.initSet.iconBox.find('span').eq($.allData.index).addClass($.allData.initSet.active).siblings().removeClass($.allData.initSet.active);
        }
    },
    //自动播放
    autoPlay: function () {
        if($.allData.initSet.autoplay){
            $.allData.timer = setInterval($.autoScroll, $.allData.initSet.interval);
        }
    },
    //鼠标滑上停止轮播
    stopAnimate:function () {
        $.allData.initSet.iconBox.hover(function () {
            clearInterval($.allData.timer)
        },function () {
            $.autoPlay()
        })
    }
})

























