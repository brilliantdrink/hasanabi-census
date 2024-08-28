import {ChartOptions, Plugin} from 'chart.js'
import {originalDatasets} from './utils'

const font = {
  family: 'Baskerville',
  size: 16,
}

export const common: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {labels: {font}},
    tooltip: {
      callbacks: {
        label: tooltipItem => {
          const totalAmount =  originalDatasets[tooltipItem.dataset.label as string].data[tooltipItem.dataIndex]
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
        const totalAmount = originalDatasets[context.dataset.label as string].data[context.dataIndex]
        const percentage = Math.round(Number(value) * 100 * 100) / 100 + '%'
        if (!value || value === 0) return ''
        else if (value < .05) return percentage
        else if (value < .10) return context.dataset.label + '\n' + percentage
        else return context.dataset.label + '\n' + percentage + '\n' + totalAmount
      }
    }
  }
}

export const stackedBarChart: ChartOptions = {
  ...common,
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
}

const legendSpacingPlugin: Plugin = {
  id: 'legendSpacingPlugin',
  beforeInit(chart) {
    if (!chart.legend) return
    const originalFit = chart.legend.fit
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)()
      this.height += 25;
    }
  },
}

export const plugins: Plugin[] = [legendSpacingPlugin]
