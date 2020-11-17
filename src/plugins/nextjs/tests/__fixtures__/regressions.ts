export const regression_602 = `
import { PrismaClient } from '@prisma/client';
export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const song = await prisma.song.findOne({
    include: { artist: true },
    where: {
      id: Number(params.id)
    }
  });
  return {
    props: {
      song
    }
  };
}
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany();
  return {
    paths: songs.map((s) => ({ params: { id: String(s.id) } })),
    fallback: false
  };
}
export default ({ song }) => (
  <iframe
    width="100%"
    height="315"
    src={\`https://www.youtube.com/embed/\${song.youtubeId}\`}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
  `

