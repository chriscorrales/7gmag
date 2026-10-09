// Helpers compartilhados entre as páginas e o layout.

import content from '../data/content.json';

// Monta caminhos absolutos a partir do BASE_URL em vez de hardcodar o prefixo —
// assim o site funciona igual com base '/' (domínio próprio) ou num subpath.
export const comBase = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;

// WhatsApp vem do CMS (/admin → "Contato"), só dígitos com DDI+DDD: 5583993727554.
// O replace é cinto de segurança caso alguém digite com espaço/traço/parênteses.
const whatsapp = content.contato.whatsapp.replace(/\D/g, '');

export const WA = `https://wa.me/${whatsapp}`;

// Formato do schema.org/JSON-LD: +55-83-99372-7554
export const telefoneLd = whatsapp.replace(/^(\d{2})(\d{2})(\d+)(\d{4})$/, '+$1-$2-$3-$4');

// Instagram da marca — só o usuário, sem @ (ex.: 'calcadosmagneticos').
// null = some do rodapé e do JSON-LD. Removido temporariamente: a conta antiga
// (@oficial7gmag) era da 7G Mag; a nova ainda vai ser passada pela empresa.
export const INSTAGRAM: string | null = null;
