 var SushiSprite = cc.Sprite.extend({
 		 disappearAction:null,//消失動畫
         onEnter:function () {
             cc.log("onEnter");
             this._super();

             //當sprite一進入場景時,立即bind eventhandler
             this.addTouchEventListenser();



             /*
             retain()方法表示對生成的sprite disappear效果增加一次引用。
             Cocos2d-JS遵循Cocos2d-x的內存管理原則。
             創建的disappearAction是自動釋放的，我們需要為它增加一次引用，
             以避免它被回收，在我們不需要的時候(例如: onExit)對它執行release()方法,
             釋放對它的引用。避免內存洩露。 
             在使用Cocos2d-JS的jsb模式時，部分情況是需要我們手動管理內存的。
              */

             this.disappearAction = this.createDisappearAction();
    		 this.disappearAction.retain();
            
         },

         onExit:function () {
             cc.log("onExit");
             this.disappearAction.release();
         }
         ,
         addTouchEventListenser:function(){
     		//創建了一個Touch事件監聽器touchListener
     		this.touchListener = cc.EventListener.create({
		        
		         event: cc.EventListener.TOUCH_ONE_BY_ONE,
		         
		         // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
		         swallowTouches: true,
		       
		         //onTouchBegan event callback function   
		         // 在touch事件中，我們還可以添加onTouchMoved/onTouchEnded方法監聽touch移動和結束的回調。如果onTouchBegan返回false後onTouchMoved/onTouchEnded不會執行。                   
		         //onTouchBegan方法處理觸摸點擊按下事件
		         onTouchBegan: function (touch, event) { 
		            
		             var pos = touch.getLocation();

		             var target = event.getCurrentTarget();  

		             //判斷點擊的點是否在SushiSprite上
		             if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {

		             	//SushiSprite的點中響應函數中調用 scene addScore更新得分
		             	//addScore
		             	target.getParent().addScore();
		             	console.log('target.getParent() = %o',target.getParent());
						//target.getParent().removeSushiByindex(target.index - 1);
		             	
		             	 //移除註冊的touch事件避免被再次點擊。
		                 cc.eventManager.removeListeners(target)

		                 //停止SUshiSprite正在播放的動作。
		                  target.stopAllActions();

		                  //
		                    const ac = target.disappearAction;

		                    //cc.Sequence創建了Sushi消失的動作序列
		                    //`cc.CallFunc`是Cocos2d-JS中提供的動畫播放結束的處理回調
		                    const seqAc = cc.Sequence
		                    				.create( ac, 
		                    					cc.CallFunc.create(()=>{
		                    						cc.log('callfun.......');
		                    						target.removeFromParent();
		                    					},target));

		                  //
		                   target.runAction(seqAc);



						//`stopAllActions()`停止SUshiSprite正在播放的動作。
						//`cc.Sequence`是按序列播放動作。
						//`cc.CallFunc`是Cocos2d-JS中提供的動畫播放結束的處理回調
						//上面的代碼通過cc.Sequence創建了Sushi消失的動作序列，
						//並在動作結束後從層上移除SushiSprite.
		                 return true;
		             }

		             //如果onTouchBegan返回false後onTouchMoved/onTouchEnded不會執行。
		             return false;
		         }
		     	
		     });  
     		  //註冊監聽器到事件管理器
		      cc.eventManager.addListener(this.touchListener,this);       

        }
        ,
        createDisappearAction(){
        	/*
        	根據.plist文件中的信息可以方便獲取到各幀圖片。 
        	cc.spriteFrameCache.getSpriteFrame(str)方法可以獲取到各個精靈幀。
        	 */
        	let frames = [],i = 0
        	for(;i < 11 ; i++){
        		frames.push(cc.spriteFrameCache.getSpriteFrame(`sushi_1n_${i}.png`));
        	}
        	let animation = new cc.Animation(frames,0.02);
        	let action = new cc.Animate(animation);
        	return action;
        }
 });


