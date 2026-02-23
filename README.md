# Dr. Gregg Lombardo — Website (Next.js)

Oral & Maxillofacial Surgery · Wilmington, NC

## Stack
- Next.js (pages router)
- React
- API route for contact form email (`/api/contact`)
- Nodemailer (SMTP)

## Project Structure
```txt
lombardo-site/
├── pages/
│   ├── index.js
│   ├── patients.js
│   ├── referring-doctors.js
│   └── api/
│       └── contact.js
├── public/
│   └── css/
│       ├── main.css
│       ├── patients.css
│       └── referring.css
├── .env.example
├── next.config.js
└── package.json
```

## Local Development
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```
Then set:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `OFFICE_EMAIL`

3. Run dev server:
```bash
npm run dev
```

Open `http://localhost:3000`.

## Production
```bash
npm run build
npm start
```

## Deploy (Vercel recommended)
1. Push to GitHub.
2. Import repo into Vercel.
3. Add the SMTP env vars in Vercel Project Settings.
4. Deploy.

