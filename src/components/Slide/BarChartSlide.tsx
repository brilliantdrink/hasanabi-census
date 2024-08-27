import {createSignal, onMount} from 'solid-js'
import {Bar} from 'solid-chartjs'
import {Chart, ChartData, Colors, Legend, LinearScale, plugins, Title, Tooltip} from 'chart.js'
import DataLabels from 'chartjs-plugin-datalabels'

import styles from './slide.module.scss'
import {stackedBarChart} from './options'
import getStackedBarData from './getStackedBarData'

export default function BarChartSlide({dataFile, title}: { dataFile: string, title: string }) {
  const [data, setData] = createSignal<ChartData>(null!)

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors, DataLabels, LinearScale)
    getStackedBarData(dataFile).then(setData)
  })

  return <>
    <div class={styles.slide}>
      <h2>{title}</h2>
      <Bar data={data()} options={stackedBarChart} plugins={plugins}
           height={window.innerHeight * .8} width={window.innerWidth * .6} />
    </div>
  </>
}
