// Disk caching with Cache aside

const storage = require("node-persist");

(async () => {
    // Initialize the cache storage
    await storage.init(
        {
            dir: "diskcache",
            ttl: 1000 * 60 * 5
        }
    );

    // Simulate expensive fetch
    async function fetchExpensiveData(key){
        await new Promise(r => setTimeout(r, 200));
        console.log("Fetched from source : ", key);
        return { key, value: "Expensive result for " + key};
    }

    // Cache aside strategy
    async function getCachedData(key){
        const result = await storage.getItem(key);
        if(result){
            console.log("Served from disk cache : ", key);
            return result;
        }
        const data = await fetchExpensiveData(key);
        await storage.setItem(key, data);
        return data;
    }

    let dt = null;
    dt = await getCachedData("item1");
    console.log(dt);
    dt = await getCachedData("item1");
    console.log(dt);
})();