const MongoClient = require('mongodb').MongoClient;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const uri = 'mongodb://127.0.0.1:27017';
const db = 'cooker';
const client = new MongoClient(uri, { useUnifiedTopology: true });

const util = require('util');
const question = util.promisify(readline.question).bind(readline);

(async function () {
    try {
        const answer = await question('What action would you like to perform \n (add, menu)');
        switch (answer) {
            case 'menu':
                readline.question(`What would you like to cook?:`, (search) => {
                    recipe_search(search);
                    readline.close()
                })
                break;
            case 'add':
                let name = await question(`What is the name of the recipe? :`)
                let description = await question(`What is the name of the recipe? :`)
                add_recipe(name, description)
                break;
                default :
                console.error(`Unknown action`)
                
                break;

        }
    } catch (err) {
        console.error('Question rejected', err);
    }
    return true; 
}
)();


// readline.question(`What action would you like to perform \n (add, cook):`, (s) => { search = s.toLowerCase(); console.log(search); readline.close(); })
// readline.close();




const add_recipe = async (name, description) => {
    let query = {
        'title' : name,
        'description' : description
    }
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection('recipes');
        await collection.insertOne(query, (err, result) => {
            if(err){
                console.error(err);
                return false;
            }
            console.log(`${name} successfully added to ${collection}`)
            return true;
        })
        
        // await client.close();

    }
    catch(err) {
        console.error(err)
    }
}
const recipe_search = (search) => {
    

    (async function () {
        

        try {
            await client.connect();

            const database = client.db(db);

            const collection = database.collection('recipes');

            const query = {
                'title': {
                    '$regex': search,
                    '$options': 'i',
                },
            };

            const recipes = collection.find(query).sort(['title', 1]);

            console.clear();

            console.log("-------------------------------");
            console.log(`Searching for ... "${search}"`);
            console.log("-------------------------------");
            console.log("")
            console.log("We found the following recipes:\n")

            // iterate over the cursor
            const recipe = [];
            while (await recipes.hasNext()) {
                 recipe.push(  await recipes.next());
            }
            display_recipe(recipe);

        } catch (err) {
            console.log(err.stack);
        }

        await client.close();
    })();
};

const display_recipe = (recipe) => {
    let newrecipe = []
    recipe.forEach((e) => {
        newrecipe.push({ 'title': e.title, 'description': e.description || e.desc })
    })
    // const total_time = recipe["prep_time"] + recipe["cook_time"];
    
    console.table(newrecipe);
    // console.log(`DESCRIPTION: ${recipe.desc}` + '\n');
    // console.log(`This recipe will take about ${total_time} minutes and be ~${recipe.calories_per_serving} calories per serving.` + '\n');

};
