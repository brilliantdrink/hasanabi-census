import {ChartOptions, Plugin} from 'chart.js'

const font = {
  family: 'Patrick Hand',
  size: 16,
}

export const common: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {labels: {font}},
    tooltip: {
      callbacks: {
        label: tooltipItem => {
          const percentage = (tooltipItem.raw as number * 100).toFixed(2) + '%'
          return tooltipItem.dataset.label + ': ' + percentage
        }
      },
      titleFont: font,
      bodyFont: font,
      footerFont: font,
    },
    datalabels: {
      anchor: 'center',
      align: 'center',
      color: 'black',
      font,
      formatter: value => Math.round(Number(value) * 100 * 100) / 100 + '%'
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
