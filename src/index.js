(function() {
    let A = [];
    let h = 512;
    let boardSize = 128;
    let p = 0.2;
    let ifRandomColor = false;
    let ctx;
    let l;

    document.addEventListener("DOMContentLoaded", () => {
        ctx = document.getElementById("myCanvas").getContext("2d");
        clearField();
    });

    const colors = {
        "red": "#EC0000",
        "orange": "#ff6900",
        "yellow": "#ffbf00",
        "olive": "#b8d925",
        "green": "#a9ebbc",
        "teal": "#00bab0",
        "blue": "#0080d7",
        "violet": "#7100d0",
        "purple": "#b300ce",
        "pink": "#f20096",
        "brown": "#ad6532",
        "grey": "#767676",
    };
    let boardColor = colors["red"];
    let blackColor = "#000000";

    startCanvas = () => {
        A = [];

        let boardSizeSelect = document.getElementById("boardSize");
        boardSize = parseInt(boardSizeSelect.options[boardSizeSelect.selectedIndex].text);

        if(!boardSize) {
            alert("please specify board size");
            return;
        }

        l = Math.floor(h / boardSize);

        clearField();
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (Math.random() < p) {
                    drawSquare(i * l, j * l, l - 1, pickColor(boardColor));
                    A[i][j] = true;
                }
            }
        }
    };

    iteration = () => {
        let B = [];
        for (let i = 0; i < A.length; i++) {
            B[i] = [];
            for (let j = 0; j < A[i].length; j++) {
                B[i][j] = false
            }
        }

        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                let c = 0;
                if (i - 1 >= 0 && j - 1 >= 0 && A[i - 1][j - 1] === true) c += 1;
                if (j - 1 >= 0 && A[i][j - 1] === true) c += 1;
                if (i + 1 < A.length && j - 1 >= 0 && A[i + 1][j - 1] === true) c += 1;
                if (i + 1 < A.length && A[i + 1][j] === true) c += 1;
                if (i - 1 >= 0 && A[i - 1][j] === true) c += 1;
                if (j + 1 < A.length && i - 1 >= 0 && A[i - 1][j + 1] === true) c += 1;
                if (j + 1 < A.length && A[i][j + 1] === true) c += 1;
                if (i + 1 < A.length && j + 1 < A.length && A[i + 1][j + 1] === true) c += 1;

                if (A[i][j] === false && c === 3) {
                    B[i][j] = true;
                }

                if (A[i][j] === true && (c === 2 || c === 3)) {
                    B[i][j] = true;
                }
            }
        }

        clearField();
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                A[i][j] = B[i][j];
            }
        }

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (A[i][j] === true) {
                    drawSquare(i * l, j * l, l - 1, pickColor(boardColor));
                }
            }
        }
    };


    clearField = () => {
        for (let i = 0; i < boardSize; i++) {
            A[i] = [];
            for (let j = 0; j < boardSize; j++) {
                A[i][j] = false
            }
        }
        drawSquare(0, 0, h, blackColor);
    };

    drawSquare = (r, t, size, color) => {
        ctx.beginPath();
        ctx.rect(r, t, size, size);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };

    addDot = (event) => {
        let elem = document.getElementById('myCanvas');
        let elemLeft = elem.offsetLeft;
        let elemTop = elem.offsetTop;
        let x = event.pageX - elemLeft;
        let y = event.pageY - elemTop;

        let i = Math.floor(x / l);
        let j = Math.floor(y / l);
        if (A[i][j] === false) {
            A[i][j] = true;
            drawSquare(i * l, j * l, l - 1, pickColor(boardColor));
        }
        else {
            A[i][j] = false;
            drawSquare(i * l, j * l, l - 1, blackColor);
        }
    };

    changeColor = (color) => {
        boardColor = colors[color];
        document.getElementById('colorLabel').className = "ui empty circular label " + color;
    };

    pickColor = (color) => {
        if (ifRandomColor) {
            return colors[Object.keys(colors)[Object.keys(colors).length * Math.random() << 0]];
        }
        return color;
    };

    setRandomColor = () => {
        let checkbox = document.getElementById('colorCheckbox');
        ifRandomColor = checkbox.checked;
    };

    return {
        setRandomColor,
        addDot,
        changeColor,
        startCanvas,
        iteration,
    }
}());


