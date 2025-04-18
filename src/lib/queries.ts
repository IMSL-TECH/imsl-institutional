
export const footerQuery = `*[_type == "footer"][0]{
    socialLinks[],
    "logo":logo.asset->url,
    programmingTitle,
    programmingText,
    helpTitle,
    helpPhone,
    locationTitle,
    location,
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
