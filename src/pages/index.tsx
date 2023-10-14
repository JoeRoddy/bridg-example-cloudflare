import { useAsync } from '@/hooks/useAsync';
import bridg from 'bridg';
import { NextPage } from 'next';

const BridgExample: NextPage = ({}) => {
  // Query your DB from the frontend 😎
  const data = useAsync(() =>
    bridg.log.findMany({
      // uncomment to filter your results:
      // where: { email: { contains: 'alice@prisma' } },
      // uncomment include related data:
      // include: { blogs: true },
    }),
  );

  return data !== undefined ? <pre>{JSON.stringify(data, null, 1)}</pre> : <div>hey</div>;
};

export default BridgExample;
