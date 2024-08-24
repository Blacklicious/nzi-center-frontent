// data/networks.ts
export const networks = [
  {
    name: 'Réseaux Google',
    backgroundImage: '/images/nzi_bg_google.jpg',
    channels: [
      { name: 'Application Mobile Android', logo: '/images/logo_android.png', serviceKey: 'android' },
      { name: 'Internet', logo: '/images/logo_web.png', serviceKey: 'internet' },
      { name: 'YouTube', logo: '/images/logo_youtube.png', serviceKey: 'youtube' },
    ],
  },
  {
    name: 'Réseaux Meta',
    backgroundImage: '/images/nzi_bg_meta.jpg',
    channels: [
      { name: 'Facebook', logo: '/images/logo_facebook.png', serviceKey: 'facebook' },
      { name: 'Instagram', logo: '/images/logo_instagram.png', serviceKey: 'instagram' },
      { name: 'WhatsApp', logo: '/images/logo_whatsapp.png', serviceKey: 'whatsapp' },
    ],
  },
  {
    name: 'Autres Réseaux',
    backgroundImage: '/images/nzi_bg_socialmedia.jpg',
    channels: [
      { name: 'LinkedIn', logo: '/images/logo_linkedin.png', serviceKey: 'linkedin' },
      { name: 'TikTok', logo: '/images/logo_tiktok.png', serviceKey: 'tiktok', disabled: true },
      { name: 'Snapchat', logo: '/images/logo_snapchat.png', serviceKey: 'snapchat' },
    ],
  },
];