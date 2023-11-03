//Create ArenaScene Phaser SubClass
class ArenaScene extends Phaser.Scene {
    constructor() {
        //parameter for phaser class to allow phaser to reference subclass
		super({ key: 'ArenaScene' })
	}
    preload(){
        //no preloads for this subclass
    }
    create(){
        gameState.scene = this;
        gameState.input = this.input;
        gameState.mouse = this.input.mousePointer;
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,ESC,RIGHT,LEFT');
        this.time.addEvent({
            delay: 360000,
            callback: ()=>{
                gameState.scene.scene.stop('ArenaScene');
                gameState.scene.scene.stop('CameraScene');
                gameState.scene.scene.start('MenuScene');
            },  
            startAt: 0,
            timeScale: 1
        });
        
       
        this.add.image(0,0,'blackBackground').setOrigin(0,0).setScale(10).setDepth(0);
        var officeBg = this.add.sprite(0,0,'officeBackground').setOrigin(0,0).setDepth(3);
        officeBg.anims.play('officeBackgroundAction','true');
        
        
        gameState.rightDoor = this.add.sprite(0,0,'rightDoor').setOrigin(0,0).setDepth(3);
        gameState.rightDoor.setFrame(9);
        gameState.leftDoor = this.add.sprite(0,0,'leftDoor').setOrigin(0,0).setDepth(3);
        gameState.leftDoor.setFrame(9);
        gameState.ventDoor = this.add.sprite(0,0,'ventDoor').setOrigin(0,0).setDepth(3);
        gameState.ventDoor.setFrame(9);
        gameState.cameraMoniter = this.add.sprite(0,0,'cameraMoniter').setOrigin(0,0).setDepth(3);
        gameState.cameraMoniter.setFrame(15);
        gameState.inputTimer = 60;
        
        this.scene.launch('CameraScene');
        this.scene.pause('CameraScene');
        this.scene.bringToTop('ArenaScene');
        
        var powerText = this.add.text(100, 50, `Power ${Math.floor(gameState.power)}%`, {
            fill: '#FFFFFF', 
            fontSize: `20px`,
            fontFamily: 'LiberationSansNarrow',
            strokeThickness: 1,
        }).setInteractive().setDepth(3);
        var powerChecker = this.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.power -= 0.0065*gameState.usage;
                powerText.setText(`Power ${Math.floor(gameState.power)}%`);
                if(gameState.power <= 0){
                    powerChecker.destroy();
                    powerText.destroy();
                    gameState.locked = true;
                    if(gameState.rightDoorStatus == true){
                        gameState.rightDoor.anims.play('rightDoorClose','true');
                        gameState.rightDoorStatus = true;
                    }if(gameState.leftDoorStatus == true){
                        gameState.leftDoor.anims.play('leftDoorOpen','true');
                        gameState.leftDoorStatus = false;
                    }if (gameState.ventDoorStatus == true){
                        gameState.ventDoor.anims.play('ventDoorOpen','true');
                        gameState.ventDoorStatus = false;
                    }if (gameState.cameraMoniterStatus == true){
                        gameState.cameraMoniter.anims.play('cameraMoniterClose','true');
                        gameState.scene.scene.pause('CameraScene');
                        gameState.scene.scene.bringToTop('ArenaScene');
                        gameState.cameraMoniterStatus = false;
                    }
                    officeBg.setFrame(5);
                }
            },  
            startAt: 0,
            timeScale: 1,
            repeat:-1
        });
        
        gameState.ennard.movement(this);
    }
    update(){
        gameState.inputTimer++;
        if(gameState.inputTimer>30&&gameState.locked == false){
            if(gameState.keys.A.isDown){
                gameState.inputTimer = 0;
                if(gameState.leftDoorStatus == false){
                    gameState.leftDoor.anims.play('leftDoorClose','true');
                    gameState.leftDoorStatus = true;
                    gameState.usage += 1;
                }else{
                    gameState.leftDoor.anims.play('leftDoorOpen','true');
                    gameState.leftDoorStatus = false;
                    gameState.usage -= 1;
                }
            }
            else if(gameState.keys.D.isDown){
                gameState.inputTimer = 0;
                if(gameState.rightDoorStatus == false){
                    gameState.rightDoor.anims.play('rightDoorClose','true');
                    gameState.rightDoorStatus = true;
                    gameState.usage += 1;
                }else{
                    gameState.rightDoor.anims.play('rightDoorOpen','true');
                    gameState.rightDoorStatus = false;
                    gameState.usage -= 1;
                }
            }
            else if(gameState.keys.W.isDown){
                gameState.inputTimer = 0;
                if(gameState.ventDoorStatus == false){
                    gameState.ventDoor.anims.play('ventDoorClose','true');
                    gameState.ventDoorStatus = true;
                    gameState.usage += 1;
                }else{
                    gameState.ventDoor.anims.play('ventDoorOpen','true');
                    gameState.ventDoorStatus = false;
                    gameState.usage -= 1;
                }
            }
            else if(gameState.keys.S.isDown){
                gameState.inputTimer = 0;
                if(gameState.cameraMoniterStatus == false){
                    gameState.cameraMoniter.anims.play('cameraMoniterOpen','true');
                    this.time.addEvent({
                        delay: 300,
                        callback: ()=>{
                            gameState.cameraMoniterStatus = true;
                            gameState.usage += 1;
                            gameState.scene.scene.resume('CameraScene');
                            gameState.scene.scene.bringToTop('CameraScene');
                            gameState.update(gameState.cameraScene);
                        },  
                        startAt: 0,
                        timeScale: 1
                    });
                }else{
                    gameState.cameraMoniter.anims.play('cameraMoniterClose','true');
                    gameState.scene.scene.pause('CameraScene');
                    gameState.scene.scene.bringToTop('ArenaScene');
                    gameState.cameraMoniterStatus = false;
                    gameState.usage -= 1;
                }
            }
        }
    }
}
