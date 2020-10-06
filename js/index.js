const moment=require("moment")
const fs=require("fs")
const R=require("ramda")
const path=require("path")
const screenshot = require('desktop-screenshot')

const util=require("util")
const rxjs=require("rxjs")
const {take}=require("rxjs/operators")


const screenshot1=util.promisify(screenshot)


const today=()=>moment().format('YYYY-MM-DD d')
const ymd=()=>moment().format('YYYY-MM-DD').split("-")

//md(["/tmp/","a","b","c"])
const md=R.pipe(
    R.scan((a,b)=>[...a,b],[],R.__),
    R.tail,
    R.map(x=>path.resolve(...x)),
    R.map(x=>fs.existsSync(x) ? console.log("exist",x) : fs.mkdirSync(x))
)

//days in n days
const init_dir=(n=10)=>{
    const days=R.range(1,n).map(x=>(moment()).add(x,"days").format("YYYY:MM:YYYY-MM-DD d").split(":"))
    days.map(([y,m,d])=>md([y,m,d]))
    return days
}


const start_screenshot=async ([y,m,d]=[])=>{
  const config={width: 1920, height: 1080, quality: 120}
  //name=moment().unix()+".png"
  const name=moment().format("YYYYMMDD_hhmmss_x")+".png"
  const name1=path.resolve(y,m,d,name)
  const r=await screenshot1(name1,config )
  console.log(r)
}


const start=(n=3,interval=1000)=>{
  let [y,m,]=ymd()
  let d=today()
  md([y,m,d])
  rxjs
    .interval(interval)
    .pipe(take(n))
    .subscribe(x=>{
        console.log("start sss..%d",x)
        start_screenshot([y,m,d])
    })
}



start()
