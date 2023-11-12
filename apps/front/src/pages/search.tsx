import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { MusicLayout } from '@/components/Layout/MusicLayout';

const SearchPage: React.FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  if (!query) {
    router.push('/');
    return null;
  }

  return (
    <MusicLayout>
      <div>{`"${query}"`}에 대한 검색 결과</div>
      <div></div>
    </MusicLayout>
  );
};

export default SearchPage;
