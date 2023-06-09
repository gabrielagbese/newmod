import React, { useEffect, useRef, useState } from 'react'
import dinoStationary from '../assets/dino-stationary.png';
import dinoLose from '../assets/dino-lose.png';
import cactus1 from '../assets/cactus.png';
import cactus2 from '../assets/cactus2.png';
import cactus3 from '../assets/cactus3.png';

function Dino() {

    const canvasRef = useRef(null);
    const [gameRestart, setGameRestart] = useState(false);

    useEffect(() => {
        //board
        setGameRestart(true)
    let board;
    let boardWidth = 750;
    let boardHeight = 250;
    let context;

    //dino
    let dinoWidth = 88;
    let dinoHeight = 94;
    let dinoX = 50;
    let dinoY = boardHeight - dinoHeight;
    let dinoImg;

    let dino = {
        x:  dinoX,
        y:  dinoY,
        width: dinoWidth,
        height: dinoHeight
    }

    //cactus
    let cactusArray = [];

    let cactus1Width = 34;
    let cactus2Width = 69;
    let cactus3Width = 102;

    let cactusHeight = 70;
    let cactusX = 700;
    let cactusY = boardHeight - cactusHeight;

    let cactus1Img;
    let cactus2Img;
    let cactus3Img;
     
    // const image = new Image();
    // image.src = myImage;

    board = canvasRef.current;
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext('2d');


    dinoImg = new Image();
    dinoImg.src = dinoStationary;
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = cactus1;
    
    cactus2Img = new Image();
    cactus2Img.src = cactus2;

    cactus3Img = new Image();
    cactus3Img.src = cactus3;

    //physics
    let velocityX = -8;
    let velocityY = 0;
    let gravity = 1.25;
    let gameOver = false;
    let score = 0;

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);
    document.addEventListener('keydown', moveDino);

    function update() {
        if(gameOver){
            return;
        }
        requestAnimationFrame(update); 
        
        context.clearRect(0, 0, boardWidth, boardHeight);

        //dino
        velocityY  += gravity;
        dino.y = Math.min(dino.y + velocityY, dinoY);   
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    
        for(let i = 0; i < cactusArray.length; i++) {
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

            if(detectCollision(dino, cactus)) {
                gameOver = true;
                dinoImg.src = dinoLose;
                dinoImg.onload = function() {
                    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
                }
            }
        }
      }

      function moveDino(e){
        if(gameOver){
            return;
        }

        if ((e.code ==  "Space" || e.code == "ArrowUp") && dino.y == dinoY ) {
            //jump
            velocityY = -20;

        }
      }
    
      function placeCactus() {
    
        //place Cactus
    
        if(gameOver){
            setGameRestart(true)
            return;
        }

        let cactus = {
            img : null,
            x : cactusX,
            y : cactusY,
            width : null,
            height : cactusHeight
        }
    
        let placeCactusChance = Math.random();
        console.log(placeCactusChance);
    
        
    
        if(placeCactusChance > 0.95) { //5% chance of getting cactus 3
            cactus.img = cactus3Img;
            cactus.width = cactus3Width;
            cactusArray.push(cactus);
        }
        else if(placeCactusChance > 0.70) { //30% chance of getting cactus 2
            cactus.img = cactus2Img;
            cactus.width = cactus2Width;
            cactusArray.push(cactus);
        }
        else if(placeCactusChance >= 0.50) { //50% chance of getting cactus 1
            cactus.img = cactus1Img;
            cactus.width = cactus1Width;
            cactusArray.push(cactus);
        }

        if(cactusArray.length > 5) {
            cactusArray.shift();
        }
      }

      function detectCollision(a, b){
        return a.x < b.x + b.width &&
                a.x + a.width > b.x && 
                a.y < b.y + b.height &&
                a.y + a.height > b.y;
      }
  }, [gameRestart]);

  


  return (
    <div className='dino-wrapper'>
        <canvas id="board" ref={canvasRef}></canvas>
    </div>
  )
}

export default Dino