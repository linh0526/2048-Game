var board;
var score = 0;
var bestScore = 0
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {   
    // Khởi tạo board với các giá trị ban đầu

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 16]
    // ];

    // Duyệt qua các hàng và cột để tạo ô
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            // Tạo phần tử div cho mỗi ô
            let cell = document.createElement("div");
            cell.id = r.toString() + "-" + c.toString(); // Cấp ID cho từng ô theo định dạng "r-c"
            let num = board[r][c];
            updateCell(cell, num);  // Cập nhật ô với giá trị của nó
            document.getElementById("board").append(cell);  
        }
    }
    setTwo();
    setTwo();

    //create 2 to begin the game
}
function updateCell(cell, num) {
    // Xóa nội dung hiện tại của ô
    cell.innerText = "";
    // Xóa lớp hiện tại của ô (ví dụ: x2, x4, x8...)
    cell.setAttribute("data-value", "");
    cell.classList.value = "";
    cell.classList.add("cell");
    // Nếu giá trị ô > 0, cập nhật số và thêm lớp
    if (num > 0) {
        cell.innerText = num.toString();  // Cập nhật số vào ô
        if (num < 4096) {
            cell.setAttribute("data-value", num); // Thêm lớp tương ứng với số
        } else {
            cell.setAttribute("data-value", "8192");
        }
    }
}

function hasEmptyCell() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0)
                return true;
        }
    }
    return false;
}

function setTwo() {
    if(!hasEmptyCell()){
        return;
    }
    let found = false
    while (!found){
        //random r,c
        let r = Math.floor(Math.random()* rows);
        let c = Math.floor(Math.random()* columns);
        
        if (board[r][c] == 0){
            board[r][c] = 2;
            let cell = document.getElementById(r.toString() + "-" + c.toString());
            updateCell(cell,2);
            found = true;
        }
    }
}

function newGame() {

    document.getElementById("board").innerHTML = "";  // Xóa bảng cũ
    document.getElementById("score").innerText = "0";
    setGame();  // Gọi lại hàm khởi tạo trò chơi
}

document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key == "ArrowLeft" || key == "a") {

        slideLeft();
        setTwo();
    }else if (key == "ArrowRight"|| key == "d") {
        
        slideRight();
        setTwo();
    }else if (key == "ArrowUp"|| key == "w") {
        slideUp();
        setTwo();
    }
    else if (key == "ArrowDown"|| key == "s") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    document.getElementById("best-score").innerText = bestScore;
})

document.addEventListener("keydown", function(event) {
    if (event.key === "R" || event.key === "r") {
        newGame();  // Gọi lại hàm khởi động trò chơi mới
    }
});


document.getElementById("restart").addEventListener("click", function() {
    let gameOverModal = bootstrap.Modal.getInstance(document.getElementById('gameOver'));
    gameOverModal.hide();  // Ẩn modal
    newGame();  // Chơi lại trò chơi
});
document.getElementById("restart").addEventListener("click", function() {
    let gameOverModal = bootstrap.Modal.getInstance(document.getElementById('gameOver'));
    gameOverModal.hide();  // Ẩn modal
    newGame();  // Chơi lại trò chơi
});

function filterZero(row) {
    return row.filter(num => num > 0); //create a new array with only the non-zero elements
}

function slide(row) { 
    //slide left
    // [0, 2 , 2 ,2] 
    row = filterZero(row); // get rid of zeros => [2, 2, 2]

    //slide
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            //check every 2
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
            if (score > bestScore)
                bestScore = score;
        } // [2, 2, 2] => [4, 0, 2]
    }
    row = filterZero(row); // [4, 2]

    //fill with zeros
    while (row.length < columns) {
        row.push(0);
    }//[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        //update
        for (let c = 0; c < columns; c++) {
            let cell = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateCell(cell, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        //reverse the row 
        row = row.reverse();//[2, 2, 2, 0] => [0, 2, 2, 2]
        //slideleft 
        row = slide(row);//[0, 2, 2, 2] => [4, 2, 0, 0]
        //reverse the row back 
        row = row.reverse(); //[4, 2, 0, 0] => [0, 0, 2, 4]
        board[r] = row;

        //update the 
        for (let c = 0; c < columns; c++) {
            let cell = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateCell(cell, num);
        }
    }
}

function slideUp() {
    for (let c =0; c < columns; c++)
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = slide(row);

        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
    
        for (let r = 0 ; r < rows; r++ ){
            board[r][c] = row [r]
            let cell = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateCell(cell, num);
        }
    }
}

function slideDown() {
    for (let c =0; c < columns; c++)
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = row.reverse();
        row = slide(row);
        row = row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0 ; r < rows; r++ ){
            board[r][c] = row[r];
            let cell = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateCell(cell, num);
        }
    }
}

