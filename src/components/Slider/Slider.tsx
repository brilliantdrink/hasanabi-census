import {createSignal, onMount} from 'solid-js'
import createEmblaCarousel from 'embla-carousel-solid'
import {default as cn} from 'classnames'
import {HomeSlide} from '../Slide'

import styles from './slider.module.scss'

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
import BarChartSlide from '../Slide/BarChartSlide'
import {BsBoxArrowInLeft, BsBoxArrowInRight} from 'solid-icons/bs'

const barChartSlides = ['Age', 'Gender', 'Political Ideology', 'Ethnicity', 'Religion', 'Sexuality', 'Height',
  'Trans Chatters', 'Location', 'Salary', 'Education', 'VCARD', 'Weebs', 'Eating', 'Neurodiversity']
const barChartSlideFiles = [ageFile, genderFile, politicsFile, raceFile, religionFile, sexualityFile, heightFile,
  transFile, locationFile, salaryFile, educationFile, sexHaversFile, weebFile, eatingFile, neurodivergenceFile]

export default function Slider() {
  const [emblaRef, emblaApi] = createEmblaCarousel()
  const [canScrollNext, setCanScrollNext] = createSignal(false)
  const [canScrollPrev, setCanScrollPrev] = createSignal(false)
  const [slideIndex, setSlideIndex] = createSignal(0)

  function resetCanScroll() {
    setCanScrollNext(emblaApi()?.canScrollNext() ?? false)
    setCanScrollPrev(emblaApi()?.canScrollPrev() ?? false)
    setSlideIndex(emblaApi()?.selectedScrollSnap() ?? 0)
  }

  onMount(() => {
    const api = emblaApi()
    if (api) {
      window.addEventListener('keydown', (e) => {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return
        if (e.key === 'ArrowRight') api.scrollNext()
        if (e.key === 'ArrowLeft') api.scrollPrev()
      })
      resetCanScroll()
      api.on('select', resetCanScroll)
    }
  })

  return <>
    <div class={styles.slider} ref={emblaRef}>
      <div class={styles.container}>
        <div class={styles.slide}><HomeSlide /></div>
        {barChartSlideFiles.map((file, index) => (
          <div class={styles.slide}>
            {file
              ? <BarChartSlide dataFile={file} title={barChartSlides[index]} />
              : 'Strimmer did a Danki'
            }
          </div>
        ))}
      </div>
      <button class={cn(styles.arrow, styles.next, !canScrollNext() && styles.hide)}
              onclick={() => emblaApi()?.scrollNext()}>
        <BsBoxArrowInRight />
      </button>
      <button class={cn(styles.arrow, styles.prev, !canScrollPrev() && styles.hide)}
              onclick={() => emblaApi()?.scrollPrev()}>
        <BsBoxArrowInLeft />
      </button>
      <nav class={styles.nav}>
        {['Cover', ...barChartSlides].map((slide, index) => <>
          <span class={cn(styles.item, slideIndex() === index && styles.selected)}
                onclick={() => emblaApi()?.scrollTo(index)}>
            {slide}
          </span>
        </>)}
      </nav>
    </div>
  </>
}
