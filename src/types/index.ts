export interface personaTypes {
  avatar: string
  name: string
  message: string
  time: string
}

export interface buttonTypes {
  icon: React.ReactElement
  title: string
  onClick: () => void
}

export interface NavIconProps {
  src: string | React.ReactNode
  description: string
}
