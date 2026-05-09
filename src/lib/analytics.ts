const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID?.trim() ?? '';

const conversionLabels = {
  whatsapp: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_WHATSAPP?.trim() ?? '',
  menu: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_MENU?.trim() ?? '',
  instagram: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_INSTAGRAM?.trim() ?? '',
  maps: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_MAPS?.trim() ?? '',
} as const;

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly VITE_GOOGLE_ADS_ID?: string;
    readonly VITE_GOOGLE_ADS_CONVERSION_WHATSAPP?: string;
    readonly VITE_GOOGLE_ADS_CONVERSION_MENU?: string;
    readonly VITE_GOOGLE_ADS_CONVERSION_INSTAGRAM?: string;
    readonly VITE_GOOGLE_ADS_CONVERSION_MAPS?: string;
  }
}

let initialized = false;

function hasAnalytics() {
  return GOOGLE_ADS_ID.length > 0;
}

function sendEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!hasAnalytics() || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}

function sendConversion(label: string, params: AnalyticsParams = {}) {
  if (!label) {
    return;
  }

  sendEvent('conversion', {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...params,
  });
}

export function initAnalytics() {
  if (initialized || !hasAnalytics() || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_ID);

  initialized = true;
}

export function trackPageView(path: string) {
  sendEvent('page_view', {
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
    send_to: GOOGLE_ADS_ID || undefined,
  });
}

export function trackWhatsAppIntent(source: string) {
  sendEvent('generate_lead', {
    method: 'WhatsApp',
    source,
  });
}

export function trackWhatsAppClick(source: string, unitId: string) {
  const params = {
    method: 'WhatsApp',
    source,
    unit_id: unitId,
  };

  sendEvent('contact', params);
  sendConversion(conversionLabels.whatsapp, params);
}

export function trackMenuIntent(source: string) {
  sendEvent('view_item_list', {
    item_list_name: 'cardapio',
    source,
  });
}

export function trackMenuClick(source: string, unitId: string) {
  const params = {
    source,
    unit_id: unitId,
    destination: 'cardapio',
  };

  sendEvent('view_item', params);
  sendConversion(conversionLabels.menu, params);
}

export function trackInstagramClick(source: string) {
  const params = {
    source,
    destination: 'instagram',
  };

  sendEvent('click', params);
  sendConversion(conversionLabels.instagram, params);
}

export function trackMapsClick(unitId: string) {
  const params = {
    unit_id: unitId,
    destination: 'maps',
  };

  sendEvent('find_location', params);
  sendConversion(conversionLabels.maps, params);
}

export function trackStoryNavigation(source: string) {
  sendEvent('view_item', {
    item_name: 'historia',
    source,
  });
}
