

const blocks3 = [{
  "id": 443,
  "form": [
    [1, 0, 1],
    [1, 1, 1]
  ]
},
{
  "id": 327,
  "form": [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
  ]
},
{
  "id": 891,
  "form": [
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]
}];

const blocks = [{
  "id": 4892,
  "form": [
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
},
{
  "id": 1839,
  "form": [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 0, 0]
  ]
},
{
  "id": 8183,
  "form": [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
  ]
}];

const blocks2 = [{
  "id": 1,
  "form": [
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
},
{
  "id": 2,
  "form": [
    [0, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
},
{
  "id": 3,
  "form": [
    [0, 1, 1],
    [1, 1, 1],
    [0, 1, 0]
  ]
}];

function hashFragment(block, isRotated = false) {
  const hash = []
  //isRotated - обозначает расположение фрагмента, false с начала, true - с конца
  for (let i = 0; i < block.length; i++) {
    let index = isRotated ? block.length - 1 - i : i
    let line = block[index];
    if (line.includes(0)) {
      for (let j = 0; j < line.length; j++) {
        let jndex = isRotated ? line.length - 1 - j : j
        hash.push(line[jndex])
      }
    } else {
      break
    }
  }
  return hash
}

function fragmenCompare(newFragment, oldFragment) {
  if (newFragment.length === oldFragment.length) {
    for (let index = 0; index < oldFragment.length; index++) {
      if (newFragment[index] + oldFragment[index] !== 1) {
        return false
      }
    }
    return true
  }
  return false
}

function layout(blocks) {
  let currentPosition = 1
  let lastHash = []
  let blocksUsed = new Set()
  const result = []
  
  for (let j = 0; j < blocks.length; j++) {
    let isRotated = false
    const block = blocks[j].form;
    const newResult = (block, rotated, place) => {
      j = -1 //по окончанию итерации будет +1, а начать нам надо с 0
      result.push({
        blockId: block.id,
        position: place,
        isRotated: rotated
      })
      blocksUsed.add(block.id)
      currentPosition++
      lastHash = hashFragment(block.form, rotated).reverse() 
      //чтоб не переворачивать два массива(начало и конец) следующего блока для сравнения, отразим хэш.
    }
    // пропускаем использованные
    if (blocksUsed.has(blocks[j].id)) {
      continue
    }
    //если нет фрагмента ищем новый стартовый блок с начала списка.
    if (lastHash.length === 0) {
      if (!block[block.length - 1].includes(0) || !block[0].includes(0)) {
        isRotated = !block[0].includes(0)
      } else continue 
    } else {
      //Сравниваем начало и конец текущего блока с искомым фрагментом.
      let blockStart = hashFragment(block)
      let blockEnd = hashFragment(block, true)
      if (fragmenCompare(blockStart, lastHash)) {
        isRotated = true
      } else if (fragmenCompare(blockEnd, lastHash)) {
        isRotated = false
      } else continue
    }
    newResult(blocks[j], isRotated, currentPosition)
  }
  return result
}

console.log(layout(blocks2))



