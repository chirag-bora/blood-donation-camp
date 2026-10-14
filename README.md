# 🩸 Simple, Modern & Automated Blood Donor Registration System
### रक्तदान शिविर 2026 — जोधपुर, राजस्थान
**Google Sheets + Google Apps Script Automated Donor Register**

---

## 🌟 What Was Changed & Modernized

1. **Replaced Complex Multi-Step Form**:
   - Built a **1-minute modern, playful, mobile-first registration form** directly on the landing page (`/` and `/register`).
   - Added **interactive pill buttons** for Blood Groups (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`, `Unknown`).
   - Added **1-touch options** for previous donation history (`Yes`, `No`, `First Time`).
   - Clean Indian mobile phone input with automatic `+91` normalization.
   - Age validation strictly ensuring eligibility (18–65 years).
   - Clear, explicit consent checkbox in Hindi & English.

2. **Automated Google Sheets Integration (No Complex Databases Required!)**:
   - Zero database setup required: No PostgreSQL, Prisma, MongoDB, or Supabase.
   - All registrations are forwarded by the Next.js API route `/api/register` straight to your private **Google Sheet via Google Apps Script**.
   - Includes **anti-formula injection protection**, **concurrency locking**, and **IST timestamps**.

3. **Pamphlet Branding & Emotional Theme**:
   - Designed around the official campaign pamphlet:
     - **Camp Details**: 18 October 2026, Sunday | 9:00 AM – 5:00 PM | Shri Jai Narayan Vyas Vidyalaya, Jadav Mohalla, Jodhpur
     - **Divine blessings line**: *जय गणेश • जय माँ उष्ट्रवाहिनी • जय श्री सोमेश्वर गिरी जी महाराज*
     - **Headline**: *रक्तदान महादान ❤️ — आपका एक कदम, किसी को दे सकता है नया जीवन।*
     - **Click-to-Call Organizers**: Dr. Ankit Kalla, Mohit Vyas, Er. Chirag Bora, Dev Joshi, Er. Mukul Raj Vyas, Abhishek Parihar.

4. **Public High-Resolution QR Code (`/qr`)**:
   - Organizers can visit `/qr` to preview, test, and download a **600x600 high-res PNG QR code** pointing directly to the deployed registration page, ready for printing on pamphlets and banner standees.

5. **Celebratory Confirmation Screen (`/registration-success`)**:
   - Displays a unique non-sequential ID (`RD-2026-XXXXXX`), verified camp details, pre-donation medical screening reminder, and a **one-click "Save / Print Pass"** button.

---

## 📋 5-Minute Google Sheets Setup Guide

Follow these quick steps to connect your Google Sheet:

### Step 1: Create Your Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Rename the spreadsheet to: `रक्तदान शिविर 2026 - Donor Register`.
3. *(Optional)* Add the header row in Row 1:
   - `Registration ID` | `Registration Date & Time (IST)` | `Full Name` | `Mobile Number` | `Age` | `Blood Group` | `Locality / City` | `Previous Donation` | `Registration Status` | `Consent Given` | `Consent Timestamp (IST)`
   *(The script will automatically create and style this header row if left blank).*

### Step 2: Add the Google Apps Script
1. In your Google Sheet, click on **Extensions** in the top menu $\rightarrow$ **Apps Script**.
2. Erase any placeholder code in the script editor.
3. Open the file `google-apps-script.js` located in this project folder, copy its entire content, and paste it into the Apps Script editor.
4. Click the **Save** (💾) icon.

### Step 3: Deploy as Web App
1. In the top-right corner of Apps Script, click **Deploy** $\rightarrow$ **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and select **Web app**.
3. Fill in the deployment settings:
   - **Description**: `Blood Donation Camp Registration Webhook`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Note: This allows our secure Next.js backend to send POST requests; your Google Sheet itself remains 100% private!)*
4. Click **Deploy**.
5. Click **Authorize access**, select your Google account, and click **Allow**.
6. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/.../exec`).

### Step 4: Configure Next.js Environment
Open `.env` in the `blood-donation-camp` folder and paste your Web App URL:
```env
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec"
APPS_SCRIPT_SECRET="blood_camp_secret_2026"
NEXT_PUBLIC_REGISTRATION_URL="https://your-domain.vercel.app/"
```

That's it! Every donor who registers will now automatically appear as a new row in your Google Sheet in real-time.

---

## 🏃 Running the Application Locally

```bash
cd "c:\Users\chira\OneDrive\Desktop\Election Pdf\blood-donation-camp"

# Run the live production server
npm run start -- -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Main Landing & Registration Page**: [http://localhost:3000](http://localhost:3000)
- **Direct Registration Form**: [http://localhost:3000/register](http://localhost:3000/register)
- **Pamphlet QR Code Generator**: [http://localhost:3000/qr](http://localhost:3000/qr)
- **Privacy Policy**: [http://localhost:3000/privacy](http://localhost:3000/privacy)
