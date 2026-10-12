import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {allProjectsUrl, projects} from '@/data/projects';
import {ScrollReveal} from './scroll-reveal';

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
        {projects.map((project, index) => (
          <ScrollReveal as="article" key={project.id} className={`project-card project-${project.id}`} aria-labelledby={`project-${project.id}-title`} delay={index * 0.1}>
            <svg className="project-scribble" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" vectorEffect="non-scaling-stroke" d="M28 7 C240 3 590 11 964 6 Q990 5 991 24 C987 67 996 126 990 177 Q987 193 968 191 C699 197 344 188 32 194 Q9 195 10 177 C14 115 5 61 11 25 Q12 8 35 9" />
              <path pathLength="1" vectorEffect="non-scaling-stroke" d="M54 11 C301 7 653 13 959 10 Q985 9 985 29 L987 174 Q985 188 964 187 C652 193 317 185 37 190 Q15 190 16 172 L15 29 Q16 13 38 13" />
            </svg>
            <div className="project-artwork">
              <span className="project-note" aria-hidden="true">{t(`${project.id}.note`)}</span>
              <Sketch />
              {project.id === 'glic' || project.id === 'stepp' ? (
                <div className={`project-phone ${project.id}-phone`}>
                  <div className="phone-camera" />
                  <Image src={`/images/projects/${project.id}.png`} alt={t(`${project.id}.imageAlt`)} width={project.id === 'stepp' ? 720 : 473} height={project.id === 'stepp' ? 1600 : 1028} sizes="220px" />
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
              <ProjectLink url={project.url}>{t(project.id === 'glic' || project.id === 'stepp' ? 'github' : 'visit')}</ProjectLink>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </ScrollReveal>
  );
}
