# MotionMaster — AI Debate Prep & Refutation Coach

## 1. Overview & Problem Solved
In British Parliamentary (BP) debate, speakers receive a complex motion and have exactly 15 minutes to prepare a structured 7-minute speech. Debaters practicing alone lack an opponent to test their cases or provide realistic refutations.

**MotionMaster** acts as a virtual prep partner and coach. It converts debate motions into structured arguments, predicts opposition vulnerabilities, and simulates role-specific 3-point rebuttals based on standard BP speaking order.

## 2. Live Deployed URL
🔗 Live App: motionmaster-three.vercel.app.

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

## 6. How to Run the Project Locally
1. Clone this repository:
   ```bash
   git clone [https://github.com/rahmanouman25-cloud/MotionMaster.git](https://github.com/rahmanouman25-cloud/MotionMaster.git)
