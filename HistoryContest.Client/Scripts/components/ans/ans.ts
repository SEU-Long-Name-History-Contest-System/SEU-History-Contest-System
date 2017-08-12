import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';

var init={'questions':[{'question':'南京高等师范学校继三所师范学校成为我国成立的最早的第四所国立高等师范学校，其中不是这三所学校之一的是：','answers':['武昌高师','北京高师','长沙高师','广州高师'],'correctAnswer':3},
{'question':'江谦认为国家的富强有赖于科学、实业的发达，先后增设了三个专修科，其中哪一个不属于这三科之一？','answers':['农业','工业','商业','教育业'],'correctAnswer':4},
{'question':'下面哪一项不属于郭秉文的“自动主义”？','answers':['学习上的自学和自力研究','思想上的自律和自强','生活上的自立和自理','学术、文化、体育活动的自行组织和主办'],'correctAnswer':2},
{'question':'下面哪一项不是南京高等师范学院办学者的宗旨（南京高等师范学院教育的特色）？','answers':['倡导学生的爱国精神，为国家培养科学人才','调和文理，沟通中西，积极引进国外的先进科学技术','用科学的精神办教育，用科学的方法育才','促进教育、科学的共同发展，促进科学人才的成长和脱颖而出'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1}],
'TFs':[{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2}]


};


	
       
var content = '',
    questionsIteratorIndex,
    answersIteratorIndex;
    
    //生成网页
function set(){
    //生成多选题html
    for (questionsIteratorIndex = 0; questionsIteratorIndex < init.questions.length; questionsIteratorIndex++) {
        content += '<section class="panel"><div class="inner columns" id="q'+(questionsIteratorIndex + 1)+'">'//题目id，为网页内链接表示（实现按钮跳转到下一题）
        +'<div class="intro joined"><h1>'+(questionsIteratorIndex + 1)+'</h1></div>'//网页上显示的题目序号
        +'<div class="span-3-25"><h3 class="major">'+ init.questions[questionsIteratorIndex].question+'</h3>';//问题内容
        for (answersIteratorIndex = 0; answersIteratorIndex < 4; answersIteratorIndex++) {//四个选项
            content += '<div class="field quarter"><input type="radio"'
            +' id="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)//选项id，该id名称应与后端协商确定，与提交表单有关
            +'" value="'+answersIteratorIndex
            +'" onclick="saveAns(this)"'
            +'" name="question'+(questionsIteratorIndex + 1)+'" class="color2" />'//单选radio的name，同上
            +'<label for="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)+'">'//同上 关于for属性可以参见参考文档
            +init.questions[questionsIteratorIndex].answers[answersIteratorIndex] +'</label></div><br>';//选项内容
        }
        content += '</div>';
    //    if(questionsIteratorIndex+1!= init.questions.length){
            content += '<div class="intro  joined"><ul class="actions"><li><a href="#q'+(questionsIteratorIndex + 2)+'" class="button  color1 circle icon fa-angle-right">Next</a></li></ul></div></div></section>';        
            content+='<section class="panel spotlight large right" ><div class="image  tinted" data-position="top left"><img src="images/background'+(questionsIteratorIndex%9)+'.jpg" alt="" /></div></section>'
    //    }
    }

    //生成判断题html
     for (; questionsIteratorIndex < init.questions.length+init.TFs.length; questionsIteratorIndex++) {//延续之前的索引
        content += '<section class="panel"><div class="inner columns" id="q'+(questionsIteratorIndex + 1)+'">'
        +'<div class="intro joined"><h1>'+(questionsIteratorIndex + 1)+'</h1></div>'
        +'<div class="span-3-25"><h3 class="major">'+ init.questions[questionsIteratorIndex-init.TFs.length].question+'</h3>';
        for (answersIteratorIndex = 0; answersIteratorIndex < 2; answersIteratorIndex++) {//两个选项
            content += '<div class="field quarter"><input type="radio" id="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)
            +'" value="'+answersIteratorIndex
            +'" onclick="saveAns(this)"'
            +'" name="question'+(questionsIteratorIndex + 1)+'" class="color2" />'
            +'<label for="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)+'">'
            +(answersIteratorIndex==0?'正确':'错误') +'</label></div><br>';//判断题，选项为正确或错误
        }
        content += '</div>';
        if(questionsIteratorIndex+1!= init.questions.length+init.TFs.length){//如果是最后一题，那么不需要有下一页按钮
            content += '<div class="intro  joined"><ul class="actions"><li><a href="#q'+(questionsIteratorIndex + 2)+'" class="button  color1 circle icon fa-angle-right">Next</a></li></ul></div></div></section>'; 
               
        content+='<section class="panel spotlight large right" ><div class="image  tinted" data-position="top left"><img src="images/background'+(questionsIteratorIndex %9)+'.jpg" alt="" /></div></section>'
        }
        else{
             content += '<div class="intro  joined"><ul class="actions"><li><a href="#submission" class="button  color1 circle icon fa-angle-right">Next</a></li></ul></div></div></section>'; 
        }
        
    }
    $('#quiz-container').append(content);//生成html
    $('#multiple-sum').text(init.questions.length); //欢迎页显示选择题数量
    $('#TF-sum').text(init.TFs.length);     //判断题数量
}

var contentFooter='';
function answerCard(){
    
    for(var i=0;i<init.questions.length+init.TFs.length;i++){
        contentFooter +='<a href="#q'+(i+1)+'" id="question'+(i+1)+'" class="questionId">'+(i+1)+"</a>";
        
    }
    $("#answerCard").html(contentFooter);
}

$(function(){
    set();//初始化
    answerCard();
    
	var mm = 30;//分
	var ss = 0;//秒
	var timeState = false;//时间状态 默认为true 开启时间


	/*实现计时器*/
	
	var time= setInterval(function () {
		if (timeState) {
			if(mm==0&&ss==1){
				ss--;
				alert("时间到！");
				$(".time").hide();
				
			}
			else{
				str = "";
				if (ss-- == 0) {
					--mm;
					ss = 59;
				}
				
				
				str += mm < 10 ? "0" + mm : mm;
				str += ":";
				str += ss < 10 ? "0" + ss : ss;
				$(".time").text(str);
			}
		
		} 
		else {
			$(".time").text(' ');
		}
	}, 1000);

		var answerQues=[];//name,answer(id)



$(document).ready(function(){

    $("#start").click(function () {
		 $("#footer").show();
        timeState = true;

		 
	});
	$(document).mousemove(function(e){ //当用户直接拖拽而不是点击开始按钮时，到达题目位置也会开始计时
		if(e.pageX>window.innerWidth){
			timeState=true; 
			 $("#footer").show();
		}
  });

  

  
});
		
		// Settings.
		var settings = {

			
			// Scroll wheel.
				scrollWheel: {

					// If true, enables scrolling via the scroll wheel.
						enabled: true,

					// Sets the scroll wheel factor. (Ideally) a value between 0 and 1 (lower = slower scroll, higher = faster scroll).
						factor: 1

				},

		

			// Dragging.
				dragging: {

					// If true, enables scrolling by dragging the main wrapper with the mouse.
						enabled: false,

					// Sets the momentum factor. Must be a value between 0 and 1 (lower = less momentum, higher = more momentum, 0 = disable momentum scrolling).
						momentum: 0.875,

					// Sets the drag threshold (in pixels).
						threshold: 10

				},

			// If set to a valid selector , prevents key/mouse events from bubbling from these elements.
				excludeSelector: 'input:focus, select:focus, textarea:focus, audio, video, iframe',

			// Link scroll speed.
				linkScrollSpeed: 1000

		};

	// Skel.
		skel.breakpoints({
			xlarge: '(max-width: 1680px)',
			large: '(max-width: 1280px)',
			medium: '(max-width: 980px)',
			small: '(max-width: 736px)',
			xsmall: '(max-width: 480px)',
			xxsmall: '(max-width: 360px)',
			short: '(min-aspect-ratio: 16/7)',
			xshort: '(min-aspect-ratio: 16/6)'
		});

	// Ready event.
		$(function() {

			// Vars.
				var	$window = $(window),
					$document = $(document),
					$body = $('body'),
					$html = $('html'),
					$bodyHtml = $('body,html'),
					$wrapper = $('#wrapper'),
					$footer=$('#footer');

			// Disable animations/transitions until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// Tweaks/fixes.

				// Mobile: Revert to native scrolling.
					if (skel.vars.mobile) {

						// Disable all scroll-assist features.
							settings.scrollWheel.enabled = false;
							settings.dragging.enabled = false;

						// Re-enable overflow on body.
							$body.css('overflow-x', 'auto');

					}

				// IE: Various fixes.
					if (skel.vars.browser == 'ie') {

						// Enable IE mode.
							$body.addClass('is-ie');

						// Page widths.
							$window
								.on('load resize', function() {

									// Calculate wrapper width.
										var w = 0;

										$wrapper.children().each(function() {
											w += $(this).width();
										});

									// Apply to page.
										$html.css('width', w + 'px');

								});

					}

				// Polyfill: Object fit.
					if (!skel.canUse('object-fit')) {

						$('.image[data-position]').each(function() {

							var $this = $(this),
								$img = $this.children('img');

							// Apply img as background.
								$this
									.css('background-image', 'url("' + $img.attr('src') + '")')
									.css('background-position', $this.data('position'))
									.css('background-size', 'cover')
									.css('background-repeat', 'no-repeat');

							// Hide img.
								$img
									.css('opacity', '0');

						});

					}

			// Scroll wheel.
				if (settings.scrollWheel.enabled)
					(function() {

						// Based on code by @miorel + @pieterv of Facebook (thanks guys :)
						// github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
							var normalizeWheel = function(event) {

								var	pixelStep = 10,
									lineHeight = 40,
									pageHeight = 800,
									sX = 0,
									sY = 0,
									pX = 0,
									pY = 0;

								// Legacy.
									if ('detail' in event)
										sY = event.detail;
									else if ('wheelDelta' in event)
										sY = event.wheelDelta / -120;
									else if ('wheelDeltaY' in event)
										sY = event.wheelDeltaY / -120;

									if ('wheelDeltaX' in event)
										sX = event.wheelDeltaX / -120;

								// Side scrolling on FF with DOMMouseScroll.
									if ('axis' in event
									&&	event.axis === event.HORIZONTAL_AXIS) {
										sX = sY;
										sY = 0;
									}

								// Calculate.
									pX = sX * pixelStep;
									pY = sY * pixelStep;

									if ('deltaY' in event)
										pY = event.deltaY;

									if ('deltaX' in event)
										pX = event.deltaX;

									if ((pX || pY)
									&&	event.deltaMode) {

										if (event.deltaMode == 1) {
											pX *= lineHeight;
											pY *= lineHeight;
										}
										else {
											pX *= pageHeight;
											pY *= pageHeight;
										}

									}

								// Fallback if spin cannot be determined.
									if (pX && !sX)
										sX = (pX < 1) ? -1 : 1;

									if (pY && !sY)
										sY = (pY < 1) ? -1 : 1;

								// Return.
									return {
										spinX: sX,
										spinY: sY,
										pixelX: pX,
										pixelY: pY
									};

							};

						// Wheel event.
							$body.on('wheel', function(event) {

								// Disable on <=small.
									if (skel.breakpoint('small').active)
										return;

								// Prevent default.
									event.preventDefault();
									event.stopPropagation();

								// Stop link scroll.
									$bodyHtml.stop();

								// Calculate delta, direction.
									var	n = normalizeWheel(event.originalEvent),
										x = (n.pixelX != 0 ? n.pixelX : n.pixelY),
										delta = Math.min(Math.abs(x), 150) * settings.scrollWheel.factor,
										direction = x > 0 ? 1 : -1;

								// Scroll page.
									$document.scrollLeft($document.scrollLeft() + (delta * direction));

							});

					})();

			

			// Dragging.
				if (settings.dragging.enabled)
					(function() {

						var dragging = false,
							dragged = false,
							distance = 0,
							startScroll,
							momentumIntervalId, velocityIntervalId,
							startX, currentX, previousX,
							velocity, direction;

						$wrapper

							// Prevent image drag and drop.
								.on('mouseup mousemove mousedown', '.image, img', function(event) {
									event.preventDefault();
								})

							// Prevent mouse events inside excluded elements from bubbling.
								.on('mouseup mousemove mousedown', settings.excludeSelector, function(event) {

									// Prevent event from bubbling.
										event.stopPropagation();

									// End drag.
										dragging = false;
										$wrapper.removeClass('is-dragging');
										clearInterval(velocityIntervalId);
										clearInterval(momentumIntervalId);

									// Pause scroll zone.
										$wrapper.triggerHandler('---pauseScrollZone');

								})

							// Mousedown event.
								.on('mousedown', function(event) {

									// Disable on <=small.
										if (skel.breakpoint('small').active)
											return;

									// Clear momentum interval.
										clearInterval(momentumIntervalId);

									// Stop link scroll.
										$bodyHtml.stop();

									// Start drag.
										dragging = true;
										$wrapper.addClass('is-dragging');

									// Initialize and reset vars.
										startScroll = $document.scrollLeft();
										startX = event.clientX;
										previousX = startX;
										currentX = startX;
										distance = 0;
										direction = 0;

									// Initialize velocity interval.
										clearInterval(velocityIntervalId);

										velocityIntervalId = setInterval(function() {

											// Calculate velocity, direction.
												velocity = Math.abs(currentX - previousX);
												direction = (currentX > previousX ? -1 : 1);

											// Update previous X.
												previousX = currentX;

										}, 50);

								})

							// Mousemove event.
								.on('mousemove', function(event) {

									// Not dragging? Bail.
										if (!dragging)
											return;

									// Velocity.
										currentX = event.clientX;

									// Scroll page.
										$document.scrollLeft(startScroll + (startX - currentX));

									// Update distance.
										distance = Math.abs(startScroll - $document.scrollLeft());

									// Distance exceeds threshold? Disable pointer events on all descendents.
										if (!dragged
										&&	distance > settings.dragging.threshold) {

											$wrapper.addClass('is-dragged');

											dragged = true;

										}

								})

							// Mouseup/mouseleave event.
								.on('mouseup mouseleave', function(event) {

									var m;

									// Not dragging? Bail.
										if (!dragging)
											return;

									// Dragged? Re-enable pointer events on all descendents.
										if (dragged) {

											setTimeout(function() {
												$wrapper.removeClass('is-dragged');
											}, 100);

											dragged = false;

										}

									// Distance exceeds threshold? Prevent default.
										if (distance > settings.dragging.threshold)
											event.preventDefault();

									// End drag.
										dragging = false;
										$wrapper.removeClass('is-dragging');
										clearInterval(velocityIntervalId);
										clearInterval(momentumIntervalId);

									// Pause scroll zone.
										$wrapper.triggerHandler('---pauseScrollZone');

									// Initialize momentum interval.
										if (settings.dragging.momentum > 0) {

											m = velocity;

											momentumIntervalId = setInterval(function() {

												// Scroll page.
													$document.scrollLeft($document.scrollLeft() + (m * direction));

												// Decrease momentum.
													m = m * settings.dragging.momentum;

												// Negligible momentum? Clear interval and end.
													if (Math.abs(m) < 1)
														clearInterval(momentumIntervalId);

											}, 15);

										}

								});

					})();

			// Link scroll.
				$wrapper
					.on('mouseup mousemove mousedown', '.image, img', function(event) {
									event.preventDefault();
								})
					.on('mousedown mouseup', 'a[href^="#"]', function(event) {

						// Stop propagation.
							event.stopPropagation();

					})
					.on('click', 'a[href^="#"]', function(event) {

						var	$this = $(this),
							href = $this.attr('href'),
							$target, x, y;

						// Get target.
							if (href == '#'
							||	($target = $(href)).length == 0)
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Calculate x, y.
							if (skel.breakpoint('small').active) {

								x = $target.offset().top - (Math.max(0, $window.height() - $target.outerHeight()) / 2);
								y = { scrollTop: x };

							}
							else {

								x = $target.offset().left - (Math.max(0, $window.width() - $target.outerWidth()) / 2);
								y = { scrollLeft: x };

							}

						// Scroll.
							$bodyHtml
								.stop()
								.animate(
									y,
									settings.linkScrollSpeed,
									'swing'
								);

					});

				$footer
					.on('mousedown mouseup', 'a[href^="#"]', function(event) {

						// Stop propagation.
							event.stopPropagation();

					})
					.on('click', 'a[href^="#"]', function(event) {

						var	$this = $(this),
							href = $this.attr('href'),
							$target, x, y;

						// Get target.
							if (href == '#'
							||	($target = $(href)).length == 0)
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Calculate x, y.
							if (skel.breakpoint('small').active) {

								x = $target.offset().top - (Math.max(0, $window.height() - $target.outerHeight()) / 2);
								y = { scrollTop: x };

							}
							else {

								x = $target.offset().left - (Math.max(0, $window.width() - $target.outerWidth()) / 2);
								y = { scrollLeft: x };

							}

						// Scroll.
							$bodyHtml
								.stop()
								.animate(
									y,
									settings.linkScrollSpeed,
									'swing'
								);

					});

			// Gallery.
				$('.gallery')
					.on('click', 'a', function(event) {

						var $a = $(this),
							$gallery = $a.parents('.gallery'),
							$modal = $gallery.children('.modal'),
							$modalImg = $modal.find('img'),
							href = $a.attr('href');

						// Not an image? Bail.
							if (!href.match(/\.(jpg|gif|png|mp4)$/))
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Lock.
							$modal[0]._locked = true;

						// Set src.
							$modalImg.attr('src', href);

						// Set visible.
							$modal.addClass('visible');

						// Focus.
							$modal.focus();

						// Delay.
							setTimeout(function() {

								// Unlock.
									$modal[0]._locked = false;

							}, 600);

					})
					.on('click', '.modal', function(event) {

						var $modal = $(this),
							$modalImg = $modal.find('img');

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Already hidden? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Stop propagation.
							event.stopPropagation();

						// Lock.
							$modal[0]._locked = true;

						// Clear visible, loaded.
							$modal
								.removeClass('loaded')

						// Delay.
							setTimeout(function() {

								$modal
									.removeClass('visible')

								// Pause scroll zone.
									$wrapper.triggerHandler('---pauseScrollZone');

								setTimeout(function() {

									// Clear src.
										$modalImg.attr('src', '');

									// Unlock.
										$modal[0]._locked = false;

									// Focus.
										$body.focus();

								}, 475);

							}, 125);

					})
					.on('keypress', '.modal', function(event) {

						var $modal = $(this);

						// Escape? Hide modal.
							if (event.keyCode == 27)
								$modal.trigger('click');

					})
					.on('mouseup mousedown mousemove', '.modal', function(event) {

						// Stop propagation.
							event.stopPropagation();

					})
					.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
						.find('img')
							.on('load', function(event) {

								var $modalImg = $(this),
									$modal = $modalImg.parents('.modal');

								setTimeout(function() {

									// No longer visible? Bail.
										if (!$modal.hasClass('visible'))
											return;

									// Set loaded.
										$modal.addClass('loaded');

								}, 275);

							});

		});

}
)



export default class AppComponent extends Vue {
}
