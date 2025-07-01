export function getPlatformIcon(platformName) {
  switch (platformName) {
    case "PC":
      return `<img src="/assets/microsoft.png" title="PC" alt="PC">`;
    case "PlayStation":
      return `<img src="/assets/playstation.png" title="PlayStation" alt="PlayStation">`;
    case "Xbox":
      return `<img src="/assets/xbox.png" title="Xbox" alt="Xbox">`;
    case "iOS":
      return `<img src="/assets/apple.png" title="Apple" alt="Apple">`;
    case "Android":
      return `<img src="/assets/android.png" title="Android" alt="Android">`;
    case "Apple Macintosh":
      return `<img src="/assets/mac.png" title="Mac" alt="Mac">`;
    case "Linux":
      return `<img src="/assets/linux.png" title="Linux" alt="Linux">`;
    case "Nintendo":
      return `<img src="/assets/nintendo.png" title="Nintendo" alt="Nintendo">`;
    case "Web":
      return `<img src="/assets/web.png" title="Nintendo" alt="Nintendo">`;
    case "SEGA":
      return `<img src="/assets/sega.png" title="SEGA" alt="SEGA">`;
    case "Commodore / Amiga":
      return `<img src="/assets/commodore.png" title="Commodore / Amiga" alt="Commodore / Amiga">`;
    case "Neo Geo":
      return `<img src="/assets/neogeo.png" title="Neo Geo" alt="Neo Geo">`;
    case "Atari":
      return `<img src="/assets/atari.png" title="Atari" alt="Atari">`;
    default:
      return `<span>${platformName}</span>`;
  }
}
