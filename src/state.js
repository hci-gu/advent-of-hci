import { atom } from 'jotai'
import moment from 'moment'
import data from './data'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const daysAtom = atom(
  shuffleArray(
    data.map(({ text, url, image, index }, i) => {
      const date = moment('2021-12-01').add(i, 'days').startOf('day')
      return {
        index,
        opened: false,
        date,
        text,
        image,
        url,
      }
    })
  )
)

export const setOpenedAtom = atom(null, (get, set, { index, opened }) => {
  const days = get(daysAtom)
  const day = days.find((day) => day.index === index)
  day.opened = opened
  //   const day = {
  //     ...days[index],
  //     opened,
  //   }

  set(daysAtom, [...days])
})
