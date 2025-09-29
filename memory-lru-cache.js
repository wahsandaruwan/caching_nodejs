// Memory caching with LRU

const {LRUCache} = require("lru-cache");

const options = {
    max: 5,
    ttl: 1000 * 60
}

const cache = new LRUCache(options);

function memoryCacheSet(key, value){
    cache.set(key, value);
}

function memoryCacheGet(key){
    return cache.get(key);
}

// Example usage
memoryCacheSet("user:1", {id: 1, name: "John"});
memoryCacheSet("user:2", {id: 2, name: "Alice"});

console.log("user:1 from cache : ", memoryCacheGet("user:1"));
console.log("user:2 from cache:", memoryCacheGet("user:2"));

// Simulate cache eviction
for(let i = 3; i <= 8; i++){
    memoryCacheSet("user:" + i, {id: i, name: "User" + i});
}

console.log("user:1 after cache is full : ", memoryCacheGet("user:1"));
console.log("user:2 after cache is full : ", memoryCacheGet("user:2"));
console.log("user:3 after cache is full : ", memoryCacheGet("user:3"));
console.log("user:4 after cache is full : ", memoryCacheGet("user:4"));
