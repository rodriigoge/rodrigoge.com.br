import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {allProjectsUrl, projects} from '@/data/projects';

function ProjectLink({url, children}: {url: string | null; children: React.ReactNode}) {
  if (!url) return null;
  return <a className="project-link" href={url} target="_blank" rel="noopener noreferrer"><span>{children}</span><ArrowUpRight size={18} aria-hidden="true" /></a>;
}

function Sketch() {
  return (
    <svg className="project-sketch" viewBox="0 0 340 310" fill="none" aria-hidden="true">
      <path d="M45 68 C40 92 58 104 85 104 M77 96 L86 104 L77 112" />
      <path d="M279 34 L284 22 M292 43 L306 32 M295 54 L309 53" />
      <path d="M48 178 L37 173 M47 189 L33 194 M52 201 L42 211" />
      <path d="M286 198 C305 199 313 211 310 225" />
    </svg>
  );
}

export async function Projects() {
  const t = await getTranslations('Projects');
  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <header className="projects-header">
        <div>
          <p className="projects-eyebrow"><span>01</span> / {t('eyebrow')}</p>
          <h2 id="projects-heading">{t('titleLine1')} {t('titleLine2')}</h2>
          <p className="projects-intro">{t('intro')}</p>
        </div>
        <ProjectLink url={allProjectsUrl}>{t('viewAll')}</ProjectLink>
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className={`project-card project-${project.id}`} aria-labelledby={`project-${project.id}-title`}>
            <div className="project-artwork">
              <span className="project-note" aria-hidden="true">{t(`${project.id}.note`)}</span>
              <Sketch />
              {project.id === 'glic' ? (
                <div className="project-phone glic-phone">
                  <div className="phone-camera" />
                  <Image src="/images/projects/glic.png" alt={t('glic.imageAlt')} width={473} height={1028} sizes="220px" />
                </div>
              ) : (
                <div className="project-browser">
                  <div className="browser-toolbar" aria-hidden="true"><i /><i /><i /><span /></div>
                  <Image src={`/images/projects/${project.id}.png`} alt={t(`${project.id}.imageAlt`)} width={project.id === 'decore' ? 1847 : 1887} height={908} sizes="(max-width: 600px) 85vw, (max-width: 1100px) 45vw, 24vw" />
                </div>
              )}
            </div>
            <div className="project-content">
              <p className="project-category"><span>{project.number}</span> / {t(`${project.id}.category`)}</p>
              <h3 id={`project-${project.id}-title`}>{project.name}</h3>
              <p className="project-description">{t(`${project.id}.description`)}</p>
              <ul className="project-tags" aria-label={t('technologies')}>
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <ProjectLink url={project.url}>{t(project.id === 'glic' ? 'github' : 'visit')}</ProjectLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
