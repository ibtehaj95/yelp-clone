#### Setup

```bash
npm install
bash scripts/start.sh
```

#### Database Connection and .env Setup

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
* Set the MongoDB connection string with MONGO_URI,
* Set the JWT_SECRET as a 256-bit string (encryption key) from https://acte.ltd/utils/randomkeygen,
* Set the JWT_LIFETIME as 30d, or some other appropriate value