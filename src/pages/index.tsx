import { useAsync } from '@/hooks/useAsync';
import bridg from 'bridg';
import { NextPage } from 'next';

const BridgExample: NextPage = ({}) => {
  // Query your DB from the frontend 😎
  console.log('bridg', bridg);

  const data = useAsync(() =>
    bridg.user.findMany({
      // uncomment to filter your results:
      // where: { email: { contains: 'alice@prisma' } },
      // uncomment include related data:
      include: { blogs: true },
    }),
  );

  return data !== undefined ? <pre>{JSON.stringify(data, null, 1)}</pre> : <div>hey</div>;
};

export default BridgExample;

const users = [
  {
    email: 'user1@example.com',
    name: 'Alice Smith',
    blogs: [
      { title: 'Adventures in Wonderland', body: 'Exploring a whimsical world.' },
      { title: 'The Art of Baking Delights', body: 'Creating delicious pastries.' },
      { title: 'My Travel Diary', body: 'Journeying through amazing destinations.' },
    ],
  },
  {
    email: 'user2@example.com',
    name: 'Bob Johnson',
    blogs: [
      { title: "Time Traveler's Journal", body: 'Exploring the mysteries of time.' },
      { title: 'Dreamscape Chronicles', body: 'Unraveling the world of dreams.' },
      { title: 'Culinary Adventures', body: 'Tasting global flavors.' },
    ],
  },
  {
    email: 'user3@example.com',
    name: 'Charlie Brown',
    blogs: [
      { title: 'Underwater Odyssey', body: 'Diving into ocean wonders.' },
      { title: 'The Art of Expression', body: 'Expressing through art forms.' },
      { title: 'Literary Escapes', body: 'Exploring classic literature.' },
    ],
  },
  {
    email: 'user4@example.com',
    name: 'David Miller',
    blogs: [
      { title: 'Astronomy Adventures', body: 'Exploring the universe beyond.' },
      { title: 'Harmonious Notes', body: 'Discovering the world of music.' },
      { title: 'Tales from the Rainforest', body: 'Adventures in lush jungles.' },
    ],
  },
  {
    email: 'user5@example.com',
    name: 'Eva White',
    blogs: [
      { title: 'Architectural Marvels', body: 'Marveling at iconic structures.' },
      { title: 'Through the Lens', body: 'Capturing moments through photography.' },
      { title: 'Gourmet Discoveries', body: 'Culinary journeys around the world.' },
    ],
  },
  {
    email: 'user6@example.com',
    name: 'Frank Green',
    blogs: [
      { title: 'Desert Expeditions', body: 'Survival and discoveries in arid landscapes.' },
      { title: 'Natural Symphony', body: 'Listening to the melodies of nature.' },
      { title: 'Unearthed History', body: 'Uncovering historical secrets.' },
    ],
  },
  {
    email: 'user7@example.com',
    name: 'Grace Davis',
    blogs: [
      { title: 'Epic Road Trips', body: 'Adventures on the open road.' },
      { title: 'The Pottery Artistry', body: 'Crafting with clay and creativity.' },
      { title: 'A World of Flavors', body: 'Culinary delights from diverse cuisines.' },
    ],
  },
  {
    email: 'user8@example.com',
    name: 'Henry Anderson',
    blogs: [
      { title: 'Urban Exploration Chronicles', body: 'Discovering hidden city gems.' },
      { title: 'Language of Flowers', body: 'Exploring the symbolism of blooms.' },
      { title: 'Cinematic Odyssey', body: 'A journey through the world of film.' },
    ],
  },
  {
    email: 'user9@example.com',
    name: 'Isabella Clark',
    blogs: [
      { title: 'Wildlife Wonders', body: 'Observing and appreciating the animal kingdom.' },
      { title: 'Mindfulness Moments', body: 'Embracing the present through mindfulness.' },
      { title: 'Asian Gastronomy', body: 'Culinary adventures through Asian cuisine.' },
    ],
  },
  {
    email: 'user10@example.com',
    name: 'Jack Turner',
    blogs: [
      { title: 'Deep Sea Mysteries', body: 'Exploring the enigmas of the ocean.' },
      { title: 'The Creative Journey', body: 'Unleashing creativity in art.' },
      { title: 'Mediterranean Flavors', body: 'Savoring coastal cuisine.' },
    ],
  },
];

const seedDb = () =>
  Promise.all(
    users.map((user) =>
      bridg.user.create({
        data: {
          email: user.email,
          name: user.name,
          blogs: {
            create: user.blogs?.at(0),
          },
        },
      }),
    ),
  );
