import { Author, Startup } from '@/sanity/sanity.types'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }
