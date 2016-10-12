const PlayLayer = cc.Layer.extend({
	bgSprite: null,
	sushiSprites:null,
	timeout:60,
	score:0,

	scoreLabel:null,
	timeoutLabel:null,





	ctor: function(){
		
		this._super();
		const size = cc.winSize;

		console.log(`[PlayLayer:ctor]winSize.width = %c${size.width}, winSize.height = %c${size.height}`,"color:purple","color:green" );

		this.sushiSprites = [];

		//add background
		this.bgSprite = new cc.Sprite(res.BackGround_png);
		this.bgSprite.attr({
			x: size.width / 2,
			y: size.height / 2,
			//scale: 0.5,
		 	rotation: 180
		});
		this.setUp(size);
		 this.addChild(this.bgSprite, 0);

		 //Cocos2d-JS中提供了cc.spriteFrameCache管理精靈緩存，通過cc.spriteFrameCache可以方便的讀取打包好的大圖到內存
		 cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);

		//Cocos2d-JS中提供了三種Schedule
		//  schedule(callback_fn, interval, repeat, delay)
		//  scheduleOnce(callback_fn, delay) , 該函數只調用一次callback_fn的方法
		//  scheduleUpdate()該函數會每一幀都調用，調用的方法名為"update"
		//  
		 
		//  schedule(callback_fn, interval, repeat, delay) 
		//  創建了一個定時器每隔一秒無限重複執行update函數，添加SushiSprite。當然你也可以使用scheduleUpdate實現。 
		this.schedule(this.addSushi,3,16*1024,1);
		this.schedule(this.removeSushi,1,16*1024,0); 




		//timer倒計時60
        this.schedule(this.timer, 1,this.timeout,1);

	     
	},
	setUp:function(size){

		this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
    	this.scoreLabel.attr({
	        x: size.width/2 + size.width/4,
	        y: size.height - 20
    	});
       this.addChild(this.scoreLabel, 5);


		// timeout 60
	    this.timeoutLabel = cc.LabelTTF.create("" + this.timeout, "Arial", 30);
	    this.timeoutLabel.x = size.width/2 - size.width/4;
	    this.timeoutLabel.y = size.height - 20;
	    this.addChild(this.timeoutLabel, 5);

	}
	,
	addSushi: function(){

		const sushi = new SushiSprite(res.Sushi_png);

		const size = cc.winSize;

		const x = (sushi.width / 2 )+ size.width / 2 * cc.random0To1();

		sushi.attr({
			x: x,
			y: size.height 
		});

		this.addChild(sushi);


		//cc.MoveTo.create(speed, cc.p(sushi.x, -30));
		const dropAction = cc.MoveTo.create(4, cc.p(sushi.x, -30));//cc.MoveTo使一個Node做直線運動,在規定時間內移動到指定位置
		
		sushi.runAction(dropAction);

		this.sushiSprites.push(sushi);

	},	
	removeSushi: function(){	

		this.sushiSprites.forEach(s=>{
			if(0 > s.y){
				let idx = this.sushiSprites.indexOf(s);
				
				s.removeFromParent();
				this.sushiSprites[idx] = undefined;
				this.sushiSprites.splice(idx,1);
			}
		});
	}
	,
	addScore:function(){
		this.score += 1;
		this.scoreLabel.setString(`score: ${this.score}`);
	}
	,
	timer:function(){

		if(this.timeout == 0){
			let gameOver = new cc.LayerColor( cc.color(255,255,255,100));
			let size = cc.winSize;
			let titleLabel = new cc.LabelTTF("遊戲結束", "Arial", 38);
			titleLabel.attr({
				x: size.width / 2,
				y: size.height / 2
			});

			gameOver.addChild(titleLabel,5);

			let TryAgainItem = new cc.MenuItemFont(
				"再試一次",
				function(){
					cc.log("Menu is clicked");
					let transition = cc.TransitionFade(1, new PlayScene(), cc.color(255,255,255,255));
					cc.director.runScene(transition);
				},
				 this);

			let menu = new cc.Menu(TryAgainItem);
			menu.x = 0;
			menu.y = 0;
			gameOver.addChild(menu,1);
			this.getParent().addChild(gameOver);

			this.unschedule(this.update);
			this.unschedule(this.timer);
			return;
		}
		this.timeout -=1;
		this.timeoutLabel.setString(this.timeout);
	}
});

const PlayScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		const layer = new PlayLayer();
		this.addChild(layer);
	}
});