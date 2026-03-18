# Miss Wong 黃老師 — HKDSE Genre Guide Bot

WorkAdventure Custom Script bot + exercise page for teaching HKDSE Paper 2 Writing genres.

## What this does

A student walks up to Miss Wong's avatar in WorkAdventure. She greets them, opens an interactive exercise page, and teaches genre awareness through three activities: genre selection with guided deconstruction, timed flash recognition drills, and free-form chat. All responses powered by Claude.

## Repo structure

```
src/main.ts          → Bot script (TypeScript, compiles to dist/bot.js)
genre-guide.html     → Exercise page (standalone, self-contained)
prompts/             → System prompts for both bots
vite.config.ts       → Build config
.github/workflows/   → Auto-deploy to GitHub Pages on push
```

## Deployment — Step by Step

### Step 1: Create GitHub repo

```bash
cd bot-genre-guide
git init
git add .
git commit -m "Initial commit: Miss Wong Genre Guide bot"
```

Create a new repo on GitHub (e.g., `hkdse-genre-guide`), then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/hkdse-genre-guide.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

In your repo → Settings → Pages:
- Source: **GitHub Actions**

The workflow will auto-deploy on every push to main. After first push, your files will be at:
- `https://YOUR-USERNAME.github.io/hkdse-genre-guide/bot.js`
- `https://YOUR-USERNAME.github.io/hkdse-genre-guide/genre-guide.html`

### Step 3: Update the exercise page URL in the bot

In `src/main.ts`, the bot reads the exercise URL from hash parameters. You'll set this in the WorkAdventure dashboard (Step 5). No code change needed if you use hash params.

### Step 4: Get your Anthropic API key

Go to https://console.anthropic.com/keys and create a key. You'll pass this to the bot via WorkAdventure's hash parameters (never committed to code).

### Step 5: Register the bot in WorkAdventure

1. Log into https://workadventu.re
2. Go to your World → Bots
3. Add a new Custom Script bot
4. Set the script URL to:
   ```
   https://YOUR-USERNAME.github.io/hkdse-genre-guide/bot.js#anthropicKey=sk-ant-YOUR-KEY&exerciseUrl=https://YOUR-USERNAME.github.io/hkdse-genre-guide/genre-guide.html
   ```
5. Give the bot a name ("Miss Wong") and an avatar
6. Assign it to your map

### Step 6: Build a map (minimal)

You need a map with at least one walkable area where the bot stands. Options:
- Use the WorkAdventure inline editor (quickest)
- Use the map starter kit with Tiled
- Even a default office map works for testing

The bot activates when any player enters its proximity bubble. No special zones needed.

### Step 7: Test

1. Open your WorkAdventure room
2. Walk up to the bot
3. You should see Miss Wong's greeting in chat
4. The exercise page should open as an overlay
5. Pick a genre, answer questions, get Claude's feedback

## Local development

To test the HTML page without WorkAdventure:

```bash
# Just open the file directly
open genre-guide.html?mode=menu&studentId=test

# Or serve it
npx serve . -p 8080
```

The page has a `safeBroadcast()` wrapper that catches WA API errors gracefully — it'll log to console instead of crashing when running outside WorkAdventure.

To compile the bot script:

```bash
npm install
npm run build   # → dist/bot.js
```

## How the communication works

```
Student walks up → Bot (proximity bubble) → Greeting in chat
                                          → Opens iframe (genre-guide.html)

Student clicks genre → Page: WA.event.broadcast("genre-selected", data)
                     → Bot: WA.event.on("genre-selected").subscribe(...)
                     → Bot: fetch() to Claude API
                     → Bot: WA.chat.sendChatMessage(response)
                     → Bot: WA.event.broadcast("genre-feedback", data)
                     → Page: WA.event.on("genre-feedback").subscribe(...)
                     → Page: shows feedback panel
```

Both the bot and the iframe share the same event bus via `WA.event`. The iframe needs `allowApi: true` to access it.

## Costs

- WorkAdventure free tier: 1 bot, €10/month credit
- Bot hosting: ~€0.56/day (whether active or not)
- Claude API: your own key, ~$0.003 per student interaction
- GitHub Pages: free
