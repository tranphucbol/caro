# Hướng dẫn triển khai ứng dụng

## Yêu cầu

- Redis
- MongoDB

## Front-end

```bash
sudo yarn install
sudo yarn start
```

## Back-end

- Thêm file config `.env` vào trong `./back-end`

```txt
JWT_SECRET ='zalopay-fresher-caro'

# Mongo DB
# Local development
MONGODB_URI='mongodb://127.0.0.1:27017/caro'

# Port
PORT=3001
```

```bash
node index
```
