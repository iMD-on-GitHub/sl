//The configuration of your game that is a parameter of the Phaser.Game function
const config = {
    type: Phaser.AUTO,
    width : 1200,
    height: 700,
    backgroundColor: "#000000",
    audio: {
        disableWebAudio: false 
      },
    //allows modification of the games physics
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true
            //debug: true
        }
    },
    //subclass scenes 
    scene:[MenuScene,ArenaScene,CameraScene],
    //phasers scale system to fit into the brower
    scale: {
        zoom: 1,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

//creats a game game object with the configuration
const game = new Phaser.Game(config);

//create a block-scoped object that stores variables that can be accessed in any scene
let gameState = {
    thingsToSave:{
        night: 1
    },
    locked: false,
    leftDoorStatus: false,
    rightDoorStatus: false,
    ventDoorStatus: false,
    cameraMoniterStatus: false,
    camPosition: 1,
    power: 100,
    usage: 1,
    reset :function(){
        gameState.locked = false;  
        gameState.leftDoorStatus = false;
        gameState.rightDoorStatus = false;
        gameState.ventDoorStatus = false;
        gameState.cameraMoniterStatus = false;
        gameState.camPosition = 1;
        gameState.usage = 1;
        gameState.power = 100;
        gameState.ennard.position = 7;
        gameState.ennard.cooldown = 3000;
    },
    update: function(scene){
        gameState.static.alpha = 1;
        scene.tweens.add({
          targets: gameState.static,
          alpha: 0.1,
          duration: 300,
          ease: 'Power2'
        }, scene);
        if(gameState.camPosition == 1){
            if(gameState.ennard.position == 1){
                gameState.cameraScreen.setTexture('CAM01ennard');   
            }else if(gameState.ennard.position == 12){
                gameState.cameraScreen.setTexture('CAM01ennard2');   
            }else{
                gameState.cameraScreen.setTexture('CAM01');
            }
        }else if(gameState.camPosition == 2){
            if(gameState.ennard.position == 2){
                gameState.cameraScreen.setTexture('CAM02ennard');   
            }else if(gameState.ennard.position == 22){
                gameState.cameraScreen.setTexture('CAM02ennard2');   
            }else{
                gameState.cameraScreen.setTexture('CAM02');
            }
        }else if(gameState.camPosition == 3){
            if(gameState.ennard.position == 3){
                gameState.cameraScreen.setTexture('CAM03ennard');   
            }else{
                gameState.cameraScreen.setTexture('CAM03');
            }
        }else if(gameState.camPosition == 4){
            if(gameState.ennard.position == 4){
                gameState.cameraScreen.setTexture('CAM04ennard');   
            }else{
                gameState.cameraScreen.setTexture('CAM04');
            }
        }else if(gameState.camPosition == 5){
            if(gameState.ennard.position == 5){
                gameState.cameraScreen.setTexture('CAM05ennard');   
            }else if(gameState.ennard.position == 52){
                gameState.cameraScreen.setTexture('CAM05ennard2');   
            }else{
                gameState.cameraScreen.setTexture('CAM05');
            }
        }else if(gameState.camPosition == 6){
          gameState.cameraScreen.setTexture('CAM06');
        }else if(gameState.camPosition == 7){
            if(gameState.ennard.position == 7){
                gameState.cameraScreen.setTexture('CAM07ennard');   
            }else{
                gameState.cameraScreen.setTexture('CAM07');
            }
        }
    },
    
    ennard:{
        position: 7,
        cooldown: 3000,
        moveFunction: null,
        movement: function(scene){
            gameState.ennard.moveFunction = scene.time.addEvent({
                delay: gameState.ennard.cooldown,
                callback: ()=>{
                    gameState.ennard.cooldown=3000;
                    if(gameState.ennard.position == 7){
                        var rand = Math.ceil(Math.random()*3);
                        if(rand == 1){
                            gameState.ennard.position = 4;
                            gameState.ennard.cooldown=1500;
                        }else if(rand == 2){
                            gameState.ennard.position = 6;
                        }else{
                            gameState.ennard.position = 5;
                        }
                    }else if (gameState.ennard.position == 6){
                        var rand = Math.ceil(Math.random()*4);
                        if(rand == 1){
                            gameState.ennard.position = 3;
                            gameState.ennard.cooldown=1500;
                        }else if(rand == 2){
                            gameState.ennard.position = 1;
                        }else if(rand == 3){
                            gameState.ennard.position = 4;
                        }else{
                            gameState.ennard.position = 5;
                        }
                    }else if (gameState.ennard.position == 5){
                        gameState.ennard.position = 52;
                    }else if (gameState.ennard.position == 52){
                        if(gameState.ventDoorStatus == false){
                            scene.time.addEvent({
                                delay: 400,
                                callback: ()=>{
                                    gameState.locked = true;
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            gameState.ennard.position = 0; 
                            gameState.ennard.cooldown = 800;
                        }else{
                            gameState.ennard.position = 6;
                        }
                    }
                    
                    else if (gameState.ennard.position == 4){
                        gameState.ennard.position = 2;
                    }
                    else if (gameState.ennard.position==2){
                        gameState.ennard.position = 22;
                    }else if (gameState.ennard.position==22){
                        if(gameState.rightDoorStatus == false){
                            scene.time.addEvent({
                                delay: 400,
                                callback: ()=>{
                                    gameState.locked = true;
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                            gameState.ennard.position = 0; 
                            gameState.ennard.cooldown = 800;
                        }else{
                            gameState.ennard.position = 7;
                            gameState.ennard.cooldown = 2000;
                        }
                    }
                    
                    else if (gameState.ennard.position==3){
                        gameState.ennard.position = 1;
                    }
                    
                    else if (gameState.ennard.position==1){
                        gameState.ennard.position = 12;
                    }else if (gameState.ennard.position==12){
                        if(gameState.leftDoorStatus == false){
                            gameState.ennard.position = 0; 
                            gameState.ennard.cooldown = 800;
                            scene.time.addEvent({
                                delay: 400,
                                callback: ()=>{
                                    gameState.locked = true;
                                },  
                                startAt: 0,
                                timeScale: 1
                            });
                        }else{
                            var rand = Math.ceil(Math.random()*2);
                            if(rand == 1){
                                gameState.ennard.position = 6;
                            }else{
                                gameState.ennard.position = 7;
                            }
                        }
                    }else if (gameState.ennard.position==0){
                        gameState.ennard.jumpscare(gameState.scene);
                    }
                    gameState.update(gameState.cameraScene);
                    gameState.ennard.movement(scene);
                },  
                startAt: 0,
                timeScale: 1
            });
        },
        jumpscare:function(scene){
            gameState.locked = true;
            if(gameState.cameraMoniterStatus == true){
                gameState.cameraMoniter.anims.play('cameraMoniterClose','true');
                gameState.scene.scene.pause('CameraScene');
                gameState.scene.scene.bringToTop('ArenaScene');
                gameState.cameraMoniterStatus = false;
            }
            var ennard = scene.add.sprite(0,0,'ennardJs').setOrigin(0,0).setDepth(4);
            ennard.anims.play('ennardJsAction','true');
            scene.time.addEvent({
                delay: 900,
                callback: ()=>{
                    scene.scene.stop('CameraScene');
                    scene.scene.stop('ArenaScene');
                    scene.scene.start('MenuScene');
                },  
                startAt: 0,
                timeScale: 1
            });
        }
    },
    
    
    
    fireRate: 10,
    rateCooldown: 0,
    gameSpeed: 100
}