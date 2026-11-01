# Minimal Video Editor Portfolio

A responsive, static portfolio website for a freelance Instagram Reels editor.

## Files
- `index.html` — page structure and copy
- `styles.css` — responsive minimal visual design
- `script.js` — brand and WhatsApp settings, mobile navigation, video placeholder handling
- `assets/videos/` — place your real MP4 demo reels here
- `assets/images/` — editable SVG poster placeholders

## Before publishing
1. Open `script.js`.
2. Replace `"[Your Brand Name]"` with your confirmed brand name.
3. Replace `REPLACE_WITH_YOUR_WHATSAPP_NUMBER` with your WhatsApp number in international format, digits only (for India, start with `91`; do not include `+` or spaces).
4. Add your actual video files using these names, or update the source paths in `index.html`:
   - `assets/videos/product-reel.mp4`
   - `assets/videos/talking-head-reel.mp4`
   - `assets/videos/lifestyle-reel.mp4`
5. Edit the copy and pricing if your deliverables change. Do not present the placeholder visuals as real client work.
6. Test on mobile and desktop before sharing with clients.

## Run locally
You can open `index.html` in a browser. For a local server, from this folder run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Deploy to Vercel
### Option A: Git repository (recommended)
1. Create a GitHub repository and upload the contents of this folder.
2. In Vercel, select **Add New → Project** and import the repository.
3. Framework preset: **Other**. Build command: leave blank. Output directory: leave blank / root.
4. Deploy. The site is static and requires no environment variables or build step.
5. After each edit, commit and push to redeploy.

### Option B: Vercel CLI
Install Node.js and Vercel CLI, sign in, then run from this directory:
```bash
vercel
```
Follow the prompts. For production deployment, run:
```bash
vercel --prod
```

## Honest-claims checklist
- The demo designs in the hero and portfolio cards are decorative placeholders, not real client results.
- Only add projects you created or have permission to show.
- The performance report is based on statistics the client supplies; it does not imply guaranteed growth.
- Paid ad spend, account management, and posting are not included unless separately agreed.
