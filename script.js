// --- 1. 平滑滾動 ---
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// --- 2. 打字機特效 ---
const textArray = ["通訊工程學生", "專注於訊號處理", "探索 AI 開發"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;
const typingTextSpan = document.getElementById("typing-text");

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// --- 3. 動態渲染專案與技能 ---
const projects = [
  {
    name: "DFT Analysis",
    desc: "實作離散傅立葉轉換並分析頻譜，探討不同訊號的頻域特徵。",
    tech: ["MATLAB", "Signal Processing"]
  },
  {
    name: "Monte Carlo Simulation",
    desc: "比較不同 sampling 方法的 variance，並進行機率模型的驗證。",
    tech: ["Python", "Probability"]
  }
];

const skills = {
  Programming: ["C", "C++", "Python", "MATLAB"],
  AI: ["Machine Learning"],
  Web: ["HTML", "CSS", "JavaScript"],
  Tools: ["Git", "GitHub"]
};

const projectList = document.getElementById("project-list");
projects.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  const tagsHtml = p.tech.map(t => `<span>${t}</span>`).join('');
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="tech-tags">${tagsHtml}</div>
  `;
  projectList.appendChild(div);
});

const skillList = document.getElementById("skill-list");
for (let category in skills) {
  const div = document.createElement("div");
  div.className = "card";
  const skillsHtml = skills[category].map(s => `<span>${s}</span>`).join('');
  div.innerHTML = `
    <h3>${category}</h3>
    <div class="tech-tags">${skillsHtml}</div>
  `;
  skillList.appendChild(div);
}

// --- 4. 滾動漸顯動畫 (Scroll Reveal) ---
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
reveal(); // 載入時先執行一次，確保視野內的元素顯示