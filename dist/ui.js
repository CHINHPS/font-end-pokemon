export class Point {
    constructor() {
        this.point = 0;
    }
    upPoint(newPoint) {
        this.point += newPoint;
    }
    get getPoint() {
        return this.point;
    }
}
export function removePokemon(point1, point2, maTran) {
    maTran[point1.y][point1.x] = 0;
    maTran[point2.y][point2.x] = 0;
    return maTran;
}
