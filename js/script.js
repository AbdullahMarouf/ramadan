let alertShown = false;
let countdownInterval;
function startCountdown() {
  countdownInterval = setInterval(updateCountdown, 1000);
}
function updateCountdown() {
  let now = new Date();
  let iftarTime = new Date();
  iftarTime.setHours(17, 34, 0, 0);
  // إذا الوقت الحالي بعد الإفطار، نحسب لليوم التالي
  if (now > iftarTime) {
    iftarTime.setDate(iftarTime.getDate() + 1);
  }

  let diff = iftarTime - now;

  // حساب الساعات والدقائق والثواني المتبقية
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("iftar-countdown").innerHTML = `
    <div class="flex flex-col items-center">
        <span class="text-xl font-bold">${hours} ساعة ${minutes} دقيقة ${seconds} ثانية</span>
        <span class="text-lg font-bold text-purple-600 mt-2">حتى الإفطار القادم 🌙</span>
    </div>
`;

  // عند الوصول للإفطار يظهر تنبيه SweetAlert
  if (diff <= 0 && !alertShown) {
    Swal.fire("🌙 إفطار مبارك!", "تقبل الله صيامكم", "success");
    alertShown = true;

    clearInterval(countdownInterval);
    // بعد 20 دقائق يبدأ العد من جديد لليوم التالي
    setTimeout(() => {
      alertShown = false;
      startCountdown();
    }, 200000);
  }
}
// تشغيل العداد أول مرة
startCountdown();
// -------------------------
// عداد ختم القرآن (Progress Bar)
// -------------------------
let totalPages = 604; // عدد صفحات المصحف

// عند تحميل الصفحة، استرجاع القيمة من localStorage
window.onload = function () {
  let savedPages = localStorage.getItem("pagesRead");
  if (savedPages) {
    document.getElementById("pages-read").value = savedPages;
    updateProgress(savedPages);
  }
};

function submitProgress() {
  let pages = parseInt(document.getElementById("pages-read").value);
  if (isNaN(pages) || pages < 0) return;

  // حفظ القيمة في localStorage
  localStorage.setItem("pagesRead", pages);

  // تحديث الشريط
  updateProgress(pages);

  // تصفير الإدخال
  document.getElementById("pages-read").value = "";
}

function updateProgress(pages) {
  let percent = Math.min((pages / totalPages) * 100, 100);

  // تغيير لون الشريط حسب النسبة
  let bar = document.getElementById("progress-bar");
  bar.style.width = percent + "%";

  if (percent < 33) {
    bar.style.backgroundColor = "red";
  } else if (percent < 66) {
    bar.style.backgroundColor = "orange";
  } else {
    bar.style.backgroundColor = "green";
  }

  document.getElementById("progress-text").innerText =
    `أنجزت ${percent.toFixed(2)}% من الختمة`;
}

