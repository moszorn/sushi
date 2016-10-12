/*
一個場景至少有一個層(Layer)作為孩子節點。
 */
var CC ;
var StartLayer = cc.Layer.extend({
      ctor:function () {
          this._super();
 		  console.info('[StartLayer]this = %c%o','color:green',this);
          var size = cc.winSize;
          console.info('[StartLayer]cc.winSize = %c%o','color:green',size);

          var helloLabel = new cc.LabelTTF("Sushi World", "", 38);
          helloLabel.x = size.width / 2;
          helloLabel.y = size.height / 2;
          this.addChild(helloLabel);

          //add background
          this.bgSprite = new cc.Sprite(res.BackGround_png);  // new cc.Sprite創建一個精靈
          this.bgSprite.attr({
          	x:size.width / 2 , 
          	y:size.height / 2
          });
          this.addChild(this.bgSprite,0);

          CC = cc;
          //add start menu
          const startItem = new cc.MenuItemImage(
          	res.Start_N_png,
          	res.Start_S_png,
          	()=> {
          		cc.log('[lamda] Menu is clicked , cc: %o' , cc); 
          		//cc.director.replaceScene( cc.TransitionPageTurn(1, new PlayScene(), false) );
				cc.director.runScene(new PlayScene());
            },
          	this);
          startItem.attr({
          	x:size.width/2,
          	y:size.height/2,
          	anchorX:0.5,
          	anchorY:0.5
          });

          const menu = new cc.Menu(startItem);
          menu.x = 0 ; menu.y = 0 ;
          this.addChild(menu,1);




          return true;
      }
  });

  var StartScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var layer = new StartLayer();
          this.addChild(layer);
      }
  });