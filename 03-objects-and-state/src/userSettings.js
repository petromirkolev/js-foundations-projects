const settings = {
  theme: 'light', // 'light' | 'dark'
  language: 'en', // e.g. 'en', 'bg'
  notifications: true, // boolean
};

function createDefaultSettings() {
  return { ...settings };
}

function updateTheme(settings, theme) {
  return { ...settings, theme };
}

function toggleNotifications(settings) {
  return { ...settings, notifications: !settings.notifications };
}

function setLanguage(settings, language) {
  return { ...settings, language };
}

function cloneSettings(settings) {
  return { ...settings };
}

export {
  createDefaultSettings,
  updateTheme,
  toggleNotifications,
  setLanguage,
  cloneSettings,
};
