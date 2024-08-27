import BarChartSlide from './BarChartSlide'
import politicsFile from '../../data/politics.csv'

export default function PoliticsSlide() {
  return <BarChartSlide dataFile={politicsFile} title={'Political Ideology'} />
}
