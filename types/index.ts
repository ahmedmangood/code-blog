export type StartupTypeCard = {
  _id: number
  _createdAt: string | Date | any
  views: number
  author: { _id: string; name: string; image: string; bio: string }
  description: string
  image: string
  title: string
  category: string
  slug: { current: string; _type: string }
}
