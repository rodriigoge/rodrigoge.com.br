import {ArrowUp, ArrowUpRight, Github, Linkedin, Mail} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {contact} from '@/data/contact';
import {ScrollReveal} from './scroll-reveal';
import {Signature} from './signature';

export async function Contact() {
  const t = await getTranslations('Contact');
  const emailHref = `mailto:${contact.email}`;

  return (
    <ScrollReveal as="footer" className="contact-footer" distance={0}>
      <section id="contact" className="contact" aria-labelledby="contact-heading">
        <ScrollReveal>
        <h2 id="contact-heading">{t('title')}</h2>
        <a className="contact-invitation" href={emailHref}>
          {t('invitation')}<ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <p className="contact-description">{t('description')}</p>
        </ScrollReveal>
        <ScrollReveal className="contact-navigation" delay={0.1}>
          <nav className="contact-socials" aria-label={t('socialLabel')}>
        <ScrollReveal as="a" className="contact-email" href={emailHref} delay={0.1}>
          <Mail size={15} strokeWidth={1.7} aria-hidden="true" />
          <span>{contact.email}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </ScrollReveal>
          <ScrollReveal as="a" href={contact.github} target="_blank" rel="noopener noreferrer" delay={0.2}><Github size={17} strokeWidth={1.7} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={14} aria-hidden="true" /></ScrollReveal>
          {contact.linkedin && <ScrollReveal as="a" href={contact.linkedin} target="_blank" rel="noopener noreferrer" delay={0.3}><Linkedin size={17} strokeWidth={1.7} aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight size={14} aria-hidden="true" /></ScrollReveal>}
        </nav>
        <a className="contact-back-top" href="#top">{t('backToTop')}<ArrowUp size={14} aria-hidden="true" /></a>
      </ScrollReveal>
      </section>

      <ScrollReveal className="contact-bottom" delay={0.15}>
        <a className="contact-logo" href="#top" aria-label={t('homeLabel')}><Signature /></a>
        <small>© 2026 {contact.name}</small>
      </ScrollReveal>
    </ScrollReveal>
  );
}
