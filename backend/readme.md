Make sure you have PostgreSQL server running before moving on

#### Database Connection and .env Setup

1. Modify the .env.template file by adding your postgres connection parameters
* Set the JWT_SECRET as a 256-bit string (encryption key) from https://acte.ltd/utils/randomkeygen,
* Set the JWT_LIFETIME as 30d, or some other appropriate value

#### Running the app for the first time

```bash
npm install
```

Please follow the backend/readme.md instructions until npm install if you haven't already.

After that, navigate to the root directory of this repository (yelp-clone)

```bash
bash scripts/start.sh
```

#### Running the app after setting it up

Navigate to the root directory of this repository (yelp-clone)

```bash
bash scripts/start.sh
```