import LinksOriginal from 'clippyjs/agents/links'

const BASE = '/assets/clippy/'

export const Pochita = {
  ...LinksOriginal,
  map: () => Promise.resolve({ default: `${BASE}Links.png` }),
  sound: () =>
    Promise.resolve({
      default: Object.fromEntries(
        Array.from({ length: 21 }, (_, i) => [
          String(i + 1),
          `${BASE}sounds/rover-${i + 1}.mp3`,
        ])
      ),
    }),
}
