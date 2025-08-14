// src/features/map/HeatMap.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import IncidentModal from "@/features/incidents/IncidentModal";

// Fix iconos Leaflet (Vite)
import marker2x     from "leaflet/dist/images/marker-icon-2x.png";
import marker1x     from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let L;
async function ensureLeaflet() {
  if (!L) {
    const leafletMod = await import("leaflet");
    const Lm = leafletMod.default || leafletMod;

    // Importantes para markercluster en Vite
    if (!globalThis.L) globalThis.L = Lm;
    await import("leaflet.markercluster");
    await import("leaflet.heat");

    L = Lm;
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: marker2x,
      iconUrl:       marker1x,
      shadowUrl:     markerShadow,
    });
  }
}

const DEFAULT_CENTER = [-8.5, 115.15]; // Bali
const COLORS = {
  accident: "#bf0603",
  traffic:  "#ffba08",
  crime:    "#000000",
  disaster: "#2c1753",
  weather:  "#4cc9f0",
};
const toHeat = (it) => [it.latitude, it.longitude, 1];

export default function HeatMap({
  incidents = [],
  center = DEFAULT_CENTER,
  zoom = 11,
  interactive = true,
  windowHours = 24, // ← parametrizable
}) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const layersRef    = useRef({ heat: {}, cluster: null });

  const [ready, setReady]       = useState(false);
  const [selected, setSelected] = useState(null);

  // Solo últimos N horas por tipo
  const recentByType = useMemo(() => {
    const limit = Date.now() - windowHours * 60 * 60 * 1000;
    const valid = incidents.filter(
      (i) =>
        i?.latitude &&
        i?.longitude &&
        Number(new Date(i.timestamp)) > limit
    );
    return {
      accident: valid.filter((i) => i.type === "accident"),
      traffic:  valid.filter((i) => i.type === "traffic"),
      crime:    valid.filter((i) => i.type === "crime"),
      disaster: valid.filter((i) => i.type === "disaster"),
      weather:  valid.filter((i) => i.type === "weather"),
    };
  }, [incidents, windowHours]);

  // Cierra modal si el seleccionado ya no está en la ventana reciente
  useEffect(() => {
    if (!selected) return;
    const stillThere = Object.values(recentByType).some((list) =>
      list.some((i) => i.id === selected.id)
    );
    if (!stillThere) setSelected(null);
  }, [recentByType, selected]);

  // Init mapa
  useEffect(() => {
    let mounted = true;
    (async () => {
      await ensureLeaflet();
      if (!mounted || mapRef.current || !containerRef.current) return;

      mapRef.current = L.map(containerRef.current).setView(center, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      setReady(true);
    })();
    return () => {
      mounted = false;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [center, zoom]);

  // FlyTo en cambios de center/zoom
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    mapRef.current.flyTo(center, zoom, { animate: true, duration: 1.0 });
  }, [center, zoom, ready]);

  // Construir/refresh heat + clusters
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const m = mapRef.current;

    // Limpia capas previas
    Object.values(layersRef.current.heat).forEach((l) => m.removeLayer(l));
    layersRef.current.heat = {};
    if (layersRef.current.cluster) m.removeLayer(layersRef.current.cluster);

    // Cluster visible sin CSS extra
    const iconCreateFunction = (cluster) => {
      const count = cluster.getChildCount();
      const size  = count < 10 ? 40 : count < 50 ? 48 : 58;
      const html  = `
        <div style="
          width:${size}px;height:${size}px;border-radius:9999px;
          background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;
          font-weight:800;font-size:${Math.max(12, Math.min(18, size/3))}px;
          border:3px solid #fff; box-shadow:0 6px 14px rgba(0,0,0,.25);
        ">${count}</div>`;
      return L.divIcon({ html, className: "ce-cluster", iconSize: [size, size] });
    };

    layersRef.current.cluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      iconCreateFunction,
    });

    // Heat + markers por tipo
    Object.entries(recentByType).forEach(([type, list]) => {
      if (!list.length) return;

      layersRef.current.heat[type] = L.heatLayer(list.map(toHeat), {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: { 0.2: COLORS[type], 0.8: COLORS[type] },
        opacity: 0.8,
      }).addTo(m);

      list.forEach((i) =>
        L.marker([i.latitude, i.longitude])
          .on("click", () => setSelected(i))
          .addTo(layersRef.current.cluster)
      );
    });

    m.addLayer(layersRef.current.cluster);
  }, [recentByType, ready]);

  // Interacción on/off
  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    const el = containerRef.current;
    const set = (enable) => {
      m.dragging[enable ? "enable" : "disable"]();
      m.scrollWheelZoom[enable ? "enable" : "disable"]();
      m.doubleClickZoom[enable ? "enable" : "disable"]();
      m.touchZoom[enable ? "enable" : "disable"]();
      m.boxZoom[enable ? "enable" : "disable"]();
      m.keyboard[enable ? "enable" : "disable"]();
      el?.classList[enable ? "remove" : "add"]("pointer-events-none");
    };
    set(!!interactive);
  }, [interactive]);

  return (
    <div className="relative w-full">
      {/* Contenedor del mapa — breakpoints replicados del legacy CSS */}
      <div
        id="heatmap-container"
        ref={containerRef}
        className={[
          "relative w-full h-[400px] m-0 p-0 z-[1] overflow-hidden rounded-[16px] border bg-white",
          "max-[1024px]:h-[450px]",
          "max-[768px]:h-[380px]",
          "max-[600px]:h-[340px]",
          "max-[480px]:h-[400px]",
          "max-[375px]:h-[260px]",
          "max-[320px]:h-[240px]",
          "[&_.leaflet-container]:w-full [&_.leaflet-container]:h-full",
        ].join(" ")}
      />
      {selected && (
        <IncidentModal
          incident={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
