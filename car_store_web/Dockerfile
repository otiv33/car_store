FROM node:18.16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN dotnet tool install --global dotnet-ef
# ENV PATH="${PATH}:/root/.dotnet/tools"
# RUN dotnet ef database update --context CarStoreDbContext

COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/car_store_web /usr/share/nginx/html

EXPOSE 4200
