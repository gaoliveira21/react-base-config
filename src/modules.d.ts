declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.png'
declare module '*.gif'

declare module '*.sass' {
  const content: { [className: string]: string }
  export = content
}
