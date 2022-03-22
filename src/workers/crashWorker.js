
const workercode = () => {
    let interval = null

    onmessage = function(event) {
        function withdrawHandler(data, postMessage){
            interval = setInterval(() => {
                const time = new Date() - new Date(data.start) - data.latency
                const x =+Math.exp(5e-5 * time).toFixed(2)
                postMessage({ type: 'CRASH/CURRENT_X', payload: +x.toFixed(2) })
            }, 200)
            postMessage({ type: 'CRASH/TIMEOUT', payload: interval})  
        }

        if(event.data.type === 'withdraw'){
            withdrawHandler(event.data.data, postMessage)
        }

        if(event.data.type === 'clear' && interval){
            clearInterval(interval)
        }
    }
}


let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const crashWorker = URL.createObjectURL(blob);

export default crashWorker
  
