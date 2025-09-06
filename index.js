const express = require("express");
const { Worker } = require("worker_threads");
const app = express();

const THREAD_COUNT = 4;

app.get("/none_blocking", async (req, res) => {
  res.status(200).send("Hello World from node");
});

// app.get("/blocking",async(req,res)=>{

//     const worker = new Worker("./workers.js")
//      worker.on("message",(data)=>{
//         console.log(data)
//        res.status(200).send(`Counter is ${data}`)
//      })
//      worker.on("error",(error)=>{
//        res.status(200).send(`Here is errors ${error}`)
//      })
// })

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./workers.js", {
      workerData: { thread_count: THREAD_COUNT },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(error);
    });
  });
}
app.get("/blocking", async (req, res) => {
  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }
  const workerResults = await Promise.all(workerPromises);
  const data = workerResults.reduce((a, b) => a + b, 0);
  res.status(200).send(`Counter is ${data}`);
});

app.listen(8000, () => {
  console.log("server running on port 8000");
});
