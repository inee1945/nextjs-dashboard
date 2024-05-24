// /app/ui/search.tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // 검색 매개변수사용 훅
  const searchParams = useSearchParams();
  // URL 경로 가져오기
  const pathname = usePathname();
  // 라우터 replace함수
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    // 검색 매개변수 사용하는 인스턴스 생성
    const params = new URLSearchParams(searchParams);
    // 검색어 입력시 페이지 매개변수 1로 재설정
    params.set('page', '1');

    // 입력이 빈칸이면 delete실행하여 + 로 문자 연결
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // 검색 데이터로 url 업데이트
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
