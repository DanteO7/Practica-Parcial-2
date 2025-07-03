// devuelve el html de una imagen dependiendo de la plataforma que recibe

const PLATFOTMS = Object.freeze({
  PC: "PC",
  PLAYSTATION: "PlayStation",
  XBOX: "Xbox",
  IOS: "iOS",
  ANDROID: "Android",
  MAC: "Apple Macintosh",
  LINUX: "Linux",
  NINTENDO: "Nintendo",
  WEB: "Web",
  SEGA: "SEGA",
  COMMODORE: "Commodore / Amiga",
  NEOGEO: "Neo Geo",
  ATARI: "Atari",
});

export function getPlatformIcon(platformName) {
  switch (platformName) {
    case PLATFOTMS.PC:
      return `<img src="/assets/microsoft.png" title="PC" alt=${PLATFOTMS.PC}>`;
    case PLATFOTMS.PLAYSTATION:
      return `<img src="/assets/playstation.png" title="PlayStation" alt=${PLATFOTMS.PLAYSTATION}>`;
    case PLATFOTMS.XBOX:
      return `<img src="/assets/xbox.png" title="Xbox" alt=${PLATFOTMS.XBOX}>`;
    case PLATFOTMS.IOS:
      return `<img src="/assets/apple.png" title="Apple" alt=${PLATFOTMS.IOS}>`;
    case PLATFOTMS.ANDROID:
      return `<img src="/assets/android.png" title="Android" alt=${PLATFOTMS.ANDROID}>`;
    case PLATFOTMS.MAC:
      return `<img src="/assets/mac.png" title="Mac" alt=${PLATFOTMS.MAC}>`;
    case PLATFOTMS.LINUX:
      return `<img src="/assets/linux.png" title="Linux" alt=${PLATFOTMS.LINUX}">`;
    case PLATFOTMS.NINTENDO:
      return `<img src="/assets/nintendo.png" title="Nintendo" alt=${PLATFOTMS.NINTENDO}>`;
    case PLATFOTMS.WEB:
      return `<img src="/assets/web.png" title="Web" alt=${PLATFOTMS.WEB}>`;
    case PLATFOTMS.SEGA:
      return `<img src="/assets/sega.png" title="SEGA" alt=${PLATFOTMS.SEGA}>`;
    case PLATFOTMS.COMMODORE:
      return `<img src="/assets/commodore.png" title="Commodore / Amiga" alt=${PLATFOTMS.COMMODORE}>`;
    case PLATFOTMS.NEOGEO:
      return `<img src="/assets/neogeo.png" title="Neo Geo" alt=${PLATFOTMS.NEOGEO}>`;
    case PLATFOTMS.ATARI:
      return `<img src="/assets/atari.png" title="Atari" alt=${PLATFOTMS.ATARI}>`;
    default:
      return `<span>${platformName}</span>`;
  }
}
