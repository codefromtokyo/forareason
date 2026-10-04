export const mapsDir = (origin: string, dest: string, mode = "transit") =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin || "")}&destination=${encodeURIComponent(dest || "")}&travelmode=${mode}`;
