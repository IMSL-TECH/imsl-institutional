import {PortableTextBlock} from '@portabletext/types'

export type IconProps = React.HTMLAttributes<HTMLDivElement>;

export type FooterData = {
    socialLinks: { platform: string; url: string }[]
    logo: string
    programmingTitle: string
    programmingText: string
    helpTitle: string
    helpPhone: string
    locationTitle: string
    location: string
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
  
  