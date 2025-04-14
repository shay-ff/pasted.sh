import { connectToDatabase } from "./db";
import Snippet from "./model/snippet";

// console.log(connectToDatabase);

(async () => {
  await connectToDatabase();
  const snippets = await Snippet.find();
  // console.log("Snippets:", snippets);
})();
