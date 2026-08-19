from typing import List
from pydantic import BaseModel, Field

class AuthorSchema(BaseModel):
    name: str
    role: str
    avatarUrl: str

class ArticleOut(BaseModel):
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    author: AuthorSchema
    publishedAt: str
    readTime: str
    imageUrl: str
    featured: bool
    tags: List[str]

    @classmethod
    def from_model(cls, instance):
        return cls(
            id=f"article-{instance.id}",
            slug=instance.slug,
            title=instance.title,
            excerpt=instance.excerpt,
            content=instance.content,
            category=instance.category,
            author=AuthorSchema(
                name=instance.author_name,
                role=instance.author_role,
                avatarUrl=instance.author_avatar,
            ),
            publishedAt=instance.published_at,
            readTime=instance.read_time,
            imageUrl=instance.image_url,
            featured=instance.featured,
            tags=instance.tags or [],
        )
