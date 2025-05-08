
export const footerQuery = `*[_type == "footer"][0]{
    socialLinks[],
    "logo":logo.asset->url,
    programmingTitle,
    programmingText,
    helpTitle,
    helpPhone,
    locationTitle,
    address-> {
      street,
      number,
      district,
      city,
      state,
      zip
    },
    mapEmbedUrl,
  }`

  export const homePageQuery = `
  *[_type == "homePage"][0]{
    heroHeadline,
    heroDescription,
    heroButtonTitle,
    heroButtonLink,
    "heroImage": heroImage.asset->url,
    dividerText,
    titleLive,
    descriptionLive,
    youtubeUrl,
    buttonLiveText,
    butonLiveLink,
    "liveBannerImage": liveBannerImage.asset->url
  }
`;


export const contactPageQuery = `
  *[_type == "contactPage"][0]{
    _id,
    title,
    "bannerImage": bannerImage.asset->url,
    description,
    address-> {
      street,
      number,
      district,
      city,
      state,
      zip
    },
    "phone": phone->number,
    "email": email->email,
    "DefaultSocial": DefaultSocial->socialUserName,
    "DefaultSocialLink": DefaultSocial->url,
    "whatsApp": WhatsPhone->number,

    AvailableHours
  }`;