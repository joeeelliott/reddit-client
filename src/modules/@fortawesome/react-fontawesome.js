import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSearch, faEye } from '@fortawesome/free-solid-svg-icons';

export default function registerIcons() {
	library.add(
    fab, 
    fas,
    far,
		faBars,
    faSearch,
    faEye,
	);
}