export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')
export const isLoggedIn = () => useState<boolean>('isLoggedIn', () => false)
export const navPfp = () => useState<string>('navPfp', () => '')