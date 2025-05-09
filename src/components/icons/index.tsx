import  Facebook  from "./facebook";
import Instagram from "./instagram";
import YouTube from "./youtube";
import Default  from "./default";



export {Facebook,Instagram,YouTube,Default}


export function getSocialIconByName(name: string) {

    if (name === "instagram") return <Instagram className="text-white w-7 h-7" />
    if (name === "youtube") return <YouTube className="text-white w-7 h-7" />
    if (name === "facebook") return <Facebook className="text-white w-7 h-7" />

    return <Default className="text-white w-7 h-7" />

  }