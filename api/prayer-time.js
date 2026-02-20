// api/prayer-times.js
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Gaza&country=Palestine&method=4",
    );
    const data = await response.json();

    // إضافة الهيدر للسماح بالوصول من أي موقع
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "فشل الاتصال بالـ API", details: error.message });
  }
};
