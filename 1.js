import fs from 'fs';
import path from 'path';
import Md  from 'markdown-it';


const __dirname = path.resolve();


const encoding = 'utf8';
const header = file_get_contents(__dirname+'/website/header.html');
const footer = file_get_contents(__dirname+'/website/footer.html');
const md = new Md();

main(__dirname+'/command');
/*
let filesList = create_detail(__dirname+'/command');
fs.readFile('./1.md', 'utf8' , (err, data) => {
	create_home();
	return;
  if (err) {
    console.error(err)
    return
  }
  
  let md = new Md();
  let content = md.render(data);
  fs.writeFile('./1.txt', content, err => {
	  if (err) {
		console.error(err)
		return
	  }
	  //文件写入成功。
	  console.log('write--ok');
	})
  
  console.log(data)
})


fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //文件写入成功。
})
*/

function main(dir,filesList = []){
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            main(path.join(dir, item), filesList);  //递归读取文件
        } else {                
            filesList.push(fullPath); 
			//console.log(item);
			//console.log(path.basename(item,'.md'));
			//var fileName = basename(file,extension); // 获取没有后缀的文件名
			
			let markdown = file_get_contents(fullPath);
			
			create_detail(path.basename(item,'.md'),markdown);
        }        
    });
    return filesList;
}



function create_detail(commond,markdown){
	/*此处可以做一些优化，实现seo，关键字之类的*/
	let contents = md.render(markdown);
	
	console.log(contents);
	/*
	contents = '<main id="ui-main">'+contents+'</main>';
	let html = header + contents + footer;
	
	file_put_contents(__dirname+"/html/"+commond+'.html',html);
	*/
}


function create_home(){
	
}


function file_get_contents(file_path){
	console.log(file_path);
	let contents = fs.readFileSync(file_path,encoding)
	
	return contents;
}

function file_put_contents(file_path,content){
	let options = {encoding:encoding};
	console.log(options);
	let result = fs.writeFileSync(file_path, content,options);
	return result;
}


