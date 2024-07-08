export interface AddBlogPostsRequest {
    title: string,
    shortDescription: string,
    content: string,
    featuredImageUrl: string,
    urlHandle: string,
    publishedDate: string,
    author: string,
    isVisible: boolean
}