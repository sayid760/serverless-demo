const Redis = require("ioredis");

const redis = {
    // port: 6379,          // Redis port
    // host: '127.0.0.1',   // Redis host
    // // prefix: 'sam:', //存诸前缀
    // // ttl: 82800,  //过期时间  60 * 60 * 23 
    // password: 123,
    // family: 4,
    // db: 0
}

class RedisStore {
    constructor() {
        this.redis = new Redis(redis);
    }

    async get(key) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }

    async set(key, data, { maxAge = 24 * 60 * 60 * 1000 } = {}) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(key, JSON.stringify(data), 'EX', maxAge / 1000);
        } catch (e) { }
        return key;
    }

    async destroy(key) {
        return await this.redis.del(key);
    }
}

module.exports = () => {
    const store = new RedisStore();
    return async (ctx, next) => {
        // 把redis绑定在ctx里
        ctx.redis = store;
        await next();
    }
};
