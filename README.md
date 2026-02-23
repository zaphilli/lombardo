# Dr. Gregg Lombardo — Website

**Oral & Maxillofacial Surgery · Wilmington, NC**

---

## Project Structure

```
lombardo-site/
├── public/                  ← All frontend files (served statically)
│   ├── index.html           ← Main website
│   ├── referring-doctors.html  ← Referring doctors landing page
│   ├── css/
│   │   ├── main.css         ← Shared styles
│   │   └── referring.css    ← Referring page styles
│   └── js/
│       └── main.js          ← Nav scroll + contact form JS
├── server/
│   └── index.js             ← Node.js/Express backend
├── .env.example             ← Environment variable template
├── .gitignore
└── package.json
```

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Then open .env and fill in your SMTP credentials
```

### 3. Start the server
```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

The site will be live at **http://localhost:3000**

---

## Deployment Options

### Option A — Render (Recommended, Free Tier Available)

1. Push this project to a GitHub repository
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables in the Render dashboard (Settings → Environment):
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `OFFICE_EMAIL`
6. Deploy — Render provides a free `.onrender.com` URL or you can attach a custom domain

---

### Option B — Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Select your repo
4. Add environment variables in the Railway dashboard
5. Railway auto-detects Node.js and deploys automatically

---

### Option C — DigitalOcean App Platform

1. Push to GitHub
2. Go to DigitalOcean → **Apps → Create App**
3. Connect GitHub repo
4. Set run command: `npm start`
5. Add environment variables
6. Choose a plan (Basic starts at ~$5/month)

---

### Option D — Traditional VPS (DigitalOcean Droplet, Linode, etc.)

```bash
# On your server:
git clone <your-repo-url> /var/www/lombardo-site
cd /var/www/lombardo-site
npm install
cp .env.example .env
nano .env   # Fill in your credentials

# Install PM2 to keep the app running
npm install -g pm2
pm2 start server/index.js --name lombardo-site
pm2 startup   # Enable auto-start on server reboot
pm2 save

# Set up Nginx as a reverse proxy (optional but recommended)
# /etc/nginx/sites-available/lombardo
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Setting Up Email (Contact Form)

The contact form sends emails via SMTP. Two recommended options:

### Gmail (easiest for small offices)
1. Go to your Google Account → Security → 2-Step Verification (enable it)
2. Then go to **App Passwords** → generate one for "Mail"
3. Use these settings in `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=youroffice@gmail.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx   ← the App Password
   OFFICE_EMAIL=info@drgregglombardo.com
   ```

### SendGrid (recommended for reliability)
1. Create a free account at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Use these settings:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   OFFICE_EMAIL=info@drgregglombardo.com
   ```

---

## Custom Domain

Once deployed on any platform, point your domain's DNS to the server:
- **A Record:** `@` → your server's IP address
- **CNAME:** `www` → your root domain or platform-provided URL

For SSL (HTTPS), Render/Railway handle this automatically. On a VPS, use [Let's Encrypt](https://letsencrypt.org) with Certbot.

---

## Adding a Real Photo of Dr. Lombardo

Replace the placeholder in the hero section:

1. Add a photo file (e.g., `dr-lombardo.jpg`) to `public/` 
2. In `index.html`, find `.hero-img-placeholder` and replace with:
   ```html
   <img src="dr-lombardo.jpg" alt="Dr. Gregg Lombardo" class="hero-photo">
   ```
3. In `main.css`, add:
   ```css
   .hero-photo {
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: top center;
   }
   ```
# Lombardo
