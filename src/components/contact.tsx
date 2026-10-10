import {ArrowUp, ArrowUpRight, Mail} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {contact} from '@/data/contact';

export async function Contact() {
  const t = await getTranslations('Contact');
  const emailHref = `mailto:${contact.email}`;

  return (
    <footer className="contact-footer">
      <section id="contact" className="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">{t('title')}</h2>
        <a className="contact-invitation" href={emailHref}>
          {t('invitation')}<ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <p className="contact-description">{t('description')}</p>
        <a className="contact-email" href={emailHref}>
          <Mail size={15} strokeWidth={1.7} aria-hidden="true" />
          <span>{contact.email}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </section>

      <div className="contact-navigation">
        <nav className="contact-socials" aria-label={t('socialLabel')}>
          <a href={contact.github} target="_blank" rel="noopener noreferrer"><span>GitHub ↗</span><ArrowUpRight size={12} aria-hidden="true" /></a>
          {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn ↗</span><ArrowUpRight size={12} aria-hidden="true" /></a>}
        </nav>
        <a className="contact-back-top" href="#top">{t('backToTop')}<ArrowUp size={10} aria-hidden="true" /></a>
      </div>

      <div className="contact-bottom">
        <a className="contact-logo" href="#top" aria-label={t('homeLabel')}>RG.</a>
        <small>© 2026 {contact.name}</small>
      </div>
    </footer>
  );
}