// -------------------------
// أذكار عشوائية (Azkar)
// -------------------------
const azkar = [
  "اللهم اجعل صيامي فيه صيام الصائمين، وقيامي فيه قيام القائمين، ونبّهني فيه عن نومة الغافلين، وهب لي فيه الرفق والعطف يا أرحم الراحمين.",
  "اللهم اجعلني فيه من المتوكلين عليك، واجعلني فيه من الفائزين لديك، واجعلني فيه من المقربين إليك بإحسانك يا غاية الطالبين.",
  "اللهم اجعلني فيه من الذين يستغفرونك كثيراً، ويذكرونك كثيراً، واجعلني فيه من الذين ترحمهم وتغفر لهم وتعتق رقابهم من النار.",
  "اللهم اجعلني فيه من الذين يتلون كتابك حق تلاوته، ويقيمون حدودك، ويعملون بأوامرك، ويجتنبون نواهيك، برحمتك يا أرحم الراحمين.",
  "اللهم اجعلني فيه من الذين يكثرون الصلاة على نبيك محمد صلى الله عليه وسلم، واغفر لي ذنوبي، واغسل قلبي بماء اليقين، ونور بصيرتي بنور الإيمان.",
  "اللهم اجعلني فيه من الذين يبرّون والديهم، ويصلون أرحامهم، ويؤدون الأمانة، ويصدقون الحديث، ويؤدون الحقوق، ويجتنبون الفواحش والمنكرات.",
  "اللهم اجعلني فيه من الذين يكثرون الدعاء، ويستجاب لهم، ويغفر لهم، ويعتقون من النار، ويكتبون في ديوان السعداء.",
  "اللهم اجعلني فيه من الذين يكثرون الصدقة، ويطعمون الطعام، ويؤوون اليتامى، ويواسون الفقراء، ويحنّون على الأرامل والمساكين.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر الموت، ويستعدون للقاءك، ويعملون للآخرة، ويزهدون في الدنيا، ويجعلون رضاك غايتهم.",
  "اللهم اجعلني فيه من الذين يكثرون الاستغفار، ويغفر لهم، ويبدّل سيئاتهم حسنات، ويجعلون لسانهم رطباً بذكرك.",
  "اللهم اجعلني فيه من الذين يكثرون القيام، ويخشعون في صلاتهم، ويطيلون السجود، ويستشعرون قربك في دعائهم.",
  "اللهم اجعلني فيه من الذين يكثرون البكاء من خشيتك، ويخشعون عند سماع القرآن، ويجدون لذة الإيمان في قلوبهم.",
  "اللهم اجعلني فيه من الذين يكثرون العمل الصالح، ويجعلون نيتهم خالصة لك، ويبتعدون عن الرياء والسمعة.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر اسمك العظيم، ويستحضرون عظمة جلالك، ويخشعون عند ذكرك.",
  "اللهم اجعلني فيه من الذين يكثرون الصبر على البلاء، ويحتسبون الأجر عندك، ويثقون بحكمتك وعدلك.",
  "اللهم اجعلني فيه من الذين يكثرون الشكر على نعمك، ويعترفون بفضلك، ويستعملون نعمك في طاعتك.",
  "اللهم اجعلني فيه من الذين يكثرون التوبة، ويعودون إليك بعد الذنب، ويستغفرونك بصدق وإخلاص.",
  "اللهم اجعلني فيه من الذين يكثرون حسن الظن بك، ويثقون برحمتك، ويأملون في عفوك ومغفرتك.",
  "اللهم اجعلني فيه من الذين يكثرون قراءة القرآن، ويتدبرون آياته، ويعملون بما فيه من أوامر ونواهي.",
  "اللهم اجعلني فيه من الذين يكثرون الدعاء لأهلهم وأحبابهم، ويصلون أرحامهم، ويبرّون والديهم.",
  "اللهم اجعلني فيه من الذين يكثرون العمل الجماعي، ويحبون الخير للناس، ويعاونون على البر والتقوى.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر نعمك، ويستحضرون فضلك، ويشكرونك في السر والعلن.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر الجنة، ويعملون لها، ويشتاقون إليها، ويبتعدون عن النار.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر الأنبياء والصالحين، ويقتدون بهم، ويعملون بسننهم.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر رحمتك، ويستشعرون لطفك، ويعيشون في ظل عفوك.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر فضائل رمضان، ويغتنمون أيامه ولياليه، ويستثمرون وقته في الطاعة.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر ليلة القدر، ويستعدون لها، ويكثرون الدعاء فيها، ويغتنمون فضلها العظيم.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر الصالحين، ويحبون صحبتهم، ويقتدون بأعمالهم، ويستفيدون من علمهم.",
  "اللهم اجعلني فيه من الذين يكثرون ذكرك في كل حال، ويجعلون حياتهم كلها طاعة لك، ويبتعدون عن معصيتك.",
  "اللهم اجعلني فيه من الذين يكثرون ذكر يوم القيامة، ويستعدون له، ويعملون لما بعد الموت، ويجعلون رضاك غايتهم.",
];

const btnZikr = document.querySelector(".showRandomZikr");
// إضافة حدث الضغط
btnZikr.addEventListener("click", () => {
  let random = azkar[Math.floor(Math.random() * azkar.length)];

  Swal.fire({
    title: "وذكِّــــــــــــــــــر",
    text: random,
    imageUrl: "images/lantern.png",
    imageWidth: 120,
    background: "#ffffff",
    color: "#000000",
    customClass: {
      title: "text-purple-600 font-extrabold text-3xl mb-4 text-center",
    },
  });
});

// -------------------------
// Progress Bar للتمرير (Scroll Progress)
// -------------------------
const progressBarr = document.querySelector("#progress-barr");
window.onscroll = () => {
  progressBarr.style.width =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      window.innerWidth +
    "px";
};

// -------------------------
// مواقيت الصلاة (Prayer Times API)
// -------------------------
fetch(
  "https://api.aladhan.com/v1/timingsByCity?city=Gaza&country=Palestine&method=4",
)
  .then((res) => res.json())
  .then((data) => {
    let timings = data.data.timings;
    let container = document.getElementById("prayer-times");

    let prayers = [
      { name: "الفجر", time: timings.Fajr, icon: "fa-moon" },
      { name: "الظهر", time: timings.Dhuhr, icon: "fa-sun" },
      { name: "العصر", time: timings.Asr, icon: "fa-cloud-sun" },
      { name: "المغرب", time: timings.Maghrib, icon: "fa-star-and-crescent" },
      { name: "العشاء", time: timings.Isha, icon: "fa-mosque" },
    ];

    prayers.forEach((prayer) => {
      let card = document.createElement("div");
      card.className = "bg-gray-100 rounded-lg p-4 shadow";

      card.innerHTML = `
          <i class="fas ${prayer.icon} text-purple-600 text-2xl mb-2"></i>
          <h3 class="font-semibold">${prayer.name}</h3>
          <p class="text-gray-700 mt-1">${prayer.time}</p>
        `;
      container.appendChild(card);
    });
  });

