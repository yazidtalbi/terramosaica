"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language";
import Image from "next/image";
import brandLogo from "./public/logo.png";
import introductionIllustration from "./public/illu.png";
import artisanSeparator from "./public/Artisan façonnant un carreau rouge.png";
import redTiles from "./public/Carrelage rouge aux arcades écailleuses (1).png";
import limeTiles from "./public/terramosaica_lime_scallop.png";
import cobaltTiles from "./public/terramosaica_blue_zellige.png";
import salmonTiles from "./public/terramosaica_pink_scallop.png";
import footerPhoto0 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.16.png";
import footerPhoto1 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.29.png";
import footerPhoto2 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.38.png";
import footerPhoto3 from "./public/footer/Capture d’écran 2026-11-10 à 15.34.48.png";
import footerPhoto4 from "./public/footer/Capture d’écran 2026-11-10 à 15.35.04.png";
import galleryInterior from "./gallery/4.png";
import galleryPink from "./gallery/5.png";
import galleryQuarry from "./gallery/6 (1).png";
import galleryClay from "./gallery/6.png";
import galleryRose from "./gallery/11.png";
import galleryPalette from "./gallery/14.png";
import galleryRed from "./gallery/15.png";
import galleryDiamond from "./gallery/17.png";
import galleryBlue from "./gallery/18.png";
import galleryMaterial from "./gallery/21.png";
import galleryArtisan from "./gallery/22.png";
import galleryGreenRoom from "./gallery/26.png";
import galleryEarthRoom from "./gallery/27.png";
import galleryRoseRoom from "./gallery/28.png";
import galleryTextiles from "./gallery/29.png";
import galleryChair from "./gallery/30.png";
import { ArrowRight, ArrowUpRight, ChevronDown, Plus, Minus, Facebook, Instagram, Mail, MessageCircle, Phone, MapPin } from "react-feather";

const links = [
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

const galleryImages = [
  { image: galleryInterior, alt: "Intérieur aux murs de zellige vert et rouge" },
  { image: galleryPink, alt: "Fruits et ombres sur un zellige rose" },
  { image: galleryBlue, alt: "Losanges de zellige bleu profond" },
  { image: galleryArtisan, alt: "Artisan tenant de l’argile dans ses mains" },
  { image: galleryRose, alt: "Nuances de carreaux de zellige rose" },
  { image: galleryGreenRoom, alt: "Palette de zellige rose dans un intérieur vert" },
  { image: galleryRed, alt: "Détail de carreaux rectangulaires rouge terre" },
  { image: galleryDiamond, alt: "Composition de losanges bleu clair et blancs" },
  { image: galleryQuarry, alt: "La terre brute dans la carrière" },
  { image: galleryEarthRoom, alt: "Zellige bleu dans une architecture aux tons de terre" },
  { image: galleryPalette, alt: "Palette de zellige rouge, rose, bleu et jaune" },
  { image: galleryClay, alt: "Texture de l’argile avant le façonnage" },
  { image: galleryRoseRoom, alt: "Zellige terracotta dans un intérieur rose" },
  { image: galleryTextiles, alt: "Zellige blanc associé à des matières textiles" },
  { image: galleryMaterial, alt: "La matière et le geste, autour de l’argile" },
  { image: galleryChair, alt: "Zellige jaune sur un fauteuil bleu" },
];

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
  const { t } = useLanguage();
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
      {heroVideo ? <video data-parallax="0.14" data-parallax-limit="65" ref={videoRef} src={heroVideo} muted loop playsInline preload="metadata" /> : <Placeholder label={t("Vidéo de l’atelier")} />}
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
  const { t } = useLanguage();
  return <a href="#accueil" className={footer ? "footer-lockup" : "brand"} aria-label={t("Terra Mosaica, accueil")}><span className="brand-logo"><Image src={brandLogo} alt="" sizes={footer ? "300px" : "160px"} /></span></a>;
}

