import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faTrash, faArrowLeft, faEdit, faPlus, faArrowRight, faCheckCircle, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faInstagram, faSquareXTwitter, faTiktok, faSnapchat} from '@fortawesome/free-brands-svg-icons';

library.add(faArrowRight, faArrowLeft, faChartPie, faCog, faCheckCircle, faFacebook, faYoutube, faInstagram, faSquareXTwitter, faTiktok, faSnapchat, faGlobe, faPlus, faEdit, faTrash);

dom.watch();
