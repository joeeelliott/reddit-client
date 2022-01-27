import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
	faBars,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

export default function registerIcons() {
	library.add(
    fab, 
    fas,
		faBars,
    faSearch,
	);
}