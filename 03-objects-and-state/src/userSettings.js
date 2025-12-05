const settings = {
  theme: 'light', // 'light' | 'dark'
  language: 'en', // e.g. 'en', 'bg'
  notifications: true, // boolean
};

// Rules
// Do NOT mutate the original settings object.
// Validate input as needed (basic check: object + existing keys).

function createDefaultSettings() {
  /* ... */
}
// returns default settings object (light, en, true)

function updateTheme(settings, theme) {
  /* ... */
}
// returns NEW settings object with updated theme

function toggleNotifications(settings) {
  /* ... */
}
// returns NEW settings object with notifications flipped

function setLanguage(settings, language) {
  /* ... */
}
// returns NEW settings object with new language

function cloneSettings(settings) {
  /* ... */
}
// returns a shallow copy of settings
