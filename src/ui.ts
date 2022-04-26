export class Point {
    point = 0

    upPoint(newPoint: number){
        this.point += newPoint
    }
    get getPoint(){
        return this.point
    }
}

export function removePokemon(
    point1: {x: number,y: number},
    point2: {x: number,y: number},
    maTran){
    
    maTran[point1.y][point1.x] = 0
    maTran[point2.y][point2.x] = 0
 
    return maTran
}