import {createSignal, JSX, onMount} from 'solid-js'
import {Bar} from 'solid-chartjs'
import {Chart, ChartData, Colors, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import DataLabels from 'chartjs-plugin-datalabels'

import styles from './slide.module.scss'
import {plugins, stackedBarChart} from './options'
import getStackedBarData from './getStackedBarData'
import {colorsHeight} from './colors'

export default function BarChartSlide({dataFile, title, note}: { dataFile: string, title: string, note?: string | JSX.Element }) {
  const [data, setData] = createSignal<ChartData>(null!)

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors, DataLabels, LinearScale)
    // PogO hardcoded
    if (title === 'Height') {
      getStackedBarData(dataFile)
        .then(data => {
          let i = 0
          for (const dataset of data.datasets) {
            dataset.backgroundColor = colorsHeight[i++]
          }
          return data
        })
        .then(setData)
    } else {
      getStackedBarData(dataFile).then(setData)
    }
  })

  return <>
    <div class={styles.slide}>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
      <Bar class={styles.chart} data={data()} options={stackedBarChart} plugins={plugins}
           height={window.innerHeight * .8 - 22 * 2} width={window.innerWidth * .6} />
    </div>
  </>
}
