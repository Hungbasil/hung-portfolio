export * from './work'

// Blog is no longer supported - only work projects are available
export const getPosts = () => []
export const getPostPages = () => []
export const getSortedByDatePosts = () => []
export const getPostsByTag = () => []

export type BlogPage = never
export type PageTree = never

export const post = null
