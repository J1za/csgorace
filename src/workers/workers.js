import crashWorker from "./crashWorker"
// import streamWorker from "./streamWorker"

export const crashWorkerInstanse = new Worker(crashWorker)
// export const streamWorkerInstanse = new Worker(streamWorker)
