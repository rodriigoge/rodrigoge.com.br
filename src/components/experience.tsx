import {getTranslations} from 'next-intl/server';

const experiences = [
  {key: 'hst', company: 'HST Card Technology', current: true},
  {key: 'tinnova', company: 'Tinnova Software Solutions', current: false},
  {key: 'b2ml', company: 'B2ML Sistemas', current: false}
] as const;

export async function Experience() {
  const t = await getTranslations('Experience');

  return (
    <section id="experience" className="experience" aria-labelledby="experience-heading">
      <header className="experience-header">
        <h2 id="experience-heading">{t('title')}</h2>
        <p>{t('intro')}</p>
      </header>

      <ol className="experience-timeline">
        {experiences.map(({key, company, current}) => (
          <li key={key} className={`experience-entry${current ? ' experience-current' : ''}`}>
            <svg className="experience-scribble" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" vectorEffect="non-scaling-stroke" d="M28 7 C240 3 590 11 964 6 Q990 5 991 24 C987 67 996 126 990 177 Q987 193 968 191 C699 197 344 188 32 194 Q9 195 10 177 C14 115 5 61 11 25 Q12 8 35 9" />
              <path pathLength="1" vectorEffect="non-scaling-stroke" d="M54 11 C301 7 653 13 959 10 Q985 9 985 29 L987 174 Q985 188 964 187 C652 193 317 185 37 190 Q15 190 16 172 L15 29 Q16 13 38 13" />
            </svg>
            <div className="experience-entry-heading">
              <h3>{company}</h3>
              <span className="experience-period">{t(`${key}.period`)}</span>
            </div>
            <p className="experience-role">{t('role')}</p>
            <p className="experience-description">{t(`${key}.description`)}</p>
            {key === 'hst' && <p className="experience-achievement">{t('hst.achievement')}</p>}
            {key === 'tinnova' && t.has('tinnova.achievement') && <p className="experience-achievement">{t('tinnova.achievement')}</p>}
            {key === 'b2ml' && t.has('b2ml.achievement') && <p className="experience-achievement">{t('b2ml.achievement')}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
