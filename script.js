// --- 1. 語系資料庫 (i18n) ---
const i18n = {
  zh: {
    navAbout: "關於", navProjects: "專案", navSkills: "技能", navContact: "聯絡",
    heroTitle: "林星翰",
    typing: ["通訊工程學生", "專注於訊號處理", "探索 AI 開發"],
    btnWork: "查看作品", btnContact: "聯絡我",
    aboutTitle: "關於我",
    aboutText: "目前就讀於國立臺北大學通訊工程系二年級。<br>專注於訊號處理、傅立葉分析與機率模型，並逐步學習 AI 應用與 Web 網頁開發。<br>擁有 TOEIC 870 分 (金牌) 與 JLPT N2 語言認證。",
    projectsTitle: "專案經歷",
    skillsTitle: "專業技能",
    contactTitle: "聯絡方式"
  },
  en: {
    navAbout: "About", navProjects: "Projects", navSkills: "Skills", navContact: "Contact",
    heroTitle: "Hsin-Han Lin",
    typing: ["Comm Engineering Student", "Focus on Signal Processing", "Exploring AI Dev"],
    btnWork: "View Work", btnContact: "Contact Me",
    aboutTitle: "About Me",
    aboutText: "Sophomore in Communication Engineering at National Taipei University.<br>Focused on signal processing, Fourier analysis, and probability models, while expanding into AI applications and Web development.<br>Hold TOEIC Gold Certificate (870) and JLPT N2.",
    projectsTitle: "Projects",
    skillsTitle: "Skills",
    contactTitle: "Contact"
  }
};

let currentLang = 'zh';

// --- 2. 專案與技能資料 (支援雙語) ---
const projectsData = [
  {
    name: { zh: "DFT 分析", en: "DFT Analysis" },
    desc: { zh: "實作離散傅立葉轉換並分析頻譜，探討不同訊號的頻域特徵。", en: "Implemented Discrete Fourier Transform and analyzed spectrum features." },
    tech: ["MATLAB", "Signal Processing"]
  },
  {
    name: { zh: "Monte Carlo 模擬", en: "Monte Carlo Simulation" },
    desc: { zh: "比較不同 sampling 方法的 variance，並進行機率模型的驗證。", en: "Compared variance of different sampling methods and verified probability models." },
    tech: ["Python", "Probability"]
  },
  {
    name: { zh: "BJT 電路分析", en: "BJT Circuit Analysis" },
    desc: { zh: "利用 MATLAB 與 PSpice 進行電路模擬分析，探討極性與波形反轉現象。", en: "Conducted circuit simulation using MATLAB and PSpice, analyzing polarity and waveform inversion." },
    tech: ["MATLAB", "PSpice", "Circuit Theory"]
  },
  {
    name: { zh: "通訊網路效能計算", en: "Network Performance Calculation" },
    desc: { zh: "進行 Slotted ALOHA 協定的公平性參數與機率推導計算。", en: "Calculated fairness parameters and derived probabilities for the Slotted ALOHA protocol." },
    tech: ["Math", "Communication Protocol"]
  }
];

const skillsData = {
  Programming: ["C", "C++", "Python", "MATLAB"],
  AI: ["Machine Learning", "Google AI Studio", "Gemini API"],
  Web: ["HTML", "CSS", "JavaScript"],
  Tools: ["Git", "GitHub", "PSpice"]
};

// --- 3. 畫面渲染邏輯 ---
function renderProjects() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = ""; 
  projectsData.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    const tagsHtml = p.tech.map(t => `<span>${t}</span>`).join('');
    div.innerHTML = `
      <h3>${p.name[currentLang]}</h3>
      <p>${p.desc[currentLang]}</p>
      <div class="tech-tags">${tagsHtml}</div>
    `;
    projectList.appendChild(div);
  });
}

function renderSkills() {
  const skillList = document.getElementById("skill-list");
  skillList.innerHTML = ""; 
  for (let category in skillsData) {
    const div = document.createElement("div");
    div.className = "card";
    const skillsHtml = skillsData[category].map(s => `<span>${s}</span>`).join('');
    div.innerHTML = `
      <h3>${category}</h3>
      <div class="tech-tags">${skillsHtml}</div>
    `;
    skillList.appendChild(div);
  }
}

// --- 4. 語系切換功能 ---
function toggleLanguage() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  const data = i18n[currentLang];

  document.getElementById("nav-about").textContent = data.navAbout;
  document.getElementById("nav-projects").textContent = data.navProjects;
  document.getElementById("nav-skills").textContent = data.navSkills;
  document.getElementById("nav-contact").textContent = data.navContact;
  document.getElementById("lang-btn").textContent = currentLang === 'zh' ? 'EN' : '中文';
  
  document.getElementById("hero-title").textContent = data.heroTitle;
  document.getElementById("btn-work").textContent = data.btnWork;
  document.getElementById("btn-contact").textContent = data.btnContact;
  document.getElementById("about-title").textContent = data.aboutTitle;
  document.getElementById("about-text").innerHTML = data.aboutText;
  document.getElementById("projects-title").textContent = data.projectsTitle;
  document.getElementById("skills-title").textContent = data.skillsTitle;
  document.getElementById("contact-title").textContent = data.contactTitle;

  renderProjects();
  renderSkills();

  textArray = data.typing;
  textArrayIndex = 0;
  charIndex = 0;
  typingTextSpan.textContent = "";
  clearTimeout(typingTimeout);
  type();
}

document.getElementById("lang-btn").addEventListener("click", toggleLanguage);

// --- 5. 打字機特效 ---
let textArray = i18n[currentLang].typing;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;
let typingTimeout;
const typingTextSpan = document.getElementById("typing-text");

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    typingTimeout = setTimeout(type, typingDelay);
  } else {
    typingTimeout = setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    typingTimeout = setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    typingTimeout = setTimeout(type, typingDelay + 1100);
  }
}

// --- 6. 平滑滾動與漸顯動畫 ---
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// --- 7. 初始化執行 ---
document.addEventListener("DOMContentLoaded", function() {
  renderProjects();
  renderSkills();
  reveal();
  if (textArray.length) typingTimeout = setTimeout(type, newTextDelay + 250);
});
