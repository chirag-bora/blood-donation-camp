const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const TARGET_URL = 'https://blood-donation-camp-one.vercel.app/';

async function generateAllQRCodes() {
  console.log(`Generating permanent ad-free QR codes for: ${TARGET_URL}`);

  const outputDirs = [
    path.join(__dirname, '..', 'public'),
    path.join(__dirname, '..', '..'), // Desktop/Election Pdf
  ];

  // 1. Classic High-Res QR (Black & White, 1200x1200px, Error Correction H - highest fault tolerance)
  const classicBuffer = await QRCode.toBuffer(TARGET_URL, {
    width: 1200,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  // 2. Blood Red Camp Themed QR (Crimson #B91C1C, 1200x1200px, Error Correction H)
  const themedBuffer = await QRCode.toBuffer(TARGET_URL, {
    width: 1200,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#B91C1C',
      light: '#FFFFFF'
    }
  });

  // 3. SVG vector format (Infinitely scalable without losing resolution)
  const svgString = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#B91C1C',
      light: '#FFFFFF'
    }
  });

  for (const dir of outputDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(path.join(dir, 'qr-code-direct.png'), classicBuffer);
    fs.writeFileSync(path.join(dir, 'qr-code-red.png'), themedBuffer);
    fs.writeFileSync(path.join(dir, 'qr-code.svg'), svgString);
    console.log(`Saved QR codes to: ${dir}`);
  }

  // Create an embeddable HTML printable flyer/standee card
  const base64Themed = themedBuffer.toString('base64');
  const printableHtml = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>माँ उष्ट्रवाहिनी रक्तदान शिविर - QR Pamphlet Standee</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@400;600;700;900&family=Poppins:wght@400;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Noto Sans Devanagari', 'Poppins', sans-serif;
      background: #f1f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      width: 480px;
      background: #ffffff;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(185, 28, 28, 0.25);
      border: 3px solid #fee2e2;
      text-align: center;
    }
    .header {
      background: linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%);
      color: #ffffff;
      padding: 24px 20px 20px;
    }
    .invocations {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #fef08a;
      margin-bottom: 8px;
    }
    .main-title {
      font-size: 26px;
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 4px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .subtitle {
      font-size: 13px;
      color: #fee2e2;
      font-weight: 600;
    }
    .qr-container {
      padding: 28px 20px 16px;
      background: #ffffff;
    }
    .qr-box {
      display: inline-block;
      padding: 14px;
      background: #ffffff;
      border-radius: 20px;
      border: 2px dashed #dc2626;
      box-shadow: 0 10px 25px rgba(220, 38, 38, 0.1);
    }
    .qr-img {
      width: 250px;
      height: 250px;
      display: block;
    }
    .scan-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #fef2f2;
      color: #b91c1c;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 9999px;
      border: 1px solid #fecaca;
      margin-top: 14px;
    }
    .url-text {
      font-family: 'Poppins', monospace;
      font-size: 12px;
      color: #475569;
      margin-top: 8px;
      font-weight: 600;
      word-break: break-all;
    }
    .details {
      background: #fff8f8;
      border-top: 1px solid #fee2e2;
      padding: 16px 20px;
      font-size: 13px;
      color: #1e293b;
      line-height: 1.6;
    }
    .details strong {
      color: #991b1b;
    }
    .footer {
      background: #1e293b;
      color: #cbd5e1;
      padding: 12px;
      font-size: 11px;
      font-weight: 600;
    }
    @media print {
      body { background: transparent; padding: 0; }
      .card { box-shadow: none; border: 1px solid #cbd5e1; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="invocations">॥ श्री गणेशाय नमः ॥ जय माँ उष्ट्रवाहिनी ॥ जय श्री सोमेश्वर गिरी जी महाराज ॥</div>
      <h1 class="main-title">माँ उष्ट्रवाहिनी रक्तदान शिविर</h1>
      <p class="subtitle">"रक्तदान महादान — आपका एक कदम, किसी को दे सकता है नया जीवन"</p>
    </div>
    
    <div class="qr-container">
      <div class="qr-box">
        <img class="qr-img" src="data:image/png;base64,${base64Themed}" alt="Scan QR Code to Register" />
      </div>
      <div>
        <div class="scan-badge">
          <span>📲 मोबाइल कैमरे से QR स्कैन करें और 1 मिनट में पंजीकरण करें</span>
        </div>
        <p class="url-text">${TARGET_URL}</p>
      </div>
    </div>

    <div class="details">
      <div>📅 <strong>दिनांक:</strong> 18 अक्टूबर 2026, रविवार | प्रातः 9:00 से सायं 5:00</div>
      <div>📍 <strong>स्थान:</strong> श्री जय नारायण व्यास विद्यालय, जादव मोहल्ला, जोधपुर</div>
      <div style="margin-top: 6px; font-size: 12px; color: #64748b;">
        📞 <strong>संपर्क सूत्र:</strong> डॉ. अंकित कल्ला (81144 16153) • मोहित व्यास (82091 36206) • इंजी. चिराग बोरा (89555 60932)
      </div>
    </div>

    <div class="footer">
      100% निःशुल्क • कोई विज्ञापन नहीं • सीधा पंजीकरण • कोई ऐप डाउनलोड नहीं
    </div>
  </div>
</body>
</html>`;

  for (const dir of outputDirs) {
    fs.writeFileSync(path.join(dir, 'pamphlet-qr-standee.html'), printableHtml, 'utf8');
  }

  console.log('All permanent, ad-free QR codes and print flyer generated successfully!');
}

generateAllQRCodes().catch(err => {
  console.error(err);
  process.exit(1);
});
