import BarChartSlide from './BarChartSlide'
import genderFile from '../../data/gender.csv'

export default function GenderSlide() {
  return <BarChartSlide dataFile={genderFile} title={'Gender'} />
}
