export function createArrayPokemon(xRow, yColum) {
    // tạo ma trận full 0
    let arrayPokemon = createArrayZero(xRow, yColum);
    let count = 10; // số > 0 cho vòng lặp bên dưới phải chạy
    while (count != 0) {
        count = 0;
        let pokemon = getRandomInt(1, 18); // lấy ngẫu nhiên con pokemon ra
        // lấy giá trị ngẫu nhiên cho con pokemon 1
        let x = getRandomInt(1, xRow);
        let y = getRandomInt(1, yColum);
        // kiểm tra xem vị trí đó có con pokemon nào không
        while (arrayPokemon[x][y] != 0) {
            x = getRandomInt(1, xRow);
            y = getRandomInt(1, yColum);
        }
        arrayPokemon[x][y] = pokemon;
        // lấy giá trị ngẫu nhiên cho con pokemon 2
        x = getRandomInt(1, xRow);
        y = getRandomInt(1, yColum);
        // kiểm tra xem vị trí đó có con pokemon nào không
        while (arrayPokemon[x][y] != 0) {
            x = getRandomInt(1, xRow);
            y = getRandomInt(1, yColum);
        }
        arrayPokemon[x][y] = pokemon;
        // console.log(arrayPokemon);
        // kiểm tra xem còn vị trí nào chưa có pokemon thì tiếp tục vòng lặp
        for (let i = 1; i < arrayPokemon.length - 1; i++) {
            for (let j = 1; j < arrayPokemon[i].length - 1; j++) {
                if (arrayPokemon[i][j] == 0)
                    count++;
            }
        }
    }
    // let arrayPokemon = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 18, 4, 1, 8, 7, 5, 4, 9, 10, 14, 0],
    // [0, 9, 0, 0, 0, 8, 17, 14, 15, 0, 0, 0],
    // [0, 0, 1, 0, 4, 10, 18, 0, 18, 0, 0, 0],
    // [0, 0, 12, 9, 17, 9, 8, 0, 0, 4, 0, 0],
    // [0, 16, 18, 5, 7, 8, 5, 1, 5, 15, 12, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    return arrayPokemon;
}
export function createArrayZero(xRow, yColum) {
    let arrayPokemon = Array.from(Array(xRow + 2), () => new Array(yColum + 2));
    for (let i = 0; i < arrayPokemon.length; i++) {
        for (let j = 0; j < arrayPokemon[i].length; j++) {
            arrayPokemon[i][j] = 0;
        }
    }
    return arrayPokemon;
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function checkLinePokemon(point1, point2, dataPokemon) {
    let x_prev = point1.x, y_prev = point1.y;
    let x_cur = point2.x, y_cur = point2.y;
    let success = false;
    // TH1: chung cột x
    if (x_prev == x_cur && y_prev != y_cur) {
        if (checkLineX(y_prev, y_cur, x_prev, dataPokemon)) {
            success = true;
        }
    }
    // TH2: chung cột y
    if (y_prev == y_cur && x_prev != x_cur) {
        if (checkLineY(x_prev, x_cur, y_prev, dataPokemon)) {
            success = true;
        }
    }
    // TH3: hình chữ Z
    if (x_prev != x_cur && y_prev != y_cur) {
        if (checkZ_X({ x: x_prev, y: y_prev }, { x: x_cur, y: y_cur }, dataPokemon)) {
            success = true;
        }
        else if (checkZ_Y({ x: x_prev, y: y_prev }, { x: x_cur, y: y_cur }, dataPokemon)) {
            success = true;
        }
    }
    if (!success && (x_prev != x_cur || y_prev != y_cur)) {
        console.log('check chữ UL');
        if (checkUL_X({ x: x_prev, y: y_prev }, { x: x_cur, y: y_cur }, 1, dataPokemon)) {
            success = true;
        }
        else if (checkUL_X({ x: x_prev, y: y_prev }, { x: x_cur, y: y_cur }, -1, dataPokemon)) {
            success = true;
        }
        if (checkUL_Y({ x: x_prev, y: y_prev }, { x: x_cur, y: y_cur }, 1, dataPokemon)) {
            success = true;
        }
        else if (checkUL_Y({ x: x_prev, y: y_prev }, { x: x_cur, y: y_cur }, -1, dataPokemon)) {
            success = true;
        }
    }
    return success;
}
function checkLineX(y1, y2, x, dataPokemon) {
    const min = Math.min(y1, y2);
    const max = Math.max(y1, y2);
    const currenPoke = dataPokemon[y1][x]; // lấy con pokemon đầu tiên được chọn
    try {
        for (let y = min; y <= max; y++) {
            if (dataPokemon[y][x] != currenPoke && dataPokemon[y][x] != 0) {
                console.log('bị chặn bởi ', dataPokemon[y][x]);
                return false;
            }
        }
    }
    catch (_a) {
        console.log('Không bị chặn nhưng không tìm thấy');
        return false;
    }
    console.log('ăn được trùng hàng dọc (X)');
    return true;
}
function checkLineY(x1, x2, y, dataPokemon) {
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    const currenPoke = dataPokemon[y][x1]; // lấy con pokemon đầu tiên được chọn
    console.log(dataPokemon);
    try {
        for (let x = min; x <= max; x++) {
            if (dataPokemon[y][x] != currenPoke && dataPokemon[y][x] != 0) {
                console.log('bị chặn bởi ', dataPokemon[y][x]);
                return false;
            }
        }
    }
    catch (_a) {
        console.log('Không bị chặn nhưng không tìm thấy');
        return false;
    }
    console.log('ăn được trùng hàng ngang (Y)');
    return true;
}
function checkZ_X(point1, point2, dataPokemon) {
    let point_min, point_max;
    if (point1.x > point2.x) {
        point_max = point1;
        point_min = point2;
    }
    else {
        point_max = point2;
        point_min = point1;
    }
    for (let x = point_min.x + 1; x < point_max.x; x++) {
        if (checkLineY(point_min.x, x, point_min.y, dataPokemon) &&
            checkLineX(point_min.y, point_max.y, x, dataPokemon) &&
            checkLineY(x, point_max.x - 1, point_max.y, dataPokemon)) {
            if (dataPokemon[point_min.y][point_min.x] == dataPokemon[point_max.y][point_max.x]) {
                console.log('ăn chữ z được (ngang)');
                return true;
            }
        }
    }
    console.log('chịu chết 123');
    return false;
}
function checkZ_Y(point1, point2, dataPokemon) {
    let point_min, point_max;
    if (point1.y > point2.y) {
        point_max = point1;
        point_min = point2;
    }
    else {
        point_max = point2;
        point_min = point1;
    }
    for (let y = point_min.y + 1; y < point_max.y; y++) {
        if (checkLineX(point_min.y, y, point_min.x, dataPokemon) &&
            checkLineY(point_min.x, point_max.x, y, dataPokemon) &&
            checkLineX(y, point_max.y - 1, point_max.x, dataPokemon)) {
            if (dataPokemon[point_min.y][point_min.x] == dataPokemon[point_max.y][point_max.x]) {
                console.log('ăn chữ z được (dọc)');
                return true;
            }
        }
    }
    console.log('chịu chết 1234');
    return false;
}
function checkUL_X(point1, point2, type, dataPokemon) {
    console.log('check UL X');
    // type -1 check trái, 1 check phải
    let point_min = point1, point_max = point2;
    if (point1.x > point2.x) {
        point_max = point1;
        point_min = point2;
    }
    let infinity_x = point_max.x + type; // +1 hướng qua phải, -1 hướng qua trái
    let startX = point_max.x;
    for (let x = startX; swapCondition(x, infinity_x, type); x += type) {
        // console.log('chạy dc 1 lần');
        if (checkLineY(point_min.x, x, point_min.y, dataPokemon) && // kiểm tra hàng ngang ở trên (1)
            checkLineY(point_max.x, x, point_max.y, dataPokemon) // kiểm tra hàng ngang dưới (2)
        ) {
            if (checkLineX(point_min.y, point_max.y - 1, x, dataPokemon) // check hàng dọc th(1) ăn được thì trả về kết quả
            ) {
                if (dataPokemon[point_min.y][point_min.x] == dataPokemon[point_max.y][point_max.x]) {
                    console.log('ăn dược (L) (X)');
                    return true;
                } // else console.log('2 con khác nhau mà');
            }
            else { // tăng về trái 1 ô nữa xem có trống và ăn được không
                console.log('tăng thêm ô để check: ', point_min.y, point_max.y, x);
                infinity_x += type;
            }
        }
    }
    console.log('Không ăn được UL (X)');
    return false;
}
function checkUL_Y(point1, point2, type, dataPokemon) {
    console.log('check UL Y');
    let point_min = point1, point_max = point2;
    if (point1.y > point2.y) {
        point_max = point1;
        point_min = point2;
    }
    let infinity_y = point_max.y + type; // +1 hướng dưới, -1 hướng lên trên
    for (let y = point_max.y; swapCondition(y, infinity_y, type); y += type) {
        console.log('chạy dc 1 lần');
        if (checkLineX(point_min.y, y, point_min.x, dataPokemon) && // kiểm tra hàng dọc (1)
            checkLineX(point_max.y, y, point_max.x, dataPokemon) // kiểm tra hàng dọc (2)
        ) {
            if (
            // point_max.y nếu ở dưới thì -1 bên trên thì +1
            checkLineY(point_min.x, point_max.x + 1, y, dataPokemon) // check hàng dọc th(1) ăn được thì trả về kết quả
            ) {
                if (dataPokemon[point_min.y][point_min.x] == dataPokemon[point_max.y][point_max.x]) {
                    console.log('ăn dược (L) (Y)');
                    return true;
                } // else console.log('2 con khác nhau mà');
            }
            else { // tăng về trái 1 ô nữa xem có trống và ăn được không
                console.log('tăng thêm ô để check: ', point_min.x, point_max.x, y);
                infinity_y += type;
            }
        }
    }
    console.log('Không ăn được UL (Y)');
    return false;
}
function swapCondition(x_y, infinity, type) {
    if (type == 1)
        return x_y <= infinity;
    else
        return x_y >= infinity;
}
