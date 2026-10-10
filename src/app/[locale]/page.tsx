import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/hero';
import {About} from '@/components/about';
import {Projects} from '@/components/projects';
import {Experience} from '@/components/experience';
import {Contact} from '@/components/contact';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <><main><Hero /><About /><Projects /><Experience /></main><Contact /></>;
}
