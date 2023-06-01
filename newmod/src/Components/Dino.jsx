import React, { useEffect, useRef } from 'react'
import dinoStationary from '../assets/dino-stationary.png';
import cactus1 from '../assets/cactus.png';
import cactus2 from '../assets/cactus2.png';
import cactus3 from '../assets/cactus3.png';

function Dino() {

    const canvasRef = useRef(null);

    useEffect(() => {
        //board
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

    requestAnimationFrame(update);
  }, []);

  function update() {
    requestAnimationFrame(update);    

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  }


  return (
    <div className='dino-wrapper'>
        <canvas id="board" ref={canvasRef}></canvas>
    </div>
  )
}

export default Dino