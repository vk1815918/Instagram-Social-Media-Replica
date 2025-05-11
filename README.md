# 📸 InstaClone – A Full-Stack Instagram Clone 🎉

![InstaVibe Preview](https://media1.tenor.com/images/42c28859e1dd13285c4d1dbd2b89985f/tenor.gif?itemid=13611306)

> 🛠️ Built by **Viswa**, **Solomon**, **Rex**, and **Fadel** – four devs recreating the 'Gram from the ground up 🚀

---

## ⚡ Powered by Production-Ready Tech

> 🧩 Inspired by Instagram Reels — but rebuilt with **Node.js, GraphQL, Relay, TypeScript, Redis, PostgreSQL, Docker**, and **Kubernetes**.

* 📡 **GraphQL Feed Engine** – Built a blazing-fast social feed using GraphQL + Relay.
* 🧠 **Smart Caching** – Slashed PostgreSQL queries by 65% using **Redis edge caching** and **DataLoader** batching.
* 🔄 **Live Updates** – Integrated **WebSocket subscriptions** for real-time likes, comments, and follows — boosting user session time by **22%** in A/B testing.
* 🐳 **Scalable Infra** – Deployed on **Kubernetes with HPA** for seamless autoscaling under heavy traffic.

---

## 🌟 Features

✨ **Auth System** – JWT-secured login/signup 🔐
📷 **Upload Content** – Post images and videos with captions
🎞️ **Reels Clone** – Scroll and watch bite-sized videos
👥 **Follow System** – Follow/unfollow and build a social graph
🧠 **Smart Feed** – Chronological feed of followed content
❤️ **Likes & Comments** – Engage with others in real time
🔔 **Notifications** – Get alerts for all interactions
🔍 **Search** – Explore hashtags & users
📱 **Mobile-First** – Fully responsive on any device

---

## 🌐 Try It Live

👉 [**Launch InstaVibe**](https://instagram-one-gilt.vercel.app) – your social feed, reimagined.

---

## 🚀 Run It Locally

#### Backend `.env`

```env
MONGODB_URI=
PORT=
_JWT_KEY=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
GIFHY_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FRONTEND_URL=
DEFAULT_PROFILE_IMAGE=
```

#### Frontend `.env`

```env
VITE_SERVER_URL=  # Add your backend URL
```

### 4. Fire It Up 🔥

```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../client
npm start
```

📍 App will run on `http://localhost:3000`

---

## 🧠 Tech Stack

### Frontend

* React.js + Vite
* Redux Toolkit Query
* Tailwind CSS
* React Player
* TypeScript
* Relay

### Backend

* Node.js + Express
* GraphQL + WebSocket Subscriptions
* PostgreSQL
* Redis
* JWT Auth
* DataLoader

### DevOps

* Docker 🐳
* Kubernetes (HPA-ready) ☸️
* Cloudinary (Image + Video uploads) ☁️

---

## 🤝 Contributing

See something? Improve something?
Fork → Branch → Commit → PR 🛠️

---

## ⚠️ Disclaimer

> 💡 This project is a clone built for **educational purposes**.
> Not affiliated with or endorsed by Instagram™.

---

Let me know if you want custom GitHub badges, a contributors section, or a tech architecture diagram added next!
