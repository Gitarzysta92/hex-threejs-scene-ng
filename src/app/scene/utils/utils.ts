import { Vector2, Vector3 } from "three";

export type Bitmap = number[][];

export function generateBitmap(decimals: number[]): Bitmap {
  return decimals.map(x => 
    convertToBinaryWithComplement(x).split('').map(y => parseInt(y)));
}

export function convertToBinaryWithComplement(n: number, complement: number = 0): string {
  return convertToBinary(n).padStart(complement, '0');
}

export function convertToDecimal(binary: string): number {
  return parseInt(binary, 10);
}

export function convertToBinary(n: number): string {
  return ((n) >>> 0).toString(2)
}

export function generate2dCoordinates(bitmap: Bitmap): number[][] {
  const matrix: number[][] = [];
  bitmap.forEach((bitset, x) => 
    bitset.forEach((bit, y) => {
      if (!!bit)
        matrix.push([x, y]);
    })
  );
  return matrix;
};

export function translateMatrix(matrix: number[][], x: number, y: number): number[][] {
  return matrix.map(v => [v[0] += x, v[1] += y])
}


export function getCoordinates(coords: { x: number, y: number }): Vector2 {
  return new Vector2(
    (coords.x / window.innerWidth) * 2 - 1,
    -(coords.y / window.innerHeight) * 2 + 1
  );
}

export function mapCoordsTo2d(coords: THREE.Vector3): THREE.Vector2 {
  return new Vector2(coords.x, coords.y); 
}

export function mapCoordsTo3d(coords: THREE.Vector2): THREE.Vector3 {
  return new Vector3(coords.x, coords.y, 0);
}