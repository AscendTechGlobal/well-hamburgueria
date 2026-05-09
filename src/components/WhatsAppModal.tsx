import { useEffect } from 'react';
import { storeUnits } from '../data/site';
import { trackWhatsAppClick } from '../lib/analytics';
import { WhatsAppIcon } from './WhatsAppIcon';

type WhatsAppModalProps = {
  open: boolean;
  onClose: () => void;
  source?: string;
};

export function WhatsAppModal({ open, onClose, source = 'unknown' }: WhatsAppModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="order-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="order-modal wa-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="order-modal-close" type="button" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="order-modal-eyebrow wa-modal-eyebrow">Fale conosco</div>
        <h3 id="wa-modal-title" className="order-modal-title">
          QUAL UNIDADE VOCÊ QUER <span className="wa-gradient">CHAMAR?</span>
        </h3>
        <p className="order-modal-text">
          Selecione a unidade mais próxima para abrir uma conversa direta no WhatsApp.
        </p>

        <div className="order-modal-grid">
          {storeUnits.map((unit) => (
            <a
              key={unit.id}
              className="order-unit-card wa-unit-card"
              href={unit.whatsapp}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppClick(source, unit.id)}
            >
              <div className="order-unit-top">
                <span className="order-unit-badge wa-unit-badge">{unit.neighborhood}</span>
                <span className="wa-unit-icon">
                  <WhatsAppIcon />
                </span>
              </div>
              <h4>{unit.name}</h4>
              <p>{unit.phone}</p>
              <span className="order-unit-cta wa-unit-cta">
                <WhatsAppIcon />
                Chamar no WhatsApp
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
