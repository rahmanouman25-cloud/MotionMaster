# MotionMaster — AI Debate Prep & Refutation Coach

## 1. Overview & Problem Solved
In British Parliamentary (BP) debate, speakers receive a complex motion and have exactly 15 minutes to prepare a structured 7-minute speech. Debaters practicing alone lack an opponent to test their cases or provide realistic refutations.

**MotionMaster** acts as a virtual prep partner and coach. It converts debate motions into structured arguments, predicts opposition vulnerabilities, and simulates role-specific 3-point rebuttals based on standard BP speaking order.

## 2. Live Deployed URL
🔗 Live App: [https://motionmaster-three.vercel.app](https://motionmaster-three.vercel.app).

## 3. Key Features
- **Case File Generator:** Breaks motions down into core arguments (Claims, Mechanisms, Impacts) and isolates 2 key opposition vulnerabilities.
- **Refutation Bot:** Analyzes user speech outlines and generates counter-arguments tailored to the user's selected debate position (e.g., simulating the Leader of Opposition if the user plays Prime Minister).
- **15-Minute Prep Timer:** Built-in countdown clock with pause and reset controls to simulate real BP competition conditions.
- **Interactive Workspace:** Rich text area allowing debaters to draft speech notes side-by-side with AI guidance.
- **Local History Log:** Automatically saves past prep sessions locally via `localStorage`.

## 4. AI Feature & Prompt Architecture
The AI feature functions as an elite parliamentary debate coach.

**System Prompt Instructions:**
> "You are an elite British Parliamentary debate adjudicator and coach. Analyze the user's provided motion and position. 
> 1. Structure arguments clearly using the Motion-Mechanism-Impact framework. 
> 2. Avoid generic summaries; specify exact real-world mechanism steps.
> 3. Identify the 2 most critical vulnerabilities the opposition will attack.
> 4. When evaluating refutations, address the user's explicit claims directly rather than offering general counters."

## 5. Tools & Technologies Used
- **Framework & UI:** React, Next.js, Tailwind CSS
- **App Builder & Hosting:** v0 by Vercel, Vercel Platform
- **Version Control:** GitHub


## 6. Screenshots of app in working
<img width="1365" height="594" alt="Screenshot 2026-07-24 5 02 54 PM" src="https://github.com/user-attachments/assets/5ad828b6-43ec-4a8b-a23f-31db51288a9a" />
<img width="1365" height="594" alt="Screenshot 2026-07-24 5 02 59 PM" src="https://github.com/user-attachments/assets/e25b556e-3330-47e5-bb3c-47d370c74bb5" />
<img width="1365" height="594" alt="Screenshot 2026-07-24 5 03 13 PM" src="https://github.com/user-attachments/assets/c3edb0e3-602e-4f15-ab1b-165abdf4c45a" />
<img width="1365" height="594" alt="Screenshot 2026-07-24 5 03 23 PM" src="https://github.com/user-attachments/assets/fd1b449c-8112-4be8-9607-c011c5b6dca4" />
<img width="1365" height="594" alt="Screenshot 2026-07-24 5 05 00 PM" src="https://github.com/user-attachments/assets/1f7b8554-e831-4190-b422-07adda4aa997" />
<img width="1365" height="594" alt="Screenshot 2026-07-24 5 05 11 PM" src="https://github.com/user-attachments/assets/5214385c-9e78-4190-aa28-d33473a92da6" />

## 7. How to Run the Project Locally
1. Clone this repository:
   ```bash
   git clone [https://github.com/rahmanouman25-cloud/MotionMaster.git](https://github.com/rahmanouman25-cloud/MotionMaster.git)
