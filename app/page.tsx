"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import brandLogo from "./public/logo.png";
import introductionIllustration from "./public/illu.png";
import artisanSeparator from "./public/Artisan façonnant un carreau rouge.png";
import redTiles from "./public/4F3A9212.jpg";
import limeTiles from "./public/4F3A9212-lime.jpg";
import cobaltTiles from "./public/781d28b54_panelsquarecobalt_deepbleu.jpg";
import salmonTiles from "./public/d32b6874a_panelfishice_salamone.jpg";
import footerPhoto0 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.16.png";
import footerPhoto1 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.29.png";
import footerPhoto2 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.38.png";
import footerPhoto3 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.48.png";
import footerPhoto4 from "./public/footer/Capture d’écran 2026-11-10 à 15.35.04.png";
import { ArrowRight, ArrowUpRight, ChevronDown, Plus, Minus, Facebook, Instagram, Mail, MessageCircle, Phone, MapPin } from "react-feather";

const links = [
  ["Accueil", "#accueil"],
  ["Savoir-faire", "#savoir-faire"],
  ["Collections", "#collections"],
  ["Export", "#export"],
  ["Contact", "#contact"],
];


const collections = [
  { name: "Zellige", description: "La chaleur de la terre, la singularité du geste. Une matière vivante aux nuances profondes.", image: redTiles, alt: "Zellige rouge aux formes d’écailles" },
  { name: "Émaillé", description: "Des reflets intenses, une couleur vibrante. La lumière révèle chaque variation de l’émail.", image: cobaltTiles, alt: "Carreaux carrés émaillés bleu cobalt" },
  { name: "Géométrique", description: "Des lignes qui se répondent, des rythmes qui se composent. Une nouvelle lecture des formes traditionnelles.", image: limeTiles, alt: "Composition géométrique en écailles vert citron" },
  { name: "Motifs", description: "Des teintes douces, des contrastes délicats. Des compositions qui donnent du caractère à vos espaces.", image: salmonTiles, alt: "Motif d’écailles rose saumon et blanc" },
];

const footerImages = [footerPhoto0, footerPhoto1, footerPhoto2, footerPhoto3, footerPhoto4];

const faqs = [
  { question: "Qu’est-ce qui rend chaque zellige unique ?", answer: "Façonné, taillé et émaillé à la main, le zellige présente de légères variations de teinte, de relief et de dimensions. Ces nuances font partie de son caractère et créent une surface vivante, sensible à la lumière." },
  { question: "Comment choisir les couleurs et les formats pour mon projet ?", answer: "Partagez-nous les dimensions de votre espace, vos inspirations et l’usage prévu. Nous pourrons échanger sur les palettes, les formats et les associations de motifs pour composer un ensemble adapté à votre projet." },
  { question: "Le zellige convient-il aux cuisines et aux salles de bain ?", answer: "Le choix du carreau et sa mise en œuvre dépendent de la surface, de l’exposition à l’eau et de l’usage. Précisez-nous l’emplacement envisagé afin de discuter des finitions et des précautions de pose avec votre professionnel." },
  { question: "Comment préparer une demande sur mesure ou à l’international ?", answer: "Indiquez la surface souhaitée, le lieu de livraison, les couleurs ou motifs recherchés et votre calendrier. Ces éléments permettent de préciser ensemble les possibilités, les quantités, les délais et les modalités de votre projet." },
];

const heroVideo = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero.mp4";
const contactEmail = "info@terramosaica.com";
const contactPhone = "+212 664-960189";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_1 || contactPhone;
const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
const whatsappContacts = [
  { label: "WhatsApp, projets", number: whatsappNumber },
  ...(process.env.NEXT_PUBLIC_WHATSAPP_2 ? [{ label: "WhatsApp, accompagnement", number: process.env.NEXT_PUBLIC_WHATSAPP_2 }] : []),
];

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroVideo) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (motion.matches) video.pause();
      else void video.play().catch(() => {});
    };
    update();
    motion.addEventListener("change", update);
    return () => { motion.removeEventListener("change", update); video.pause(); };
  }, []);

  return <>
    <div className="hero-media" aria-hidden="true">
      {heroVideo ? <video data-parallax="0.14" data-parallax-limit="65" ref={videoRef} src={heroVideo} muted loop playsInline preload="metadata" /> : <Placeholder label="Vidéo de l’atelier" />}
    </div>
    <div className="hero-overlay" aria-hidden="true" />
  </>;
}

