import styles from './slide.module.scss'

import {default as cn} from 'classnames'
import Signature from '../Signature'

export default function HomeSlide() {
  return <>
    <div class={cn(styles.slide, styles.home)}>
      <h1>The HasanAbi Census</h1>
      <p><i>with data from June 2020 to July 2023</i></p>
      <p>(bodged together in like 4 hours okay, but i'll improve it later)</p>
      {/*<p>art and stylistic direction by Oni_Spumoni</p>*/}
      {/*<p>website by brilliantdrink</p>*/}
      <Signature class={styles.signature} classSvg={''}/>
    </div>
  </>
}
