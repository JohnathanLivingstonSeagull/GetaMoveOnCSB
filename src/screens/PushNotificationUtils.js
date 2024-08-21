import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export function listenForNotifications(notificationListener, responseListener) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const notificationListenerSubscription =
    Notifications.addNotificationReceivedListener(notificationListener);
  const responseListenerSubscription =
    Notifications.addNotificationResponseReceivedListener(responseListener);

  return () => {
    notificationListenerSubscription.remove();
    responseListenerSubscription.remove();
  };
}

export function scheduleWeeklyReminder() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Forgot Lunch in the Fridge Again?",
      body: "Get it Zoorted for less than a Sausage Roll 🥴!",
    },
    trigger: {
      weekday: 3, // Wednesday
      hour: 12,
      minute: 0,
      repeats: true,
    },
  });
}
