import {JSX} from 'solid-js'

import ageFile from "../../data/age.csv"
import genderFile from "../../data/gender.csv"
import politicsFile from "../../data/politics.csv"
import raceFile from "../../data/race.csv"
import religionFile from "../../data/religion.csv"
import sexualityFile from "../../data/sexuality.csv"
import heightFile from "../../data/height.csv"
import transFile from "../../data/trans.csv"
import locationFile from "../../data/location.csv"
import salaryFile from "../../data/salary.csv"
import educationFile from "../../data/education.csv"
import sexHaversFile from "../../data/sex-havers.csv"
import weebFile from "../../data/weeb.csv"
import eatingFile from "../../data/eating.csv"
import neurodivergenceFile from "../../data/neurodivergence.csv"
import gamingFile from "../../data/gaming.csv"

import styles from './slide.module.scss'

const madge = 'https://cdn.betterttv.net/emote/6083d2f139b5010444d0540e/3x.webp'

interface SlideData {
  name: string,
  fileUrl: string
  note?: string | JSX.Element
}

export const barChartSlides: SlideData[] = [{
  name: 'Age',
  fileUrl: ageFile,
}, {
  name: 'Gender',
  fileUrl: genderFile,
}, {
  name: 'Political Ideology',
  fileUrl: politicsFile,
}, {
  name: 'Ethnicity',
  fileUrl: raceFile,
}, {
  name: 'Religion',
  fileUrl: religionFile,
}, {
  name: 'Sexuality',
  fileUrl: sexualityFile,
}, {
  name: 'Height',
  fileUrl: heightFile,
  note: <>(Categories changed for 2023 <img src={madge} class={styles.inlineIcon} alt={''} /> )</>,
}, {
  name: 'Trans Chatters',
  fileUrl: transFile,
}, {
  name: 'Location',
  fileUrl: locationFile,
}, {
  name: 'Salary',
  fileUrl: salaryFile,
}, {
  name: 'Education',
  fileUrl: educationFile,
}, {
  name: 'VCARD',
  fileUrl: sexHaversFile,
}, {
  name: 'Weebs',
  fileUrl: weebFile,
}, {
  name: 'Eating',
  fileUrl: eatingFile,
}, {
  name: 'Neurodiversity',
  fileUrl: neurodivergenceFile,
}, {
  name: 'Gayming Frogs',
  fileUrl: gamingFile,
}]
