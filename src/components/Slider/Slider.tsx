import {createSignal, onMount} from 'solid-js'
import createEmblaCarousel from 'embla-carousel-solid'
import {default as cn} from 'classnames'
import {BsBoxArrowInLeft, BsBoxArrowInRight} from 'solid-icons/bs'
import {HomeSlide} from '../Slide'

import styles from './slider.module.scss'

import BarChartSlide from '../Slide/BarChartSlide'
import {barChartSlides} from '../Slide/slideData'

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
        {barChartSlides.map(({name, fileUrl, note}, index) => (
          <div class={styles.slide}>
            <BarChartSlide dataFile={fileUrl} title={name} note={note} />
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
        {[{name: 'Cover'}, ...barChartSlides].map(({name: slide}, index) => <>
          <span class={cn(styles.item, slideIndex() === index && styles.selected)}
                onclick={() => emblaApi()?.scrollTo(index)}>
            {slide}
          </span>
        </>)}
      </nav>
    </div>
  </>
}
