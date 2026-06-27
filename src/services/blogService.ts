import Backendless from '../configs/backendless.config';

export interface BlogArticle {
  objectId: string;
  title: string;
  image: string;
  content: string;
  published: number;
}

export type UserWithRole = Backendless.User & {
  role?: 'admin' | 'user';
};

export async function getBlogs(): Promise<BlogArticle[]> {
  const queryBuilder = Backendless.DataQueryBuilder.create().setSortBy(['published DESC']);
  return Backendless.Data.of('Blogs').find<BlogArticle>(queryBuilder);
}

export async function deleteBlog(objectId: string): Promise<void> {
  await Backendless.Data.of('Blogs').remove({ objectId });
}

export async function updateBlog(blog: Partial<BlogArticle> & { objectId: string }): Promise<void> {
  await Backendless.Data.of('Blogs').save(blog);
}