"use client";

import { useEffect } from "react";

export default function HotelLook() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://tpwgt.com/content?currency=usd&trs=414250&shmarker=629078&show_hotels=false&powered_by=true&locale=en&searchUrl=search.hotellook.com&primary_override=%23FF8E01&color_button=%23FF8E01&color_icons=%23FF8E01&secondary=%23FFFFFF&dark=%23262626&light=%23FFFFFF&special=%23C4C4C4&color_focused=%23FF8E01&border_radius=5&plain=false&promo_id=7873&campaign_id=101";
    script.charset = "utf-8";

    const container = document.getElementById("hotel-look-widget");

    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, []);

  return (
    <div id="hotel-look-widget" className="w-full mt-6 mb-6"></div>
  );
}
