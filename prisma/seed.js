
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const posts = [
    {
        body: 'Prisma makes database easy',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p"

    },
    {
        body: 'Follow me on twitter',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'Follow me on instagram',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'Follow me on facebook',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'Follow me on linkedin',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'Follow me on github',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'Follow me on youtube',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'Follow me on twitch',
        imgUrl: 'https://picsum.photos/seed/picsum/300/300',
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: 'so beautiful',
        imgUrl: "https://images.mubicdn.net/images/cast_member/314022/cache-452323-1562963147/image-w856.jpg?size=300x",
        authorId: "cld36efl00000wfblow44xk0p",
    },
    {
        body: "I'm a software engineer",
        imgUrl: "https://elcomercio.pe/resizer/ID1RLqN1AitUkhx7HlQ-ODtkY-E=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/GKQJZFGTQFBDRAMJ7FAHQLMHQQ.jpg",
        authorId: "cld36efl00000wfblow44xk0p",
    }
        
]

async function main() {
    console.log(`Start seeding ...`)
    for (const p of posts) {
        const post = await prisma.post.create({
            data: p,
        })
        console.log(`Created post with id: ${post.id}`)
    }
    console.log(`Seeding finished.`)
}
main()