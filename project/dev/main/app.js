import './system/_scripts/WebpAvifSupport.js';
import footer from '../pages/common/footer/_footer.js';
import global from '../pages/common/global/_global.js';

window.addEventListener('load', funcsTogether);

function funcsTogether () {
	global();
	footer();
}