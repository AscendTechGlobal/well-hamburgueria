import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderModal } from '../components/OrderModal';
import { Particles } from '../components/Particles';
import { Reveal } from '../components/Reveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { contact, homeContent, homeReviews, storeUnits, whyItems } from '../data/site';
import {
  trackInstagramClick,
  trackMapsClick,
  trackMenuIntent,
  trackStoryNavigation,
  trackWhatsAppIntent,
} from '../lib/analytics';
import '../styles/home.css';

export function HomePage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(storeUnits[0].id);
  const selectedUnit = storeUnits.find((unit) => unit.id === selectedUnitId) ?? storeUnits[0];

  useEffect(() => {
    document.title = homeContent.seoTitle;
  }, []);

  const openWhatsAppModal = (source: string) => {
    trackWhatsAppIntent(source);
    setWaModalOpen(true);
  };

  const openOrderModal = (source: string) => {
    trackMenuIntent(source);
    setOrderModalOpen(true);
  };

  return (
    <>
      <HomeNavbar onOpenOrderModal={() => openOrderModal('navbar_cta')} />
      <section className="hero">
        <img
          className="hero-bg-img"
          src="/assets/burger-hero.jpg"
          alt="Hambúrguer artesanal Well com pão rosa"
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-glow b" />
        <Particles />

        <div className="hero-content">
          <div className="hero-tag">
            <span className="flame">🔥</span>
            <span>{homeContent.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title">
            <span className="l1">{homeContent.hero.titleTop}</span>
            <span className="l2">{homeContent.hero.titleBottom}</span>
          </h1>
          <p className="hero-subtitle">{homeContent.hero.subtitle}</p>
          <div className="hero-actions">
            <button className="btn-primary btn-whatsapp" type="button" onClick={() => openWhatsAppModal('hero_cta')}>
              <WhatsAppIcon />
              Chamar no WhatsApp
            </button>
            <button className="btn-outline" type="button" onClick={() => openOrderModal('hero_cta')}>
              Ver Cardápio
              <span style={{ fontSize: '1rem' }}>↓</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="icn" style={{ color: 'var(--gold)' }}>
                ★
              </span>
              <span className="lbl">
                <strong>5.0</strong> no Google
              </span>
            </div>
            <div className="hero-stat">
              <span className="icn" style={{ color: 'var(--pink-soft)' }}>
                📍
              </span>
              <span className="lbl">
                <strong>Lami</strong> · Porto Alegre
              </span>
            </div>
            <div className="hero-stat">
              <span className="icn">🍔</span>
              <span className="lbl">
                <strong>Pães</strong> especiais
              </span>
            </div>
            <div className="hero-stat">
              <span className="icn">🔥</span>
              <span className="lbl">
                <strong>Carne</strong> no ponto
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-bar" aria-hidden="true">
        <div className="marquee-track">
          {[
            'SMASH BURGER ARTESANAL',
            'PÃES ESPECIAIS',
            'PONTO PERFEITO',
            'LAMI · PORTO ALEGRE',
            '5.0 NO GOOGLE',
            'SMASH BURGER ARTESANAL',
            'PÃES ESPECIAIS',
            'PONTO PERFEITO',
            'LAMI · PORTO ALEGRE',
            '5.0 NO GOOGLE',
          ].map((item, index) => (
            <span key={`${item}-${index}`} className="marquee-item">
              {item} <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      <section className="story" id="historia" data-screen-label="historia">
        <div className="story-grid">
          <Reveal className="story-visual">
            <div className="story-photo">
              <img
                className="story-photo-image"
                src="/assets/well-vanessa-trailer.jpg"
                alt="Vanessa em frente ao trailer amarelo da Well Hamburgueria"
              />
              <div className="story-photo-overlay" />
            </div>
            <div className="story-photo-mini story-photo-mini-logo-card">
              <img
                className="story-photo-mini-logo-image"
                src="/logo.png"
                alt="Logo da Well Hamburgueria"
              />
              <div className="story-photo-mini-badge">sabor com rosto e história</div>
            </div>
            <div className="story-photo-tag">
              <em>Desde</em>
              {homeContent.storyPreview.foundedYear}
            </div>
          </Reveal>

          <Reveal className="story-content">
            <div className="section-label">Nossa História</div>
            <h2 className="section-title">
              CONHEÇA A
              <br />
              <span className="accent">MULHER POR TRÁS</span>
              <br />
              DA WELL
            </h2>

            <p className="story-quote">
              <span className="placeholder-block placeholder-inline">
                {homeContent.storyPreview.quote}
              </span>
            </p>

            <div className="story-body">
              <p className="placeholder-block">{homeContent.storyPreview.summary}</p>
            </div>

            <Link className="story-cta" to="/historia" onClick={() => trackStoryNavigation('home_story_cta')}>
              Conheça a história completa
              <span>→</span>
            </Link>

            <div className="story-highlights">
              <div className="story-hl">
                <div className="hl-num">{homeContent.storyPreview.foundedYear}</div>
                <div className="hl-text placeholder-mini">{homeContent.storyPreview.highlights[0]}</div>
              </div>
              <div className="story-hl">
                <div className="hl-num">AMOR</div>
                <div className="hl-text placeholder-mini">{homeContent.storyPreview.highlights[1]}</div>
              </div>
              <div className="story-hl">
                <div className="hl-num">★</div>
                <div className="hl-text placeholder-mini">{homeContent.storyPreview.highlights[2]}</div>
              </div>
            </div>

            <div className="story-signature">
              <div>
                <div className="sig-name">{homeContent.storyPreview.founderName}</div>
                <div className="sig-role">Fundadora · Well Hamburgueria</div>
              </div>
              <div className="sig-divider" />
              <div className="sig-since">
                EST. {homeContent.storyPreview.foundedYear}
                <small>Lami · POA</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="why" id="why" data-screen-label="why">
        <Reveal className="why-head">
          <div className="section-label">Por que Well</div>
          <h2 className="section-title">
            SABOR QUE <span className="accent">FAZ DIFERENÇA</span>
          </h2>
          <p>
            Cada detalhe pensado pra entregar o melhor hambúrguer da região — do pão à última
            mordida.
          </p>
        </Reveal>

        <Reveal className="why-grid reveal-stagger">
          <>
            {whyItems.map((item) => (
              <div key={item.number} className={`why-card ${item.accent}`.trim()}>
                <span className="num">{item.number}</span>
                <div className="why-icon">
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{ objectPosition: item.imagePosition }}
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </>
        </Reveal>
      </section>

      <section className="reviews" id="reviews" data-screen-label="reviews">
        <div className="reviews-head">
          <Reveal className="section-label">Avaliações Reais</Reveal>
          <Reveal as="h2" className="section-title">
            <>
              O QUE ESTÃO FALANDO
              <br />
              <span className="accent">DA WELL</span>
            </>
          </Reveal>
          <Reveal className="rating-summary">
            <>
              <span className="rating-num">5.0</span>
              <span className="rating-stars">★★★★★</span>
              <span className="rating-text">no Google</span>
            </>
          </Reveal>
        </div>

        <Reveal className="reviews-grid reveal-stagger">
          <>
            {homeReviews.map((review) => (
              <div key={review.author} className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-quote">{review.quote}</p>
                <div className="review-author">
                  <div className="review-avatar">{review.initials}</div>
                  <div>
                    <div className="review-author-name">{review.author}</div>
                    <div className="review-author-meta">Avaliação Google</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        </Reveal>
      </section>

      <section className="gallery" id="gallery" data-screen-label="gallery">
        <div className="gallery-head">
          <Reveal>
            <div className="section-label">Galeria</div>
            <h2 className="section-title">
              FEITO PRA <span className="accent">POSTAR</span>
            </h2>
            <p>Burgers, batatas e momentos que valem cada clique.</p>
          </Reveal>
          <Reveal as="a" className="ig-handle" href={contact.instagram} target="_blank" rel="noopener" onClick={() => trackInstagramClick('gallery_handle')}>
            <>
              @wellhamburgueria
              <span>↗</span>
            </>
          </Reveal>
        </div>

        <Reveal className="gallery-grid">
          <>
            <div className="gallery-tile featured">
              <div className="gallery-tile-bg ph-burger" />
              <div className="gallery-tile-icon">📷</div>
              <div className="gallery-tile-label">Pão rosa especial</div>
            </div>
            <div className="gallery-tile">
              <img className="gallery-tile-img" src="/assets/gallery-burger-australiano.webp" alt="Hambúrguer artesanal Well com pão australiano e queijo derretido" loading="lazy" />
              <div className="gallery-tile-icon">📷</div>
              <div className="gallery-tile-label">Pão australiano</div>
            </div>
            <div className="gallery-tile tall">
              <img className="gallery-tile-img" src="/assets/gallery-smash-triplo.webp" alt="Smash burger triplo da Well Hamburgueria com carne suculenta" loading="lazy" />
              <div className="gallery-tile-icon">📷</div>
              <div className="gallery-tile-label">Smash triplo</div>
            </div>
            <div className="gallery-tile">
              <img className="gallery-tile-img" src="/assets/gallery-costela-fritas.webp" alt="Hambúrguer de costela da Well servido com batatas fritas crocantes" loading="lazy" />
              <div className="gallery-tile-icon">📷</div>
              <div className="gallery-tile-label">Costela com fritas</div>
            </div>
            <div className="gallery-tile">
              <div className="gallery-tile-bg ph-red" />
              <div className="ph-text">[ ambiente da loja ]</div>
              <div className="gallery-tile-icon">📷</div>
              <div className="gallery-tile-label">Nossa casa</div>
            </div>
          </>
        </Reveal>
      </section>

      <div className="location" id="local" data-screen-label="local">
        <div className="location-content">
          <Reveal>
            <div className="section-label">Onde Estamos</div>
            <h2 className="section-title">
              VENHA <span className="accent">NOS VER</span>
            </h2>
          </Reveal>
          <Reveal className="info-list">
            <>
              {storeUnits.map((unit) => (
                <div
                  key={unit.id}
                  className={`unit-row${selectedUnit.id === unit.id ? ' active' : ''}`}
                  onClick={() => setSelectedUnitId(unit.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedUnitId(unit.id);
                    }
                  }}
                >
                  <div className="unit-row-head">
                    <div>
                      <div className="lbl">{unit.name}</div>
                      <div className="val">{unit.neighborhood}</div>
                    </div>
                    <a
                      href={unit.orderUrl}
                      target="_blank"
                      rel="noopener"
                      className="unit-order-link"
                      onClick={(event) => event.stopPropagation()}
                      onMouseDown={() => trackMenuIntent(`unit_card_${unit.id}`)}
                    >
                      Ver cardápio
                    </a>
                  </div>
                  <div className="info-row">
                    <div className="ic">📍</div>
                    <div>
                      <div className="lbl">Endereço</div>
                      <div className="val">{unit.address}</div>
                    </div>
                  </div>
                  <div className="unit-actions">
                    <a
                      className="location-cta unit-cta"
                      href={unit.mapsUrl}
                      target="_blank"
                      rel="noopener"
                      onClick={(event) => {
                        event.stopPropagation();
                        trackMapsClick(unit.id);
                      }}
                    >
                      Traçar rota
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </>
          </Reveal>
        </div>
        <div className="location-map">
          <iframe
            src={selectedUnit.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title={`Mapa ${selectedUnit.name}`}
          />
          <div className="map-pin-overlay">
            <span className="ic">📍</span>
            <div className="t">
              {selectedUnit.name}
              <small>
                {selectedUnit.neighborhood}, {selectedUnit.city}
              </small>
            </div>
          </div>
        </div>
      </div>

      <section className="cta" id="contato" data-screen-label="cta">
        <div className="cta-bg-img" />
        <div className="cta-bg-overlay" />
        <div className="cta-bg-text">WELL</div>
        <div className="cta-content">
          <Reveal className="section-label">Bora?</Reveal>
          <Reveal as="h2" className="cta-title">
            <>
              PRONTO PARA EXPERIMENTAR
              <br />O <span className="accent">MELHOR HAMBÚRGUER</span> DO LAMI?
            </>
          </Reveal>
          <Reveal as="p" className="cta-text">
            Escolha sua unidade, veja o cardápio e faça seu pedido. A gente garante que vai sair querendo voltar.
          </Reveal>
          <Reveal className="cta-buttons">
            <>
              <button className="btn-primary btn-whatsapp" type="button" onClick={() => openWhatsAppModal('cta_section')}>
                <WhatsAppIcon />
                Chamar no WhatsApp
              </button>
              <button className="btn-outline" type="button" onClick={() => openOrderModal('cta_section')}>
                Ver Cardápio
                <span>↗</span>
              </button>
            </>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img className="brand-logo-image footer-brand-logo" src="/logo.png" alt="Well Hamburgueria" />
            </div>
            <p className="footer-tagline">
              Hamburgueria artesanal no coração do Lami. Feito com carinho, servido com orgulho.
            </p>
            <div className="footer-social">
              <a href={contact.instagram} target="_blank" rel="noopener" className="social-btn ig" aria-label="Instagram" onClick={() => trackInstagramClick('footer_social')}>
                📸
              </a>
              <a href={contact.phoneHref} className="social-btn" aria-label="Telefone">
                📞
              </a>
              <button
                type="button"
                onClick={() => openWhatsAppModal('footer_social')}
                className="social-btn wa"
                aria-label="WhatsApp"
              >
                💬
              </button>
            </div>
          </div>
          <div className="footer-security">
            <div className="footer-col-title">Segurança</div>
            <a
              href="https://sentinel.ascendtechglobal.com"
              target="_blank"
              rel="noopener"
              className="footer-security-link"
            >
              <img
                className="footer-security-badge"
                src="/assets/ascend-sentinel-badge.png"
                alt="Selo de segurança Protected by Ascend Sentinel"
              />
            </a>
          </div>
          <div>
            <div className="footer-col-title">Navegação</div>
            <ul className="footer-links">
              <li>
                <a href="#why">Por que Well</a>
              </li>
              <li>
                <a href="#reviews">Avaliações</a>
              </li>
              <li>
                <a href="#gallery">Galeria</a>
              </li>
              <li>
                <a href="#local">Localização</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Horário</div>
            <ul className="footer-links">
              <li>
                <span>Segunda a Segunda · 19h às 23h</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contato</div>
            <ul className="footer-links">
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <button type="button" className="footer-order-button" onClick={() => openOrderModal('footer_contact')}>
                  Ver cardápio
                </button>
              </li>
              <li>
                <span>3 unidades em Porto Alegre e Viamão</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Well Hamburgueria © 2026 · Todos os direitos reservados</p>
          <p>Lami, Porto Alegre — RS</p>
          <a
            className="footer-credit"
            href="https://ascendtechglobal.com"
            target="_blank"
            rel="noopener"
          >
            Criado por Ascend Tech
          </a>
        </div>
      </footer>

      <button
        className="wa-float wa-float-button"
        type="button"
        aria-label="Abrir WhatsApp"
        onClick={() => openWhatsAppModal('floating_button')}
      >
        <WhatsAppIcon />
      </button>
      <OrderModal open={orderModalOpen} onClose={() => setOrderModalOpen(false)} source="home_modal" />
      <WhatsAppModal open={waModalOpen} onClose={() => setWaModalOpen(false)} source="home_modal" />
    </>
  );
}

type HomeNavbarProps = {
  onOpenOrderModal: () => void;
};

function HomeNavbar({ onOpenOrderModal }: HomeNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="topnav" className={`topnav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-logo">
        <img className="brand-logo-image nav-brand-logo" src="/logo.png" alt="Well Hamburgueria" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="#historia">História</a>
        </li>
        <li>
          <a href="#why">Por que Well</a>
        </li>
        <li>
          <a href="#reviews">Avaliações</a>
        </li>
        <li>
          <a href="#local">Localização</a>
        </li>
      </ul>
      <button type="button" className="nav-cta nav-cta-link" onClick={onOpenOrderModal}>
        Ver Cardápio
      </button>
    </nav>
  );
}