// -------------------------
// حالة الطقس (Weather API)
// -------------------------
fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=31.5&longitude=34.47&current_weather=true",
)
  .then((res) => res.json())
  .then((data) => {
    let weather = data.current_weather;
    document.getElementById("weather").textContent =
      `درجة الحرارة: ${weather.temperature}°C | الرياح: ${weather.windspeed} km/h`;
  });

// -------------------------
// التاريخ الهجري (Hijri Date API)
// -------------------------
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

fetch(`https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`)
  .then((res) => res.json())
  .then((data) => {
    let hijri = data.data.hijri;
    document.getElementById("hijri-date").textContent =
      `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
  });

// -------------------------
// زر العودة للأعلى (Back To Top)
// -------------------------
const btn = document.getElementById("backToTop");
// إظهار الزر بعد التمرير 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.classList.remove("opacity-0", "invisible", "--bottom-40");
    btn.classList.add("opacity-100", "visible", "bottom-10");
  } else {
    btn.classList.remove("opacity-100", "visible", "bottom-10");
    btn.classList.add("opacity-0", "invisible", "--bottom-40");
  }
});
btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// -------------------------
// مسبحة إلكترونية (Tasbeeh Counter)
// -------------------------
let count = 0;

function incrementCounter() {
  count++;
  document.getElementById("counter").innerText = count;
}

function resetCounter() {
  count = 0;
  document.getElementById("counter").innerText = count;
}

document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Toggle icon
    const icon = button.querySelector("span:last-child");
    icon.classList.toggle("rotate-45");

    // Show/hide content
    const content = button.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
// ---------------------------------
// حديث نبوي عشوائي (Random Hadith API)
/************************************** */
async function getRandomHadith() {
  let res = await fetch(
    "https://api.hadith.gading.dev/books/muslim?range=1-300",
  );

  let data = await res.json();

  let hadiths = data.data.hadiths;

  let random = hadiths[Math.floor(Math.random() * hadiths.length)];

  Swal.fire({
    title: "حديث نبوي ﷺ",

    html: `
    <div class="
    font-['serif']
    text-sm sm:text-lg
    leading-7 sm:leading-8
    text-gray-700
    text-right
    ">

    ${random.arab}

    </div>
    `,

    confirmButtonText: "حسناً",

    customClass: {
      title:
        "text-amber-600 font-extrabold text-xl sm:text-3xl text-center font-serif",

      confirmButton:
        "bg-amber-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-amber-600 transition text-sm sm:text-base w-full",

      popup:
        "bg-white text-gray-800 rounded-lg shadow-lg p-4 sm:p-6 w-[280px] sm:w-[420px] md:w-[500px]",
    },
  });
}

// =============================
// آية قرآنية Toast كل 15 دقيقة
// =============================
async function showAyahToast() {
  try {
    let res = await fetch(
      "https://api.quran.com/api/v4/verses/random?language=ar&fields=text_uthmani,chapter_id,verse_key",
    );

    let data = await res.json();

    let ayah = data.verse.text_uthmani;

    let verseKey = data.verse.verse_key.split(":");
    let surahNumber = verseKey[0];
    let ayahNumber = verseKey[1];

    // جلب اسم السورة
    let resSurah = await fetch(
      `https://api.quran.com/api/v4/chapters/${surahNumber}?language=ar`,
    );

    let surahData = await resSurah.json();

    let surahName = surahData.chapter.name_arabic;

    Swal.fire({
      toast: true,
      position: "top-end",

      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,

      background: "#ffffff",

      customClass: {
        popup: "p-3 sm:p-5 w-[260px] sm:w-[380px] rounded-xl shadow-lg",
      },

      html: `
      <div class="flex items-start gap-2 sm:gap-3 text-right">

        <img 
        src="images/lantern.png"
        class="w-8 sm:w-10 mt-1"
        />

        <div class="flex-1">

          <div class="font-bold text-sm sm:text-base mb-1">
          آية قرآنية 📖
          </div>

          <div class="
          font-['Amiri']
          text-xs sm:text-sm
          leading-6 sm:leading-7
          font-bold
          ">
          ${ayah}
          </div>

          <div class="
          font-['Amiri']
          text-[10px] sm:text-xs
          text-gray-500
          mt-1
          ">
          سورة ${surahName} - آية ${ayahNumber}
          </div>

        </div>

      </div>
      `,
    });
  } catch (error) {
    console.log("Ayah API Error", error);
  }
}

// أول مرة
showAyahToast();

// كل 5 دقائق
setInterval(showAyahToast, 300000);
