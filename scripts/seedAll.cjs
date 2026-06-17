const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

// Access functions through the admin object
initializeApp({
  credential: cert(serviceAccount),
});

const db= getFirestore();

(async () => {
  await Promise.all([
    require("./seedBreakfast.js").seed(db),
    require("./seedHot.js").seed(db),
    require("./seedIced.js").seed(db),
    require("./seedSandwiches.js").seed(db),
    require("./seedSoup.js").seed(db),
    require("./seedBfModifiers.js").seed(db),
    require("./seedModifiers.js").seed(db),
    require("./seedSalad.js").seed(db),
    require("./seedSchedule.js").seed(db),
  ]);

  console.log("Seeding complete");
})();