const LOCALE_STORAGE_KEY = 'color-scheme';

const refs = {
	switcherRadios: document.querySelectorAll('.switcher__radio'),
	switcher: document.querySelector('.switcher'),
	light: document.querySelector('[media="(prefers-color-scheme: light)"]'),
	dark: document.querySelector('[media="(prefers-color-scheme: dark)"]'),
};

refs.switcher.addEventListener('change', handleSwitcherChange);

activateSavedScheme();

function handleSwitcherChange(e) {
	const chosedScheme = e.target.value;

	changeScheme(chosedScheme);

	if (chosedScheme === 'auto') {
		removeSavedScheme();
		return;
	}

	saveScheme(chosedScheme);
}

function activateSavedScheme() {
	const savedScheme = getSavedScheme();

	if (!savedScheme) return;

	changeScheme(savedScheme);

	setSwitcher(savedScheme);
}

function changeScheme(colorScheme) {
	if (colorScheme === 'auto') {
		refs.light.media = '(prefers-color-scheme: light)';
		refs.dark.media = '(prefers-color-scheme: dark)';
		return;
	}

	refs.light.media = colorScheme === 'light' ? 'all' : 'not all';
	refs.dark.media = colorScheme === 'dark' ? 'all' : 'not all';
}

function setSwitcher(colorScheme) {
	[...refs.switcherRadios].find(
		item => item.value === colorScheme
	).checked = true;
}

function saveScheme(colorScheme) {
	localStorage.setItem(LOCALE_STORAGE_KEY, colorScheme);
}

function getSavedScheme() {
	return localStorage.getItem(LOCALE_STORAGE_KEY);
}

function removeSavedScheme() {
	localStorage.removeItem(LOCALE_STORAGE_KEY);
}
