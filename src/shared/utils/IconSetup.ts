import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faUser, faGlobe, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faInstagram, faSquareXTwitter, faTiktok, faSnapchat} from '@fortawesome/free-brands-svg-icons';

library.add(faUser, faFacebook, faYoutube, faInstagram, faSquareXTwitter, faTiktok, faSnapchat, faGlobe, faPlus, faEdit, faTrash);

dom.watch();
