import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {allProjectsUrl, projects} from '@/data/projects';
import {ScrollReveal} from './scroll-reveal';

function ProjectLink({url, children}: {url: string | null; children: React.ReactNode}) {
  if (!url) return null;
  return <a className="project-link" href={url} target="_blank" rel="noopener noreferrer"><span>{children}</span><ArrowUpRight size={18} aria-hidden="true" /></a>;
}

const appScreens = {
  stepp: {
    size: [720, 1600],
    screens: [
      {key: 'shotDetail', src: '/images/projects/stepp-detail.webp', position: 'left'},
      {key: 'shotHome', src: '/images/projects/stepp-home.webp', position: 'center'},
      {key: 'shotNew', src: '/images/projects/stepp-new.webp', position: 'right'}
    ]
  },
  glic: {
    size: [478, 1030],
    screens: [
      {key: 'shotLogin', src: '/images/projects/glic-login.webp', position: 'left'},
      {key: 'shotList', src: '/images/projects/glic-list.webp', position: 'center'},
      {key: 'shotNew', src: '/images/projects/glic-new.webp', position: 'right'}
    ]
  }
} as const;

export async function Projects() {
  const t = await getTranslations('Projects');
  return (
    <ScrollReveal as="section" id="projects" className="projects" aria-labelledby="projects-heading" distance={0}>
      <ScrollReveal as="header" className="projects-header">
        <div>
          <p className="projects-eyebrow"><span>01</span> / {t('eyebrow')}</p>
          <h2 id="projects-heading">{t('titleLine1')} {t('titleLine2')}</h2>
          <p className="projects-intro">{t('intro')}</p>
        </div>
        <ProjectLink url={allProjectsUrl}>{t('viewAll')}</ProjectLink>
      </ScrollReveal>

      <div className="projects-grid">
        {projects.map((project, index) =>
          project.id === 'stepp' || project.id === 'glic' ? (
            <ScrollReveal as="article" key={project.id} className={`project-card project-card-web project-card-app project-${project.id}`} aria-labelledby={`project-${project.id}-title`} delay={index * 0.1}>
              <div className="project-devices">
                {appScreens[project.id].screens.map((screen) => (
                  <figure key={screen.key} className={`project-device project-device-${screen.position}`}>
                    <span className="project-device-island" aria-hidden="true" />
                    <Image src={screen.src} alt={t(`${project.id}.${screen.key}`)} width={appScreens[project.id].size[0]} height={appScreens[project.id].size[1]} sizes="260px" unoptimized />
                  </figure>
                ))}
              </div>
              <div className="project-web-footer">
                <div className="project-web-text">
                  <h3 id={`project-${project.id}-title`}>{project.name}</h3>
                  <p>{t(`${project.id}.summary`)}</p>
                </div>
                <a className="project-web-button" href={project.url} target="_blank" rel="noopener noreferrer">
                  {t('github')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </ScrollReveal>
          ) : project.id === 'decore' || project.id === 'specialday' ? (
            <ScrollReveal as="article" key={project.id} className={`project-card project-card-web project-${project.id}`} aria-labelledby={`project-${project.id}-title`} delay={index * 0.1}>
              <div className="project-web-shot">
                <Image
                  src={project.id === 'decore' ? '/images/projects/decore-home-hq.webp' : '/images/projects/specialday-hq.webp'}
                  alt={t(`${project.id}.imageAlt`)}
                  width={2880}
                  height={project.id === 'decore' ? 1370 : 1386}
                  sizes="(max-width: 700px) 90vw, 1000px"
                  unoptimized
                />
              </div>
              <div className="project-web-footer">
                <div className="project-web-text">
                  <h3 id={`project-${project.id}-title`}>{project.name}</h3>
                  <p>{t(`${project.id}.summary`)}</p>
                </div>
                <a className="project-web-button" href={project.url} target="_blank" rel="noopener noreferrer">
                  {t('visit')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </ScrollReveal>
          ) : null
        )}
      </div>
    </ScrollReveal>
  );
}
