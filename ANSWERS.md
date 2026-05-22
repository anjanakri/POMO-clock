# ANSWERS.md
Built as part of the Dev Weekends Fellowship 2026 frontend assessment.

## 1. How to Run
No installation needed — this is pure HTML/CSS/JS.

**Steps:**
1. **Clone the repo:**
```bash
git clone https://github.com/anjanakri/POMO-clock.git
cd POMO-clock
```
2. Open `index.html` directly in any browser (double-click it)

> No Node.js, no npm, no build step required.

**Just Visit**

Deployed URL: https://anjanakri.github.io/POMO-clock/


## 2. Stack & Design Choices

### Why HTML/CSS/JS ?

- Used HTML, CSS, and JavaScript because the project is lightweight and doesn’t require complex state management or component rendering

- Avoided unnecessary dependencies, build tools, and setup steps

- Anyone can run the project instantly by opening `index.html`, no `npm install` required.

- Keeping everything in a few simple files made the project easier to understand and maintain.

### Visual & Interaction Decisions

| Decision | Why I Made It | Part of App Affected |
|---|---|---|
|Frosted glass timer card over a pixel-art background | The timer is the primary interaction point, so I centered it inside a blurred glass card to keep the countdown readable while still preserving the Minecraft-inspired wallpaper behind it | Main timer section |
|Minecraft-inspired pixel UI | Since I enjoy playing Minecraft, I designed the interface using a pixel-art aesthetic to make the app feel playful and nostalgic instead of looking like a generic productivity tool | Entire visual identity |
|Large 3D block-style controls | I used oversized colored buttons with shadows and press animations so interactions feel tactile and visually satisfying when starting, pausing, or resetting the timer | Timer controls |
|Color-based timer states | Green for Start, yellow for Pause, and red for Reset help users instantly recognize actions without relying only on labels | Control usability |
|Large centered countdown typography | The countdown is intentionally large and centered so users can quickly read the remaining time from across the screen | Timer display |

---

## 3. Responsive & Accessibility


## 4. AI Usage

| Where | Tool | What I asked | What it gave me |
|---|---|---|---|
| Web Audio beep | Claude | "Write a Web Audio API beep with ascending notes for focus end and descending for break end" | A 3-note oscillator chain with gain envelopes |

## 5. What I Would Improve With Another Day
- Add smoother animations during transitions between focus and break sessions
- Add optional ambient audio features like lo-fi music and subtle ticking sounds to make focus sessions feel more immersive

