import {getTranslations} from 'next-intl/server';
import {Blocks, CodeXml, Lightbulb, UsersRound} from 'lucide-react';
import {AnimatedPrinciple} from './animated-principle';
import {ScrollReveal} from './scroll-reveal';

const principles = [
  {key: 'architecture', Icon: Blocks},
  {key: 'engineering', Icon: CodeXml},
  {key: 'collaboration', Icon: UsersRound},
  {key: 'problemSolving', Icon: Lightbulb}
] as const;

export async function About() {
  const t = await getTranslations('About');

  return (
    <ScrollReveal as="section" id="about" className="about" aria-labelledby="about-heading" distance={0}>
      <ScrollReveal className="about-introduction">
        <h2 id="about-heading">{t('title')}</h2>
        <p className="about-lead">
          {t.rich('lead', {highlight: (chunks) => <span>{chunks}</span>})}
        </p>
        <p className="about-description">{t.rich('background', {strong: (chunks) => <strong>{chunks}</strong>})}</p>
        {t.has('approach') && <p className="about-description">{t('approach')}</p>}
      </ScrollReveal>

      <ul className="about-principles">
        {principles.map(({key, Icon}, index) => (
          <AnimatedPrinciple key={key} index={index}>
            <h3><Icon size={16} strokeWidth={1.7} aria-hidden="true" />{t(`${key}.title`)}</h3>
            <p>{t(`${key}.description`)}</p>
          </AnimatedPrinciple>
        ))}
      </ul>
    </ScrollReveal>
  );
}
