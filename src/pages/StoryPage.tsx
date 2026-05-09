import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderModal } from '../components/OrderModal';
import { Reveal } from '../components/Reveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { contact, storyPageContent, storyTimeline } from '../data/site';
import { trackStoryNavigation, trackWhatsAppIntent } from '../lib/analytics';
import '../styles/story.css';

export function StoryPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [waModalOpen, setWaModalOpen] = useState(false);

  useEffect(() => {
    document.title = storyPageContent.seoTitle;
  }, []);

  const openWhatsAppModal = (source: string) => {
    trackWhatsAppIntent(source);
    setWaModalOpen(true);
  };

  return (
    <>
      <nav className="story-nav">
        <Link to="/" className="nav-logo">
          <img className="brand-logo-image nav-brand-logo" src="/logo.png" alt="Well Hamburgueria" />
        </Link>
        <Link to="/" className="back-link" onClick={() => trackStoryNavigation('story_back_link')}>
          <span>←</span> Voltar ao site
        </Link>
      </nav>

      <section className="page-hero">
        <div className="page-eyebrow">Nossa História</div>
        <h1 className="page-title">
          A MULHER POR TRÁS
          <br />
          DA <span className="accent">WELL</span>
        </h1>
        <p className="page-lede">{storyPageContent.lede}</p>

        <Reveal className="portrait">
          <>
            <img
              className="story-image"
              src="/assets/well-vanessa-trailer.jpg"
              alt="Vanessa ao lado do trailer da Well Hamburgueria"
            />
            <div className="story-image-overlay" />
            <div className="story-image-caption">
              <span className="story-image-kicker">Nossa Essência</span>
              <strong>um sonho que continuou</strong>
              <small>a história da Well é feita de amor, saudade, coragem e continuidade</small>
            </div>
          </>
        </Reveal>
      </section>

      <article className="article">
        <Reveal className="chapter">
          <>
            <div className="chapter-num">{storyPageContent.chapters[0].number}</div>
            <h2 className="chapter-title">{storyPageContent.chapters[0].title}</h2>
            <div className="chapter-body">
              <p className="placeholder-block">{storyPageContent.chapters[0].body}</p>
            </div>
          </>
        </Reveal>

        <Reveal className="pull-quote">
          <>
            {storyPageContent.quotes[0]}
            <span className="author">— {storyPageContent.founderName}</span>
          </>
        </Reveal>

        <Reveal className="chapter">
          <>
            <div className="chapter-num">{storyPageContent.chapters[1].number}</div>
            <h2 className="chapter-title">{storyPageContent.chapters[1].title}</h2>
            <div className="chapter-photo">
              <img
                className="story-image"
                src="/assets/well-vanessa-burger.jpg"
                alt="Vanessa segurando um hambúrguer artesanal dentro da cozinha da Well"
              />
              <div className="story-image-overlay chapter-overlay" />
              <div className="story-image-caption story-image-caption-inline">
                <span className="story-image-kicker">Memória Que Virou Força</span>
                <strong>presença, cuidado e continuidade</strong>
                <small>
                  Vanessa transformou esse sonho em projeto, afeto e sabor servido todos os dias
                </small>
              </div>
            </div>
            <div className="chapter-body">
              <p className="placeholder-block">{storyPageContent.chapters[1].body}</p>
            </div>
          </>
        </Reveal>

        <Reveal className="chapter">
          <>
            <div className="chapter-num">{storyPageContent.chapters[2].number}</div>
            <h2 className="chapter-title">{storyPageContent.chapters[2].title}</h2>
            <div className="chapter-body">
              <p className="placeholder-block">{storyPageContent.chapters[2].body}</p>
            </div>
          </>
        </Reveal>

        <Reveal className="pull-quote">
          <>
            {storyPageContent.quotes[1]}
            <span className="author">— {storyPageContent.founderName}</span>
          </>
        </Reveal>

        <Reveal className="chapter">
          <>
            <div className="chapter-num">{storyPageContent.chapters[3].number}</div>
            <h2 className="chapter-title">{storyPageContent.chapters[3].title}</h2>
            <div className="chapter-body">
              <p className="placeholder-block">{storyPageContent.chapters[3].body}</p>
            </div>
          </>
        </Reveal>
      </article>

      <section className="timeline-section">
        <div className="timeline-wrap">
          <Reveal className="timeline-head">
            <>
              <div className="page-eyebrow">Linha do Tempo</div>
              <h2 className="chapter-title">
                MARCOS DA{' '}
                <span className="accent timeline-accent">
                  JORNADA
                </span>
              </h2>
            </>
          </Reveal>

          <div className="timeline">
            {storyTimeline.map((item) => (
              <Reveal key={item.title} className="tl-item">
                <>
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-title">{item.title}</div>
                  <p className="tl-text placeholder-block">{item.text}</p>
                </>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="back-cta">
        <h2>
          VAMOS <span className="accent">EXPERIMENTAR?</span>
        </h2>
        <p>Agora que você conhece a história, que tal viver ela na primeira mordida?</p>
        <div className="actions">
          <button type="button" onClick={() => openWhatsAppModal('story_cta')} className="btn-primary btn-whatsapp">
            <WhatsAppIcon />
            Chamar no WhatsApp
          </button>
          <Link
            to="/"
            className="btn-primary story-back-button"
            onClick={() => trackStoryNavigation('story_cta_back')}
          >
            ← Voltar ao site
          </Link>
        </div>
      </section>

      <footer className="story-footer">
        <p>Well Hamburgueria © 2026 · Lami, Porto Alegre — RS</p>
      </footer>

      <button
        className="wa-float wa-float-button"
        type="button"
        aria-label="Abrir WhatsApp"
        onClick={() => openWhatsAppModal('story_floating_button')}
      >
        <WhatsAppIcon />
      </button>
      <OrderModal open={orderModalOpen} onClose={() => setOrderModalOpen(false)} source="story_modal" />
      <WhatsAppModal open={waModalOpen} onClose={() => setWaModalOpen(false)} source="story_modal" />
    </>
  );
}