function Arrow() { return <ArrowRight className="arrow" size={20} strokeWidth={1.5} aria-hidden="true" />; }

function SectionHeading({ eyebrow, title, action, href }: { eyebrow?: string; title: string; action: string; href: string }) {
  return <div className="section-heading">
    <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>
    <a className="button" href={href}>{action}<Arrow /></a>
  </div>;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#accueil" className={footer ? "footer-lockup" : "brand"} aria-label="Terra Mosaica, accueil"><span className="brand-logo"><Image src={brandLogo} alt="" sizes={footer ? "300px" : "160px"} /></span></a>;
}

function Placeholder({ className = "", label }: { className?: string; label: string }) {
  const parallax = className.includes("detail") ? "-0.055" : className.includes("image") || className === "project-main" ? "0.04" : undefined;
  return <div className={`placeholder ${className}`} data-parallax={parallax} data-parallax-limit="24" role="img" aria-label={`${label}, image à venir`}><span className="placeholder-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4" /><circle cx="15.5" cy="8.5" r="1.5" /></svg></span></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedCollection = collections.find(({ name }) => name === activeCollection);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let frame = 0;
    setNavbarScrolled(lastY > 24);
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setNavbarScrolled(y > 24);
      if (y <= 24) {
        setNavbarHidden(false);
        lastY = y;
      } else if (Math.abs(y - lastY) >= 8) {
        const hasFocus = headerRef.current?.contains(document.activeElement);
        setNavbarHidden(y > lastY && y > 112 && !hasFocus);
        lastY = y;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (activeCollection) dialogRef.current?.showModal();
  }, [activeCollection]);

  useEffect(() => {
    if (!menuOpen && !activeCollection) return;
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); setActiveCollection(null); } };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, activeCollection]);

  return (
    <>
      <div className="site-shell">
      <header ref={headerRef} className={`header${navbarScrolled || menuOpen ? " is-scrolled" : ""}${navbarHidden && !menuOpen ? " is-hidden" : ""}`} inert={navbarHidden && !menuOpen}><div className="header-inner content-width">
        <nav className="desktop-nav nav-left" aria-label="Navigation principale">{links.slice(0, 3).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <Brand />
        <nav className="desktop-nav nav-right" aria-label="Navigation secondaire">{links.slice(3).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}><span /><span /></button>
        {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navigation mobile">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<Arrow /></a>)}</nav>}
      </div></header>

      <main>
        <section className="hero" id="accueil">
          <HeroVideo />
          <div className="hero-copy content-width" data-parallax="0.08" data-parallax-limit="45">
            <p className="hero-side hero-side-left">Façonné<br />à la main</p>
            <h1>L’art du<br /><em>zellige</em> marocain</h1>
            <p className="hero-side hero-side-right">L’âme<br />du Maroc</p>
          </div>
            <div className="hero-actions">
              <a className="button hero-primary" href="#collections">Explore<Arrow /></a>
              <details className="whatsapp-menu">
                <summary className="button hero-secondary"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.3-4.3A8 8 0 1 1 20 11.6Z" /><path d="M9 8c0 3.5 2 5.5 5.5 6l1-1.5-2-1-1 1c-1.5-.5-2-1-2.5-2.5l1-1-1-2L9 8Z" /></svg>WhatsApp<ChevronDown className="whatsapp-chevron" size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
                <div className="whatsapp-options">{whatsappContacts.map(({label, number}) => number ? <a key={label} href={`https://wa.me/${number.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"><span>{label}</span><strong>{number}</strong><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></a> : <div key={label} className="whatsapp-placeholder" aria-disabled="true"><span>{label}</span><strong>Numéro à venir</strong></div>)}</div>
              </details>
            </div>
        </section>

        <div className="story-reveal">
          <div className="story-reveal-media">
            <Image className="collection-separator" src={artisanSeparator} alt="" fill sizes="100vw" placeholder="blur" />
            <div className="separator-overlay" aria-hidden="true" />
          </div>
        <section className="story" id="histoire" aria-labelledby="story-heading">
          <div className="story-frame content-width">
            <div className="story-heading" data-parallax="0.025" data-parallax-limit="18">
              <Image className="story-illustration" src={introductionIllustration} alt="" sizes="56px" />
              <p className="eyebrow">Depuis des générations</p>
              <h2 id="story-heading">L’art de la terre,<br /><strong>la beauté du geste.</strong></h2>
              <p className="story-statement">Chaque pièce est unique.<br />Chaque assemblage raconte une histoire.</p>
            </div>
            <div className="story-text">
              <div className="story-column" data-parallax="-0.025" data-parallax-limit="16">
                <p>Né de la terre et façonné par la main, le zellige marocain raconte une histoire de patience, de matière et de transmission. De l’argile à l’émail, du carreau au motif, chaque geste laisse son empreinte. Ses nuances et ses reliefs composent une matière vivante, qui se découvre au fil de la lumière.</p>
              </div>
              <figure className="story-portrait" data-parallax="0.09" data-parallax-limit="40">
                <Image className="story-portrait-image" src={footerPhoto2} alt="Les mains d’un artisan traçant un motif sur un carreau de zellige" sizes="(max-width: 760px) 200px, 250px" placeholder="blur" />
              </figure>
              <div className="story-column" data-parallax="0.035" data-parallax-limit="22">
                <p>Chez Terra Mosaica, cette richesse artisanale rencontre une vision contemporaine des espaces. Couleurs, formats et motifs se répondent pour créer des compositions singulières, du détail discret aux grandes surfaces. Chaque nuance, chaque irrégularité révèle la beauté d’un savoir-faire ancestral. Plus qu’un revêtement, le zellige apporte une présence, une profondeur et une sensibilité à l’architecture : celle d’une matière façonnée par le temps et par la main.</p>
              </div>
            </div>
            <a className="button story-cta" href="#savoir-faire">Découvrir notre histoire<Arrow /></a>
          </div>
          <div className="story-stats">
            <dl className="story-stats-inner content-width" aria-label="Terra Mosaica en quelques chiffres">
              <div><dt>Façonné à la main</dt><dd>100<span>%</span></dd><dd className="story-stat-description">Le geste de l’artisan, dans chaque carreau.</dd></div>
              <div><dt>Collections singulières</dt><dd>{collections.length}</dd><dd className="story-stat-description">Des couleurs et des motifs pour chaque univers.</dd></div>
              <div><dt>Étapes de fabrication</dt><dd>4</dd><dd className="story-stat-description">De la terre au motif, un savoir-faire artisanal.</dd></div>
              <div><dt>Possibilités de composition</dt><dd>∞</dd><dd className="story-stat-description">Formats, nuances et rythmes à imaginer ensemble.</dd></div>
            </dl>
          </div>
        </section>

          <div className="story-reveal-space">
            <div className="separator-copy" data-separator-reveal>
              <p className="separator-lead">La matière rencontre</p>
              <p className="separator-script">le geste.</p>
            </div>
          </div>

        <section className="collections-band" id="collections">
          <div className="collections section-inset">
          <SectionHeading title="Collections" action="Explorer les collections" href="#collection-grid" />
          <div className="collection-grid" id="collection-grid">
            {collections.map(({ name, image, alt, description }, index) => <button data-parallax={index % 2 === 0 ? "0.045" : "-0.045"} data-parallax-limit="24" className="collection-card" key={name} onClick={() => setActiveCollection(name)} aria-haspopup="dialog">
              <div className="collection-image"><Image src={image} alt={alt} fill sizes="(max-width: 760px) 46vw, (max-width: 1840px) 24vw, 424px" placeholder="blur" /></div>
              <span className="collection-card-title">{name}</span>
              <span className="collection-card-description">{description}</span>
            </button>)}
          </div>
          </div>
        </section>
        </div>

        <section className="atelier-section" id="savoir-faire" aria-labelledby="atelier-heading">
          <div className="content-width">
            <div className="atelier-heading">
              <p>De la terre brute au motif vivant</p>
              <h2 id="atelier-heading">Notre savoir-faire</h2>
            </div>
            <div className="atelier-process">
              <article>
                <span className="atelier-material">La terre</span>
                <h3>Façonner</h3>
                <p>L’argile est travaillée à la main, moulée en carreaux puis séchée. Chaque pièce porte déjà l’empreinte du geste.</p>
              </article>
              <article>
                <span className="atelier-material">Le feu</span>
                <h3>Cuire</h3>
                <p>Une première cuisson donne au carreau sa résistance. La terre se transforme, tout en conservant son caractère.</p>
              </article>
              <article>
                <span className="atelier-material">La couleur</span>
                <h3>Émailler</h3>
                <p>L’émail est appliqué avant une nouvelle cuisson. Les nuances se révèlent, les reflets prennent vie.</p>
              </article>
              <article>
                <span className="atelier-material">Le motif</span>
                <h3>Tailler & assembler</h3>
                <p>Taillés à la main avec précision, les carreaux s’assemblent. De leurs singularités naît une composition unique.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="content-width faq-inner">
            <h2 id="faq-heading">FAQ</h2>
            <div className="faq-list">
              {faqs.map(({ question, answer }) => <details className="faq-item" key={question}>
                <summary><span>{question}</span><span className="faq-indicator" aria-hidden="true"><Plus className="faq-plus" size={18} strokeWidth={1.5} /><Minus className="faq-minus" size={18} strokeWidth={1.5} /></span></summary>
                <p>{answer}</p>
              </details>)}
            </div>
          </div>
        </section>

        <section className="enquiry-section" id="contact" aria-labelledby="enquiry-heading">
          <div className="content-width enquiry-inner">
            <h2 id="enquiry-heading">Parlons de <em>votre projet.</em></h2>
            <p className="enquiry-lead">Conseil, échantillons, devis. Imaginons ensemble votre composition.</p>
            <div className="enquiry-actions">
              <a className="button enquiry-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />WhatsApp<Arrow /></a>
              <a className="button" href={`mailto:${contactEmail}`}><Mail size={20} strokeWidth={1.5} aria-hidden="true" />Email<Arrow /></a>
            </div>
            <address className="enquiry-details">
              <a href={`mailto:${contactEmail}`}><Mail size={16} strokeWidth={1.5} aria-hidden="true" />{contactEmail}</a>
              <a href="tel:+212664960189"><Phone size={16} strokeWidth={1.5} aria-hidden="true" />{contactPhone}</a>
              <span><MapPin size={16} strokeWidth={1.5} aria-hidden="true" />Casablanca, Maroc</span>
            </address>
            <p className="enquiry-note">Production : 4 à 8 semaines selon commande. Livraison au Maroc et à l’international.</p>
          </div>
        </section>
      </main>

      <div className="footer-gallery" role="region" aria-label="L’univers Terra Mosaica en images">
        {footerImages.map((image) => (
          <div className="footer-gallery-image" key={image.src}>
            <Image src={image} alt="" fill sizes="20vw" placeholder="blur" />
          </div>
        ))}
      </div>

      <footer className="footer" id="export">
        <div className="footer-inner content-width">
          <div className="footer-layout">
            <Brand footer />
            <nav className="footer-links" aria-label="Navigation de pied de page">
              <p>Menu</p>
              <a href="#collections">Collections</a>
              <a href="#savoir-faire">Savoir-faire</a>
              <a href="#histoire">Notre histoire</a>
            </nav>
            <nav className="footer-links" aria-label="Nos services">
              <p>Services</p>
              <a href="#contact">Sur mesure</a>
              <a href="#contact">Export</a>
              <a href="#contact">Accompagnement</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="footer-socials" aria-label="Restons en contact">
              <button type="button" disabled aria-label="Facebook, bientôt disponible" title="Facebook, bientôt disponible"><Facebook size={17} strokeWidth={1.4} aria-hidden="true" /></button>
              <button type="button" disabled aria-label="Instagram, bientôt disponible" title="Instagram, bientôt disponible"><Instagram size={17} strokeWidth={1.4} aria-hidden="true" /></button>
              <a href="mailto:info@terramosaica.com" aria-label="Nous écrire par email"><Mail size={17} strokeWidth={1.4} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="footer-base">
            <span>© Terra Mosaica {new Date().getFullYear()}</span>
            <div><a href="mailto:info@terramosaica.com">Nous contacter</a><a href="#accueil">Retour en haut<ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></a></div>
          </div>
        </div>
      </footer>
      </div>

      {activeCollection && <dialog ref={dialogRef} className="collection-modal" aria-labelledby="collection-title" onCancel={() => setActiveCollection(null)} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setActiveCollection(null); } }}><button className="modal-close" autoFocus onClick={() => setActiveCollection(null)} aria-label="Fermer la collection">×</button>{selectedCollection && <div className="collection-preview-image"><Image src={selectedCollection.image} alt={selectedCollection.alt} fill sizes="(max-width: 480px) 85vw, 380px" placeholder="blur" /></div>}<p className="eyebrow">Les collections Terra Mosaica</p><h2 id="collection-title">{activeCollection}</h2><p>Des nuances et des formats à composer selon votre projet. Contactez-nous pour découvrir les possibilités et imaginer votre réalisation.</p><a className="button" href="mailto:info@terramosaica.com">Parlons de votre projet<Arrow /></a></dialog>}
    </>
  );
}