function Placeholder({ className = "", label }: { className?: string; label: string }) {
  const { t } = useLanguage();
  const parallax = className.includes("detail") ? "-0.055" : className.includes("image") || className === "project-main" ? "0.04" : undefined;
  return <div className={`placeholder ${className}`} data-parallax={parallax} data-parallax-limit="24" role="img" aria-label={`${label}, ${t("image à venir")}`}><span className="placeholder-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4" /><circle cx="15.5" cy="8.5" r="1.5" /></svg></span></div>;
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#accueil");
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedCollection = collections.find(({ name }) => name === activeCollection);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const galleryDialogRef = useRef<HTMLDialogElement>(null);
  const selectedGallery = activeGallery === null ? null : galleryImages[activeGallery];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      ".story-heading > .eyebrow, .story-heading > h2, .story-statement, .story-column > p, .collections-band .section-heading, .collection-card, .gallery-heading, .gallery-item"
    ));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove("text-reveal-pending");
        observer.unobserve(target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    const showAll = () => {
      if (!preference.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("text-reveal-pending"));
    };
    if (!preference.matches) {
      elements.forEach((element) => {
        element.classList.add("text-reveal");
        // Content already above the viewport stays readable on restored scrolls.
        if (element.getBoundingClientRect().top >= window.innerHeight * .92) {
          element.classList.add("text-reveal-pending");
          observer.observe(element);
        }
      });
    }
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showAll);
      elements.forEach((element) => element.classList.remove("text-reveal", "text-reveal-pending"));
    };
  }, []);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let direction = 0;
    let travel = 0;
    let frame = 0;
    setNavbarScrolled(lastY > 24);
    const update = () => {
      frame = 0;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      setNavbarScrolled(y > 24);
      let currentSection = "#accueil";
      let closestTop = -Infinity;
      for (const [, href] of links) {
        const section = document.getElementById(href.slice(1));
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= window.innerHeight * .35 && top > closestTop) {
          currentSection = href;
          closestTop = top;
        }
      }
      if (y + window.innerHeight >= document.documentElement.scrollHeight - 8) currentSection = "#export";
      setActiveSection(currentSection);
      const delta = y - lastY;
      const nextDirection = Math.sign(delta);
      if (nextDirection) {
        travel = nextDirection === direction ? travel + Math.abs(delta) : Math.abs(delta);
        direction = nextDirection;
      }
      if (y <= 24) {
        setNavbarHidden(false);
        travel = 0;
      } else if (direction < 0 && travel >= 6) {
        setNavbarHidden(false);
      } else if (direction > 0 && travel >= 10 && y > (headerRef.current?.offsetHeight ?? 104)) {
        const keyboardFocus = headerRef.current?.contains(document.activeElement) && document.activeElement?.matches(":focus-visible");
        setNavbarHidden(!keyboardFocus);
      }
      lastY = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (activeCollection) dialogRef.current?.showModal();
  }, [activeCollection]);

  useEffect(() => {
    if (activeGallery !== null) galleryDialogRef.current?.showModal();
  }, [activeGallery]);

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
        <Brand />
        <div className="header-utilities">
          <div className="header-languages" role="group" aria-label={t("Langue du site")}>
            <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button><span aria-hidden="true">/</span><button type="button" lang="fr" aria-label="Français" aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
          </div>
        </div>
        <nav className="desktop-nav nav-left" aria-label={t("Navigation principale")}>{links.slice(0, 2).map(([label, href]) => <a key={href} href={href} aria-current={activeSection === href ? "location" : undefined} onClick={() => setActiveSection(href)}>{t(label)}</a>)}</nav>
        <nav className="desktop-nav nav-right" aria-label={t("Navigation secondaire")}>{links.slice(2).map(([label, href]) => <a key={href} href={href} aria-current={activeSection === href ? "location" : undefined} onClick={() => setActiveSection(href)}>{t(label)}</a>)}</nav>
        <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} aria-label={t(menuOpen ? "Fermer le menu" : "Ouvrir le menu")}><span /><span /></button>
        {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label={t("Navigation mobile")}>{links.map(([label, href]) => <a key={href} href={href} aria-current={activeSection === href ? "location" : undefined} onClick={() => { setActiveSection(href); setMenuOpen(false); }}>{t(label)}<Arrow /></a>)}</nav>}
      </div></header>

      <main>
        <section className="hero" id="accueil">
          <HeroVideo />
          <div className="hero-copy content-width" data-parallax="0.08" data-parallax-limit="45">
            <p className="hero-side hero-side-left">{t("Façonné")}<br />{t("à la main")}</p>
            <h1>{t("L’art du")}<br /><em>zellige</em>{t(" marocain")}</h1>
            <p className="hero-side hero-side-right">{t("L’âme")}<br />{t("du Maroc")}</p>
          </div>
            <div className="hero-actions">
              <a className="button hero-primary" href="#collections">Explore<Arrow /></a>
              <details className="whatsapp-menu">
                <summary className="button hero-secondary"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.3-4.3A8 8 0 1 1 20 11.6Z" /><path d="M9 8c0 3.5 2 5.5 5.5 6l1-1.5-2-1-1 1c-1.5-.5-2-1-2.5-2.5l1-1-1-2L9 8Z" /></svg>WhatsApp<ChevronDown className="whatsapp-chevron" size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
                <div className="whatsapp-options">{whatsappContacts.map(({label, number}) => number ? <a key={label} href={`https://wa.me/${number.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"><span>{t(label)}</span><strong>{number}</strong><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></a> : <div key={label} className="whatsapp-placeholder" aria-disabled="true"><span>{t(label)}</span><strong>{t("Numéro à venir")}</strong></div>)}</div>
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
              <p className="eyebrow">{t("Depuis des générations")}</p>
              <h2 id="story-heading">{t("Trois siècles,")}<br /><em>{t("six générations")}</em></h2>
              <p className="story-statement">{t("Chaque pièce est unique.")}<br />{t("Chaque assemblage raconte une histoire.")}</p>
            </div>
            <div className="story-text">
              <div className="story-column" data-parallax="-0.025" data-parallax-limit="16">
                <p>{t("Depuis plus de 300 ans, notre savoir-faire se transmet de père en fils au cœur du Maroc. Six générations d’artisans ont façonné la même terre, avec les mêmes gestes. Une histoire de patience, de matière et de transmission, qui se lit dans chaque carreau.")}</p>
              </div>
              <figure className="story-portrait" data-parallax="0.09" data-parallax-limit="40">
                <Image className="story-portrait-image" src={footerPhoto2} alt={t("Les mains d’un artisan traçant un motif sur un carreau de zellige")} sizes="(max-width: 760px) 200px, 250px" placeholder="blur" />
              </figure>
              <div className="story-column" data-parallax="0.035" data-parallax-limit="22">
                <p>{t("De l’extraction de l’argile dans nos carrières jusqu’à la pose finale chez le client, nous maîtrisons chaque étape. De la mine à la réalisation, la terre est façonnée, émaillée et assemblée à la main pour donner vie à des compositions singulières, pensées pour vos espaces.")}</p>
              </div>
            </div>
            <a className="button story-cta" href="#savoir-faire">{t("Découvrir notre histoire")}<Arrow /></a>
          </div>
          <div className="story-stats">
            <dl className="story-stats-inner content-width" aria-label={t("Terra Mosaica en quelques chiffres")}>
              <div><dt>{t("Ans d’histoire")}</dt><dd>300</dd></div>
              <div><dt>{t("Générations")}</dt><dd>6</dd></div>
              <div><dt>{t("Fait main")}</dt><dd>100<span>%</span></dd></div>
              <div><dt>{t("Étapes de fabrication")}</dt><dd>4</dd></div>
            </dl>
          </div>
        </section>

          <div className="story-reveal-space">
            <div className="separator-copy" data-separator-reveal>
              <p className="separator-lead">{t("La matière rencontre")}</p>
              <p className="separator-script">{t("le geste.")}</p>
            </div>
          </div>

        <section className="collections-band" id="collections">
          <div className="collections section-inset">
          <SectionHeading title={t("Collections")} action={t("Explorer les collections")} href="#collection-grid" />
          <div className="collection-grid" id="collection-grid">
            {collections.map(({ name, image, alt, description }, index) => <button data-parallax={index % 2 === 0 ? "0.045" : "-0.045"} data-parallax-limit="24" className="collection-card" key={name} onClick={() => setActiveCollection(name)} aria-haspopup="dialog">
              <div className="collection-image"><Image src={image} alt={t(alt)} fill sizes="(max-width: 760px) 46vw, (max-width: 1840px) 24vw, 424px" placeholder="blur" /></div>
              <span className="collection-card-copy">
                <span className="collection-card-title">{t(name)}</span>
                <span className="collection-card-description">{t(description)}</span>
                <span className="collection-card-explore"><span>{t("Explorer la collection")}</span><Arrow /></span>
              </span>
            </button>)}
          </div>
          </div>
        </section>
        </div>

        <section className="atelier-section" id="savoir-faire" aria-labelledby="atelier-heading">
          <div className="content-width">
            <div className="atelier-heading">
              <p className="eyebrow">{t("Façonné à la main au Maroc")}</p>
              <h2 id="atelier-heading">{t("Un savoir-faire de")}<br /><em>{t("confiance")}</em></h2>
              <p className="atelier-lead">{t("De la carrière à la pose, chaque carreau porte la main de l’artisan et la rigueur d’un atelier structuré.")}</p>
            </div>
            <div className="atelier-process">
              <article>
                <span className="atelier-material">{t("La terre")}</span>
                <h3>{t("Façonner")}</h3>
                <p>{t("L’argile est travaillée à la main, moulée en carreaux puis séchée. Chaque pièce porte déjà l’empreinte du geste.")}</p>
              </article>
              <article>
                <span className="atelier-material">{t("Le feu")}</span>
                <h3>{t("Cuire")}</h3>
                <p>{t("Une première cuisson donne au carreau sa résistance. La terre se transforme, tout en conservant son caractère.")}</p>
              </article>
              <article>
                <span className="atelier-material">{t("La couleur")}</span>
                <h3>{t("Émailler")}</h3>
                <p>{t("L’émail est appliqué avant une nouvelle cuisson. Les nuances se révèlent, les reflets prennent vie.")}</p>
              </article>
              <article>
                <span className="atelier-material">{t("Le motif")}</span>
                <h3>{t("Tailler & assembler")}</h3>
                <p>{t("Taillés à la main avec précision, les carreaux s’assemblent. De leurs singularités naît une composition unique.")}</p>
              </article>
            </div>
            <ul className="atelier-commitments">
              <li>{t("Couleurs et dimensions sur mesure")}</li>
              <li>{t("Contrôle qualité rigoureux")}</li>
              <li>{t("Capacité de production pour grands projets")}</li>
              <li>{t("Livraison internationale")}</li>
            </ul>
          </div>
        </section>

        <section className="gallery-section" id="galerie" aria-labelledby="gallery-heading">
          <div className="content-width">
            <div className="gallery-heading">
              <p className="eyebrow">{t("Matières & inspirations")}</p>
              <h2 id="gallery-heading">{t("Le zellige,")} <em>{t("en images.")}</em></h2>
            </div>
            <div className="gallery-grid">
              {galleryImages.map(({ image, alt }, index) => <figure className="gallery-item" key={image.src}>
                <button className="gallery-open" type="button" onClick={() => setActiveGallery(index)} aria-haspopup="dialog" aria-label={`${t("Agrandir l’image")} : ${t(alt)}`}>
                  <Image src={image} alt={t(alt)} sizes="(max-width: 760px) 46vw, (max-width: 1100px) 30vw, (max-width: 1872px) 23vw, 428px" placeholder="blur" />
                </button>
              </figure>)}
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="content-width faq-inner">
            <h2 id="faq-heading">FAQ</h2>
            <div className="faq-list">
              {faqs.map(({ question, answer }) => <details className="faq-item" key={question}>
                <summary><span>{t(question)}</span><span className="faq-indicator" aria-hidden="true"><Plus className="faq-plus" size={18} strokeWidth={1.5} /><Minus className="faq-minus" size={18} strokeWidth={1.5} /></span></summary>
                <p>{t(answer)}</p>
              </details>)}
            </div>
          </div>
        </section>

        <section className="enquiry-section" id="contact" aria-labelledby="enquiry-heading">
          <div className="content-width enquiry-inner">
            <h2 id="enquiry-heading">{t("Parlons de ")}<em>{t("votre projet.")}</em></h2>
            <p className="enquiry-lead">{t("Conseil, échantillons, devis. Imaginons ensemble votre composition.")}</p>
            <div className="enquiry-actions">
              <a className="button enquiry-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />WhatsApp<Arrow /></a>
              <a className="button" href={`mailto:${contactEmail}`}><Mail size={20} strokeWidth={1.5} aria-hidden="true" />Email<Arrow /></a>
            </div>
            <address className="enquiry-details">
              <a href={`mailto:${contactEmail}`}><Mail size={16} strokeWidth={1.5} aria-hidden="true" />{contactEmail}</a>
              <a href="tel:+212664960189"><Phone size={16} strokeWidth={1.5} aria-hidden="true" />{contactPhone}</a>
              <span><MapPin size={16} strokeWidth={1.5} aria-hidden="true" />{t("Casablanca, Maroc")}</span>
            </address>
            <p className="enquiry-note">{t("Production : 4 à 8 semaines selon commande. Livraison au Maroc et à l’international.")}</p>
          </div>
        </section>
      </main>

      <div className="footer-gallery" role="region" aria-label={t("L’univers Terra Mosaica en images")}>
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
            <nav className="footer-links" aria-label={t("Navigation de pied de page")}>
              <p>Menu</p>
              <a href="#collections">Collections</a>
              <a href="#savoir-faire">{t("Savoir-faire")}</a>
              <a href="#histoire">{t("Notre histoire")}</a>
            </nav>
            <nav className="footer-links" aria-label={t("Nos services")}>
              <p>Services</p>
              <a href="#contact">{t("Sur mesure")}</a>
              <a href="#contact">Export</a>
              <a href="#contact">{t("Accompagnement")}</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="footer-socials" aria-label={t("Restons en contact")}>
              <button type="button" disabled aria-label={t("Facebook, bientôt disponible")} title={t("Facebook, bientôt disponible")}><Facebook size={17} strokeWidth={1.4} aria-hidden="true" /></button>
              <button type="button" disabled aria-label={t("Instagram, bientôt disponible")} title={t("Instagram, bientôt disponible")}><Instagram size={17} strokeWidth={1.4} aria-hidden="true" /></button>
              <a href="mailto:info@terramosaica.com" aria-label={t("Nous écrire par email")}><Mail size={17} strokeWidth={1.4} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="footer-base">
            <span>© Terra Mosaica {new Date().getFullYear()}</span>
            <div><a href="mailto:info@terramosaica.com">{t("Nous contacter")}</a><a href="#accueil">{t("Retour en haut")}<ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></a></div>
          </div>
        </div>
      </footer>
      </div>

      {selectedGallery && <dialog ref={galleryDialogRef} className="gallery-modal" aria-label={t("Aperçu de l’image")} aria-describedby="gallery-caption" data-lenis-prevent onCancel={() => setActiveGallery(null)} onClose={() => setActiveGallery(null)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setActiveGallery(null);
      }}>
        <button type="button" className="gallery-modal-close" autoFocus aria-label={t("Fermer l’image")} onClick={() => setActiveGallery(null)}>×</button>
        <Image src={selectedGallery.image} alt={t(selectedGallery.alt)} sizes="(max-width: 760px) 90vw, 1000px" loading="eager" placeholder="blur" style={{ width: `min(1000px, calc(100vw - 64px), calc((100svh - 150px) * ${selectedGallery.image.width / selectedGallery.image.height}))` }} />
        <p id="gallery-caption">{t(selectedGallery.alt)}</p>
      </dialog>}

      <a className="samples-whatsapp" href={`${whatsappUrl}?text=${encodeURIComponent(t("Bonjour, je souhaite demander des échantillons pour mon projet."))}`} target="_blank" rel="noopener noreferrer">
        <span className="samples-whatsapp-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none"><path d="M27.5 15.5a11.5 11.5 0 0 1-17 10.1L4 27.5l1.9-6.3A11.5 11.5 0 1 1 27.5 15.5Z" stroke="currentColor" strokeWidth="2" /><path d="M11.1 9.5c-.4 0-1.1.2-1.5.8-.5.6-1 1.4-1 2.6 0 1.3.9 3.1 2.8 5.2 2.3 2.5 5.3 4 7.2 4.1 1.2.1 2.7-.8 3-1.8l.3-1.4c0-.2-.2-.4-.5-.6l-2.8-1.3c-.3-.1-.5-.1-.7.2l-1.1 1.4c-.2.2-.4.3-.7.1-1.5-.6-3.3-2.1-4.1-3.5-.2-.3-.1-.5.1-.7l.9-1.2c.2-.3.3-.5.1-.8l-1.2-2.8c-.1-.3-.3-.4-.6-.4h-.2Z" fill="currentColor" /></svg>
        </span>
        <span>{t("Échantillons")}</span>
      </a>

      {activeCollection && <dialog ref={dialogRef} className="collection-modal" aria-labelledby="collection-title" onCancel={() => setActiveCollection(null)} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setActiveCollection(null); } }}><button className="modal-close" autoFocus onClick={() => setActiveCollection(null)} aria-label={t("Fermer la collection")}>×</button>{selectedCollection && <div className="collection-preview-image"><Image src={selectedCollection.image} alt={t(selectedCollection.alt)} fill sizes="(max-width: 480px) 85vw, 380px" placeholder="blur" /></div>}<p className="eyebrow">{t("Les collections Terra Mosaica")}</p><h2 id="collection-title">{t(activeCollection)}</h2><p>{t("Des nuances et des formats à composer selon votre projet. Contactez-nous pour découvrir les possibilités et imaginer votre réalisation.")}</p><a className="button" href="mailto:info@terramosaica.com">{t("Parlons de votre projet")}<Arrow /></a></dialog>}
    </>
  );
}
