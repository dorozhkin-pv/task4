window.addEventListener('load', function(){

    let table = document.querySelector('.table');
    let td = document.querySelectorAll('.table td');
    let letters = ['A','B','C','D','E','F','G','H'];
    let horseMoves = [];    //td с классом horseMove

    function clearPole() {
        for (let i = 0; i < horseMoves.length; i++) horseMoves[i].classList.remove('active');
    }
    
    (function tableInit() {     //инициализирую таблицу путем добавления dataset для перемещения по ней
        let count;
        let count2 = letters.length + 1;
        
        for (let i = 0; i < td.length; i++) {
            if (count < letters.length) {
                td[i].dataset.pos = letters[count];
                count++;
            }else {
                count = 0;
                --i;
                continue;
            }
            if ((i % letters.length) == 0) {
                --count2;
            } 
            td[i].dataset.pos += count2;
        }
    })();

    function getPos(x, y) {
        let Pos = [[x-1, y-2],[x+1, y-2],[x+2, y-1],[x+2, y+1],[x+1, y+2],[x-1, y+2],[x-2, y+1],[x-2, y-1]]; //На этом строится все решение(смещения начальной точки)
        let positions = [];

        top:
        for (let i = 0; i < Pos.length; i++) {
            let mass = [];

            for (let j = 0; j < Pos[i].length; j++) {
    
                if (Pos[i][j] <= 0 || Pos[i][j] > 8) continue top;
                mass.push(Pos[i][j]);

            }

            if (mass.length == 2) {

                for (let i = 0; i < letters.length; i++) {
                    if (mass[0] == i+1) mass[0] = letters[i];
                }
                positions.push(mass.join(''));
            }
        }

        return positions;
    
    }

    
    table.addEventListener('click', function(e) {
        if (e.target.tagName == 'TD') {
            
            let cell = e.target;
            let first = cell.dataset.pos[0];
            let second = cell.dataset.pos[1];

            clearPole();

            function getX() {
                for (let i = 0; i < letters.length; i++) if (first == letters[i]) return ++i;
            }

            let x = getX();
            let y = parseInt(second);
            let positions = getPos(x,y);

            getPos(x, y);

            for (let i = 0; i < positions.length; i++) {

                let str = 'td[data-pos=' + positions[i] + ']';
                let horseMove = table.querySelector(str);

                horseMove.classList.add('active');
                horseMoves.push(horseMove);
            }            

        }else alert('Вы не попали по ячейке))');

    });
});

