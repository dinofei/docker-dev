## 安装redis-exporter

tar -xf redis_exporter-1.13.1.tar.gz -C /www/goproject/src
cd /www/goproject/src/redis_exporter-1.13.1
go build

分别启动监听不同的端口 监听多个实例：
nohup ./redis_exporter --redis.addr="redis://192.168.109.215:6380" --redis.password="" --web.listen-address="0.0.0.0:9121" &


nohup ./redis_exporter --redis.addr="redis://172.16.18.6:6379" --redis.password="" --web.listen-address="0.0.0.0:9122" &