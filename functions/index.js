const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUser = functions.https.onCall(async (data, context) => {
  const { email, password, name, userType } = data;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      name,
      email,
      userType,
    });
    return { success: true, uid: userRecord.uid };
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

exports.createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated."
    );
  }
  const {
    dropOffLocation,
    pickupLocation,
    itemType,
    itemName,
    itemDescription,
    price,
  } = data;
  try {
    const orderRef = await admin.firestore().collection("orders").add({
      userId: context.auth.uid,
      dropOffLocation,
      pickupLocation,
      itemType,
      itemName,
      itemDescription,
      price,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, orderId: orderRef.id };
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

exports.getOrders = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated."
    );
  }
  try {
    const snapshot = await admin
      .firestore()
      .collection("orders")
      .where("userId", "==", context.auth.uid)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});
