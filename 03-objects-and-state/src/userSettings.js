const settings = {
  theme: 'light', // 'light' | 'dark'
  language: 'en', // e.g. 'en', 'bg'
  notifications: true, // boolean
};

function createDefaultSettings() {
  const userSettings = JSON.parse(JSON.stringify(settings));
  return userSettings;
}

function updateTheme(settings, theme) {
  settings.theme = theme;
}

function toggleNotifications(settings) {
  settings.notifications = !settings.notifications;
}

function setLanguage(settings, language) {
  settings.language = language;
}

function cloneSettings(settings) {
  const clonedSettings = Object.assign({}, settings);
  return clonedSettings;
}

export {
  createDefaultSettings,
  updateTheme,
  toggleNotifications,
  setLanguage,
  cloneSettings,
};
