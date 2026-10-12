// Travelpayouts hesap bilgileri (Kiwi widget'larındaki shmarker / trs ile aynı).
const TP_MARKER = "629078";
const TP_TRS = "414250";

// Klook programının Travelpayouts kimlikleri.
// Travelpayouts panelinde Klook → "Links" aracıyla üretilen bir linkteki p ve campaign_id ile aynı olmalı.
const KLOOK_PROGRAM_ID = "4110";
const KLOOK_CAMPAIGN_ID = "137";

// Hedef URL'yi Travelpayouts yönlendirmesiyle sarar. subId, panelde hangi yazının kazandırdığını gösterir.
function travelpayoutsLink(url: string, programId: string, campaignId: string, subId?: string): string {
  const params = new URLSearchParams({
    marker: subId ? `${TP_MARKER}.${subId}` : TP_MARKER,
    trs: TP_TRS,
    p: programId,
    u: url,
    campaign_id: campaignId,
  });
  return `https://tp.media/r?${params.toString()}`;
}

export function klookSearchLink(query: string, subId?: string): string {
  const url = `https://www.klook.com/en-US/search/result/?query=${encodeURIComponent(query)}`;
  return travelpayoutsLink(url, KLOOK_PROGRAM_ID, KLOOK_CAMPAIGN_ID, subId);
}

// Affiliate linkleri için Google'ın istediği rel değeri.
export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";
