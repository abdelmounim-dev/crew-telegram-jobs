
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          query_id?: string;
          chat_instance?: string;
          chat?: {
            id: number;
            type: string;
            title?: string;
            username?: string;
            first_name?: string;
            last_name?: string;
          };
          start_param?: string;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        isExpanded: boolean;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive: boolean) => void;
          hideProgress: () => void;
        };
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        onEvent: (eventType: string, eventHandler: (...args: any[]) => void) => void;
        offEvent: (eventType: string, eventHandler: (...args: any[]) => void) => void;
        openLink: (url: string) => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{
            id: string;
            type: "default" | "ok" | "close" | "cancel" | "destructive";
            text: string;
          }>;
        }, callback?: (buttonId: string) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        isClosingConfirmationEnabled: boolean;
        setTitle: (title: string) => void;
      };
    };
  }
}

export const telegram = window.Telegram?.WebApp;

// Initialize Telegram WebApp
export const initTelegram = () => {
  if (telegram) {
    telegram.ready();
    telegram.expand();
  }
};

// Get user data from Telegram
export const getTelegramUser = () => {
  if (telegram && telegram.initDataUnsafe.user) {
    return telegram.initDataUnsafe.user;
  }
  return null;
};

// Show an alert using Telegram's native UI
export const showAlert = (message: string, callback?: () => void) => {
  if (telegram) {
    telegram.showAlert(message, callback);
  } else {
    alert(message);
    if (callback) callback();
  }
};

// Show a confirmation using Telegram's native UI
export const showConfirm = (message: string, callback?: (confirmed: boolean) => void) => {
  if (telegram) {
    telegram.showConfirm(message, callback);
  } else {
    const confirmed = confirm(message);
    if (callback) callback(confirmed);
  }
};

// Set the main button in Telegram WebApp
export const setMainButton = (
  text: string,
  onClick: () => void,
  options?: {
    color?: string;
    textColor?: string;
    showProgress?: boolean;
  }
) => {
  if (!telegram) return;

  const { MainButton } = telegram;
  MainButton.setText(text);

  if (options?.color) {
    MainButton.color = options.color;
  }

  if (options?.textColor) {
    MainButton.textColor = options.textColor;
  }

  MainButton.onClick(onClick);
  MainButton.show();

  if (options?.showProgress) {
    MainButton.showProgress(true);
  }

  return () => {
    MainButton.offClick(onClick);
    MainButton.hide();
  };
};

// Enable back button
export const enableBackButton = (onClick: () => void) => {
  if (!telegram) return;

  const { BackButton } = telegram;
  BackButton.onClick(onClick);
  BackButton.show();

  return () => {
    BackButton.offClick(onClick);
    BackButton.hide();
  };
};
