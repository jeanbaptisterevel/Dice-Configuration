import { IllegalArgumentException } from './exceptions/illegal-argument.exception'

export function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace: number): number {
  if (numberOfDices <= 0) throw new IllegalArgumentException(`${numberOfDices} cannot be zero or negative`)
  if (numberOfFace <= 0) throw new IllegalArgumentException(`${numberOfFace} cannot be zero or negative`)
  if (total <= 0) throw new IllegalArgumentException(`${total} cannot be zero or negative`)

  if (total === 1 || total < numberOfDices) return 0
  if (total === numberOfDices) return 1
  if (total === numberOfDices * numberOfDices) return 1

  return countConfigurations(total, numberOfDices, numberOfFace)
}

function countConfigurations(total: number, remainingDices: number, numberOfFace: number): number {
  // S'il ne reste plus de dés à lancer et que le total est égal à 0,
  // il y a une configuration possible : on est dans le cas souhaité.
  if (remainingDices === 0) {
    return total === 0 ? 1 : 0
  }

  // Cas de base : s'il ne reste plus de dés à lancer et que le total est différent de 0,
  // il n'y a aucune configuration possible
  if (total < 0) {
    return 0
  }

  // Calcul du nombre de configurations
  let numberOfConfigurations = 0
  for (let face = 1; face <= numberOfFace; face++) {
    numberOfConfigurations += countConfigurations(total - face, remainingDices - 1, numberOfFace)
  }

  return numberOfConfigurations
}

export default getTotalPossibleConfigurations

const before = performance.now()
const nb = getTotalPossibleConfigurations(28, 12, 8)
const after = performance.now()

console.log(`Number of possible configurations for a total output of 28 with 12 d8: ${nb} (${(after - before).toFixed(4)} ms)`)