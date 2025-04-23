import {PortableTextBlock} from '@portabletext/types'

export type IconProps = React.HTMLAttributes<HTMLDivElement>;

export type FooterData = {
    socialLinks: {_key:string, platform: string; url: string }[]
    logo: string
    programmingTitle: string
    programmingText: string
    helpTitle: string
    helpPhone: string
    locationTitle: string
    location: string
    address: {
      street: string
      number: string
      district: string
      city: string
      state: string
      zip: string
    }
    mapEmbedUrl: string
  }

  export type HomePage = {
    _id: string
    _type: 'homePage'
    heroHeadline: PortableTextBlock
    heroDescription: string
    heroButtonTitle: string
    heroButtonLink: string
    heroImage: string
    dividerText: PortableTextBlock
    titleLive: string
    descriptionLive: PortableTextBlock
    youtubeUrl: string
    buttonLiveText: string
    butonLiveLink: string
    liveBannerImage: string
    
  }
  
  export type ContactPage = {
    _id: string
    _type: 'contactPage'
    title?: string
    bannerImage:string
    description: string
    address: {
      street: string
      number: string
      district: string
      city: string
      state: string
      zip: string
    }
    DefaultSocial: string
    DefaultSocialLink: string
    email: string
    phone: string,
    whatsApp:string
    AvailableHours:string
  }
  