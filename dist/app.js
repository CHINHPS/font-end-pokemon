var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createArrayPokemon, checkLinePokemon, createArrayZero } from "./algorithm.js";
import { io } from '../dist/socket.io.min.js';
import { Point, removePokemon } from './ui.js';
const socket = io('http://172.20.10.2:3000/');
var listPokemon = document.querySelector("#listPokemon");
let findMatch = document.querySelector('#findMatch');
let xRow = 5, yColum = 10;
let maTran = createArrayPokemon(xRow, yColum);
const getPokemon = () => __awaiter(void 0, void 0, void 0, function* () {
    let listPkm = [];
    for (let index = 1; index < 20; index++) {
        let data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
        let pokemon = yield data.json();
        pokemon = {
            id: index,
            name_: pokemon.name,
            image: pokemon.sprites.front_default,
            type: pokemon.types[0].type.name,
        };
        listPkm.push(pokemon);
    }
    return listPkm;
});
findMatch.addEventListener('click', () => {
    findMatch.textContent = 'Đang tìm trận...';
    socket.emit('find-match', {
        id: socket.id,
        maTran
    });
});
socket.on('finded-match', (data) => {
    findMatch.remove(); // xoá nút tìm trận
    console.log('trận của bạn', data);
    maTran = data.maTran; // lấy ma trận từ server gửi về
    getPokemon().then((data) => {
        listPokemon.innerHTML = '';
        let x = 1, y = 0;
        maTran.forEach((item) => {
            item.forEach((item2) => {
                if (item2 != 0) {
                    listPokemon.innerHTML += `
          <div class="flex justify-center h-[120px]">
              <img 
              id="toaDo_${x}_${y}"
              data-id="${item2}"
              data-x="${x}" 
              data-y="${y}"
              class="rounded-md bg-[#eeeeeeec] object-cover hover:shadow-md hover:shadow-white pokemon" 
              src="${data[item2].image}" 
              alt="">
          </div>
          `;
                    x++;
                }
            });
            (x = 1), y++; // cứ mỗi dòng thì reset lại trục x và tăng trục y
        });
        chinh();
    });
});
socket.on('Send-kill-pokemon', (data) => {
    maTran = removePokemon(data.toaDo1, data.toaDo2, maTran);
    document.querySelector(`#toaDo_${data.toaDo1.x}_${data.toaDo1.y}`).remove();
    document.querySelector(`#toaDo_${data.toaDo2.x}_${data.toaDo2.y}`).remove();
    console.log(maTran);
    // thông báo hoàn thành map
    if (JSON.stringify(createArrayZero(xRow, yColum)) == JSON.stringify(maTran)) {
        alert('Hoàn thành!');
    }
});
socket.on("Send-point", data => {
    let ui_point1 = document.querySelector('#point1');
    let ui_point2 = document.querySelector('#point2');
    console.log(ui_point1.parentElement.children[1]);
    ui_point1.innerHTML = data[0].point.toString();
    ui_point2.innerHTML = data[1].point.toString();
});
function chinh() {
    let point1, point2;
    let ELMTarget_prev;
    let point = new Point();
    const listPkm54 = document.querySelectorAll(".pokemon");
    for (const pkm of listPkm54) {
        pkm.addEventListener("click", (e) => {
            let ELMTarget = e.target;
            let x = Number(ELMTarget.dataset.x), y = Number(ELMTarget.dataset.y);
            if (point1 == undefined) {
                point1 = { x, y };
                ELMTarget_prev = ELMTarget;
                ELMTarget_prev.classList.toggle('active');
            }
            else {
                point2 = { x, y };
                ELMTarget.classList.toggle('active');
                // bắt đầu kiểm tra từ thao tác thứ 2
                let success = false;
                if (checkLinePokemon(point1, point2, maTran)) {
                    success = true;
                    // gửi 2 con pokemon lên server
                    socket.emit('Send-pokemon-to-server', {
                        toaDo1: point1,
                        toaDo2: point2,
                        id: socket.id
                    });
                }
                // reset 2 toạ độ lại
                point1 = point2 = undefined;
            }
            ELMTarget_prev.classList.toggle('active');
            ELMTarget.classList.toggle('active');
        });
    }
}
