import type {ChartOptions, Plugin} from 'chart.js'
import {originalDatasets} from './utils'

const deltaAt = (data: unknown[], index: number): number | null => {
  if (index <= 0) return null
  const arr = data as number[]
  const cur = arr[index]
  const prev = arr[index - 1]
  if (typeof cur !== 'number' || typeof prev !== 'number') return null
  return cur - prev
}

const formatDelta = (delta: number | null | undefined, decimals: 0 | 1): string | null => { 
  if (delta == null) return null
  const absPercent = Math.abs(delta) * 100
  const formatted = decimals === 0 ? String(Math.round(absPercent)) : String(Math.round(absPercent * 10) / 10)
  const sign = delta > 0 ? '+' : '-'
  return `${sign}${formatted}%`
}

const font = {
  family: 'Fraunces',
  size: 15,
}

export const common = (id: string, tiny: boolean): ChartOptions => ({
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {labels: {font}},
    tooltip: {
      yAlign: 'center',
      callbacks: {
        label: tooltipItem => {
          const totalAmount = originalDatasets[id][tooltipItem.dataset.label as string].data[tooltipItem.dataIndex]
          const percentage = (tooltipItem.raw as number * 100).toFixed(2) + '%'
          const base = `${tooltipItem.dataset.label}: ${percentage} (${totalAmount})`
          const datasetData = (tooltipItem.dataset as unknown as {data: unknown[]}).data
          const delta = deltaAt(datasetData, tooltipItem.dataIndex)
          const deltaStr = formatDelta(delta, 1)
          if (deltaStr) return `${base} ${deltaStr} vs prev`
          return base
        }
      },
      titleFont: font,
      bodyFont: font,
      footerFont: font,
    },
    datalabels: {
      anchor: 'center',
      align: 'center',
      textAlign: 'center',
      color: 'black',
      font,
      formatter: (value, context) => {
        const barsAmount = originalDatasets[id][context.dataset.label as string].data.length
        const totalAmount = originalDatasets[id][context.dataset.label as string].data[context.dataIndex]
        let label = context.dataset.label as string
        if (label.length >= (80 / barsAmount)) {
          const insertIndex = label.indexOf('/') + 1
          if (insertIndex > 0) {
            if (value < 0.06) {
              label = label.slice(0, insertIndex - 1) + '…'
            } else {
              label = label.slice(0, insertIndex) + '\n' + label.slice(insertIndex)
            }
          }
        }
        const roundedPercentageValue = tiny
          ? Math.round(Number(value) * 100)
          : Math.round(Number(value) * 100 * 100) / 100
        const percentage = roundedPercentageValue + '%'
        const datasetData = (context.dataset.data as unknown[]) as unknown[]
        const delta = deltaAt(datasetData, context.dataIndex as number)
        const minValueForDelta = tiny ? 0.10 : 0.06
        const deltaStr = value >= minValueForDelta ? formatDelta(delta, tiny ? 0 : 1) : null
        const pctWithDelta = deltaStr ? `${percentage}\n${deltaStr}` : percentage
        if (!value || value < .01) return ''
        else if (tiny) return pctWithDelta
        else if (value < .05) return percentage
        else if (value < .10) return label + '\n' + pctWithDelta
        else return label + '\n' + pctWithDelta + '\n' + totalAmount
      }
    }
  }
})

export const stackedBarChart = (id: string, tiny: boolean = false): ChartOptions => ({
  ...common(id, tiny),
  scales: {
    x: {
      stacked: true,
      ticks: {
        callback(value_: number | string) {
          const value = Number(value_)
          if (tiny) {
            const [month, year] = this.getLabelForValue(value).split(' ')
            return month.substring(0, 3) + ' \'' + year.substring(2, 4)
          } else {
            return this.getLabelForValue(value)
          }
        },
        minRotation: tiny ? 90 : 0,
        maxRotation: 90,
        font
      }
    },
    y: {
      stacked: true,
      ticks: {
        display: !tiny,
        callback: value => (Number(value) * 100) + '%',
        font
      }
    }
  },
})

const legendSpacingPlugin: Plugin = {
  id: 'legendSpacingPlugin',
  beforeInit(chart) {
    if (!chart.legend) return
    const originalFit = chart.legend.fit
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)()
      this.height += 15
    }
  },
}

export const plugins: Plugin[] = [legendSpacingPlugin]
