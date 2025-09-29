// Disk caching with cache aside

const storage = require("node-persist");

(async () => {
    await storage.init({
        dir: "diskcache",
        ttl: 1000 * 60 * 5
    });

    // Simulate expensive fetch
    async function fetchExpensiveData(key){
        await new Promise(r => setTimeout(r, 200));
        console.log("Fetched from source : ", key);
        return {key, value: "Expensive result for " + key}
    }

    // Cache aside pattern
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

    let x = null;

    x = await getCachedData("item1");
    console.log(x);
    x = await getCachedData("item1");
    console.log(x);
})()