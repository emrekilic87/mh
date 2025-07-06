"use client";

import { useEffect } from "react";


interface WidgetProps {
  id: string;
  scriptSrc: string;
}

export default function Widget({ id, scriptSrc }: WidgetProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    script.charset = "utf-8";

    const container = document.getElementById(id);

    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [id, scriptSrc]);

  return (
    <div id={id} className="w-full mt-6 mb-6"></div>
  );
}
