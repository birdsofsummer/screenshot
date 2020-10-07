import { 
    ensureDir, 
//  ensureDirSync,
} from "https://deno.land/std/fs/mod.ts";


const md=async (file_path="/tmp/a/b/c")=>{
        await ensureDir(file_path)
}


//console.log(123)
