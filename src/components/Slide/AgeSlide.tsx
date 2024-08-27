import BarChartSlide from './BarChartSlide'
import ageFile from '../../data/age.csv'

export default function AgeSlide() {
  return <BarChartSlide dataFile={ageFile} title={'Age'} />
}
