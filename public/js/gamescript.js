
window.onload = function () {
    
    // Define start button
    let startButton = document.getElementById('startbutton');
    // Add event listener when user click on button
    startButton.addEventListener('click', function() {


        // Canvas structure generating code block beginning 


        // Before proceed get previous added canvas
        let previousAddedCanvas = document.querySelectorAll("#test");
        // Iterate over previous canvas element and remove
        previousAddedCanvas.forEach(function(element) {
            element.remove();
        })

        
        // Create canvas element DOM
        let canvas = document.createElement('canvas');
        // Create attribute for canvas  
        canvas.setAttribute('id', 'test');
        // Set camvas style
        canvas.style.cssText = 'width: 90%; height: 90%; position: absolute; left: 50%; top:50%; transform: translate(-50%, -50%); background-color: #88B04B'; 
        

        // Get canvas parent
        let canvasParent = document.getElementById('gamewrapper').children[0].children[0];
        // Append canvas to its body
        canvasParent.append(canvas);


        // Canvas structure generating code block ending


        // Canvas inner logic block begginng
        

        // Canvas code block defining code beginning
        // Get canvas element by id
        let getCanvasElement = document.getElementById('test');
        // Get canvas  height
        let canvasSceneHeight = getCanvasElement.height;
        // Get canvas width
        let canvasSceneWidth = getCanvasElement.width;
        // Canvas context
        let cavnasContext = getCanvasElement.getContext('2d');
    


        let planeHeight = 10; // Paddle height
        let planeWidth = 75; // Paddle width
        let paddleXStartPostion = (canvasSceneWidth-planeWidth) / 2; // Paddle initial position
        let moveLeft = false; // Flags which help setinterval will identify movement to left
        let moveRight = false; // Flags which help setinternal will identify movemonet to right
        let paddleSpeed = 4; // paddle movement speed
        let brickOffsetTop = 30; // Brick Offset top
        let ballXPosition = canvasSceneWidth / 2; // Ball initial x position
        let ballYPosition = canvasSceneHeight - brickOffsetTop; // Ball initial y position
        let ballRadius = 3; // Ball radius
        let ballNextXPosition = 2; // Ball next X postion after intialization
        let ballNextYPosition = -2; // Ball next Y positon after intialization
        let brickOffsetLeft = 4; // Brick Offset top
        let brickWidth = 15;
        let brickHeight = 10;
        let brickPadding = 2;

        
        // Make an array from parsen int and push each current number in Array
        let arrayFromParsNumber = Array.from(Array(17).keys());
       
        

        // Craete new brick collection empty input
        let bricksCollection = [];
        let blocksLengthArray = arrayFromParsNumber;
        let selfie = [];
        
        // Add event listener to key when press arrow left or arrow right
        document.addEventListener('keydown', function(event) {

            // If keyKode will be left , then invoke
           if( event.keyCode == 37) {

               moveLeft = true;
               moveRight = false;

           }
           // If keykode will be right then invoke 
           else if( event.keyCode == 39) {

               moveRight = true;
               moveLeft = false;

           }

        });

        // Fire event listener when press arrow left or arrow right
        document.addEventListener('keyup', function(event) {

             // If keyKode will be left , then invoke
            if( event.keyCode == 37) {

                moveLeft = false;
                moveRight = false;

            }
             // If keyKode will be right , then invoke
            else if(event.keyCode == 39) {

                moveRight = false;
                moveLeft = false;

            }

        });

        setInterval(function () {

               
                if (bricksCollection.length >= 0) {

                    selfie = bricksCollection

                } else {

                    alert(' You win ')

                }
                      
        }, 500);

        function touchDetection() {
            
            
            selfie.forEach(function (index, element) {

                
                if(ballXPosition > index.x && ballXPosition < index.x + brickWidth && ballYPosition > index.y && ballYPosition < index.y + brickHeight) {
                    ballNextYPosition = -ballNextYPosition;
                    if(index.status == 1) {

                        index.status = 0;
                        
                    }

                }

           })

        };

        // Function which create paddle rectangle
        function paddle() {

            cavnasContext.beginPath();
            cavnasContext.rect(paddleXStartPostion, canvasSceneHeight - planeHeight, planeWidth, planeHeight);
            cavnasContext.fillStyle = 'transparent';
            cavnasContext.strokeStyle  = '#FFFFFF';
            cavnasContext.stroke();
            cavnasContext.fill();
            cavnasContext.closePath();

        };

        // Function to create ball
        function ball() {

            cavnasContext.beginPath();
            cavnasContext.arc(ballXPosition, ballYPosition, ballRadius, 0, Math.PI*2);
            cavnasContext.fillStyle = '#FFFFFF';
            cavnasContext.strokeStyle  = '#FFFFFF';
            cavnasContext.stroke();
            cavnasContext.fill();
            cavnasContext.closePath();

        };


        function Rect(x, y, w, h, color) {

            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.fillColor = color;

             //  render
            this.render = function(cavnasContext) {

                cavnasContext.beginPath();
                cavnasContext.rect(this.x, this.y, this.width, this.height);
                cavnasContext.fillStyle = this.fillColor;
                cavnasContext.fill();
                cavnasContext.closePath();

            }
        };

        
        // Function to create bricks
        function drawBricks() {
            
            bricksCollection = [];

            blocksLengthArray.forEach(function ( index, element){

                let brickX = (element * ( brickWidth + brickPadding )) + brickOffsetLeft;
                let rectangle  = new Rect(brickX, brickOffsetTop, brickWidth, brickHeight, '#FA7268');
                if(selfie.length !== 0) { 
                    
                    if(selfie[index] !== undefined) {

                        if(selfie[index].status == 1) {

                            rectangle.status = 1;
                            rectangle.render(cavnasContext);
                            bricksCollection.push(rectangle);
            
                        }

                    }

                } else {
                    
                    rectangle.status = 1;
                    rectangle.render(cavnasContext);
                    bricksCollection.push(rectangle);

                };
                

            });
            
        
        };
        
       
       
    
        

        setInterval(function draw() {
            // Remove paddle when new one one will be invoked
            cavnasContext.clearRect(0, 0, canvasSceneWidth, canvasSceneHeight);
            // Call paddle function draw
           paddle();
           ball();
           drawBricks();
           touchDetection();
           
          

           // Move bal x during interval
           ballXPosition += ballNextXPosition;
           // MOve ball y during interval
            ballYPosition += ballNextYPosition;

           // Condition to revert ball movement top & edge of canvas sides
           if(ballYPosition + ballNextYPosition < ballRadius) {

                ballNextYPosition = -ballNextYPosition;
                

            } else if(ballYPosition + ballNextYPosition > canvasSceneHeight - ballRadius) {

                ballNextYPosition = -ballNextYPosition;

                // Check if ball posiiton is in paddle x position for ball bouncing 
                if(ballXPosition > paddleXStartPostion && ballXPosition < paddleXStartPostion + planeWidth) {

                    ballNextXPosition = -ballNextXPosition;

                } else {

                    location.reload();

                }


            };

            // Condition to revert ball movement left and right canvas sides
            if(ballXPosition + ballNextXPosition > canvasSceneWidth) {

                ballNextXPosition = -ballNextXPosition;

            } else if (ballXPosition + ballNextXPosition < ballRadius) {

                ballNextXPosition = -ballNextXPosition;
                
            };

            
           // Condition to phobit moving paddle to get from right side of canvas
           if(moveLeft && paddleXStartPostion > 0) {

                paddleXStartPostion -= paddleSpeed

            }
            // Condition to phobit moving paddle to get from left side of canvas 
            else if(moveRight  &&  paddleXStartPostion < canvasSceneWidth-planeWidth) {

                paddleXStartPostion += paddleSpeed

            };
            

        }, 20);

        // Canvas inner logic block begginng
        

    })

}
