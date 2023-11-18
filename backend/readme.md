#### Setup

```bash
npm install
bash scripts/start.sh
```

#### Database Connection and .env Setup

1. Modify the .env.template file by adding your postgres connection parameters
* Set the JWT_SECRET as a 256-bit string (encryption key) from https://acte.ltd/utils/randomkeygen,
* Set the JWT_LIFETIME as 30d, or some other appropriate value