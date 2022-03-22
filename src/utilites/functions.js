export function date(date, flag){
    if (date === null){
        return null
    }
    let tempDate
    if(flag === 'd'){
        tempDate = new Date(date)
        let month = tempDate.getMonth() + 1;
        if(month < 10){
            month = '0' + month
        }
        let day = tempDate.getDate()
        if(day < 10){
            day = '0' + day
        }
        return day + '.' + month + '.' + tempDate.getFullYear()
    } else if(flag === 't'){
        tempDate = new Date(date)
        let hour = tempDate.getHours();
        if(hour < 10){
            hour = '0' + hour
        }
        let minute = tempDate.getMinutes()
        if(minute < 10){
            minute = '0' + minute
        }
        return hour + ':' + minute
    } else if(flag === 'h'){
        tempDate = new Date(date)
        let hour = tempDate.getHours()
        if(hour < 10){
            hour = '0' + hour
        }
        return hour
    } else if(flag === 'dt'){
        tempDate = new Date(date)
        let month = tempDate.getMonth() + 1;
        if(month < 10){
            month = '0' + month
        }
        let day = tempDate.getDate()
        if(day < 10){
            day = '0' + day
        }
        let hour = tempDate.getHours();
        if(hour < 10){
            hour = '0' + hour
        }
        let minute = tempDate.getMinutes()
        if(minute < 10){
            minute = '0' + minute
        }
        let seconds = tempDate.getSeconds()
        return day + '.' + month + '.' + tempDate.getFullYear() + ' ' + hour + ':' + minute + ':' + seconds
    } 
}
