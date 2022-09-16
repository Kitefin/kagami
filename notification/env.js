// create this function just for getting env variables
// you need to create 'Envs' table in your Moralis database
async function getEnv(key){
    let query = new Moralis.Query("Envs");
    query.equalTo("Key", key);
    let results = await query.find();
    return results[0].get("Value");
}