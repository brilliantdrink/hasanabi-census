import {ChartOptions, Plugin} from 'chart.js'
import {originalDatasets} from './utils'

const font = {
  family: 'Fraunces',
  size: 15,
}

export const common = (id: string): ChartOptions => ({
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
          return `${tooltipItem.dataset.label}: ${percentage} (${totalAmount})`
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
        const totalAmount = originalDatasets[id][context.dataset.label as string].data[context.dataIndex]
        let label = context.dataset.label as string
        if (label.length > 20) {
          const insertIndex = label.indexOf('/') + 1
          label = label.slice(0, insertIndex) + '\n' + label.slice(insertIndex)
        }
        const percentage = Math.round(Number(value) * 100 * 100) / 100 + '%'
        if (!value || value === 0) return ''
        else if (value < .05) return percentage
        else if (value < .10) return label + '\n' + percentage
        else return label + '\n' + percentage + '\n' + totalAmount
      }
    }
  }
})

export const stackedBarChart = (id: string): ChartOptions => ({
  ...common(id),
  scales: {
    x: {
      stacked: true,
      ticks: {font}
    },
    y: {
      stacked: true,
      ticks: {
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
