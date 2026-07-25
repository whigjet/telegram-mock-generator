import { womanAvatar, femaleNames, messages, dates } from '@/data/chatData'
import type { personaTypes } from '@/types'

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function generateWomanObject(count: number): personaTypes[] {
  const shuffledAvatars = shuffleArray(womanAvatar)
  const shuffledNames = shuffleArray(femaleNames)
  const shuffledMessages = shuffleArray(messages)

  const result: personaTypes[] = []

  for (let i = 0; i < count; i++) {
    const selectedAvatar = shuffledAvatars[i % shuffledAvatars.length]
    const noAvatar = Math.random() < 0.25
    const avatar = noAvatar ? '' : selectedAvatar
    const name = shuffledNames[i % shuffledNames.length]
    const message = shuffledMessages[i % shuffledMessages.length]
    const time = dates[Math.floor(Math.random() * dates.length)]

    result.push({ avatar, name, message, time })
  }

  return result
}
