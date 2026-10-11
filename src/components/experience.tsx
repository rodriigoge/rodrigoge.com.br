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
