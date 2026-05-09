import { useEffect } from 'react';
import { storeUnits } from '../data/site';
import { trackMenuClick } from '../lib/analytics';

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  source?: string;
};

export function OrderModal({ open, onClose, source = 'unknown' }: OrderModalProps) {
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
        className="order-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="order-modal-close" type="button" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="order-modal-eyebrow">Escolha a unidade</div>
        <h3 id="order-modal-title" className="order-modal-title">
          ONDE VOCÊ QUER <span>VER O CARDÁPIO?</span>
        </h3>
        <p className="order-modal-text">
          Selecione a unidade mais próxima para abrir o cardápio e continuar com seu pedido.
        </p>

        <div className="order-modal-grid">
          {storeUnits.map((unit) => (
            <a
              key={unit.id}
              className="order-unit-card"
              href={unit.orderUrl}
              target="_blank"
              rel="noopener"
              onClick={() => trackMenuClick(source, unit.id)}
            >
              <div className="order-unit-top">
                <span className="order-unit-badge">{unit.neighborhood}</span>
                <span className="order-unit-arrow">↗</span>
              </div>
              <h4>{unit.name}</h4>
              <p>{unit.address}</p>
              <span className="order-unit-cta">Ver cardápio</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
