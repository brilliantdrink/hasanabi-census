import {ChartData} from 'chart.js'

export function normaliseArray(array: number[]) {
  const sum = array.reduce((a, b) => a + b, 0)
  return array.map(number => number / sum)
}

export function normalizeChartDataY(data: ChartData['datasets']) {
  const yAxis: number[][] = Array(data[0].data.length).fill(0).map(() => [])
  for (const set of data) {
    set.data.forEach((number, i) => yAxis[i].push(number as number))
  }
  yAxis.map((numbers, x) => {
    normaliseArray(numbers)
      .forEach((number, y) => data[y].data[x] = number)
  })
  return data
}
