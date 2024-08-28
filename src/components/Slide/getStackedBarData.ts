import {parse} from 'csv-parse/browser/esm/sync'
import {ChartData} from 'chart.js'
import {colors} from './colors'
import {normalizeChartDataY} from './utils'

export default async function getStackedBarData(url: string) {
  const csvText = await fetch(url).then(res => res.text())
  const res = parse(csvText) as string[][]
  const labels = res.shift() as string[]
  labels.shift()
  const data: ChartData = {
    labels,
    datasets: normalizeChartDataY(res.map((groupData, index) => {
      const label = groupData.shift()
      return {
        label,
        data: groupData.map(Number),
        backgroundColor: colors[index] ?? null,
      }
    }))
  }
  return data
}
