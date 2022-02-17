import fs from 'fs';
import path from 'path';

import config from './config.js';


const encoding="utf8",__dirname = path.resolve();
	let commands = file_get_contents('./commands.json');
commands = JSON.parse(commands);


//let commands = JSON.parse(contents);
console.log(config);
console.log(commands);


const header = file_get_contents(__dirname+'/website/header.html');
const footer = file_get_contents(__dirname+'/website/footer.html');
create_home(commands,config);
function create_home(commands,config){
	let contents = '<div id="primary" class="sidebar-right clearfix"><div class="ht-container"><section id="content" role="main"><div id="homepage-categories" class="clearfix">';
	for(let group in commands){
        contents += '<div class="row"><h2> <a href="" title="">'+config[group]+'</a></h2><ul class="category-posts">';
		
		for(let command in commands[group]){
			contents += '<li class="format-standard"><a href="/commands'+commands[group][command]["path"]+'.html">'+commands[group][command]["name"]+'--'+commands[group][command]["desc"]+'</a></li>';
		}
        contents += '</ul></div>';
	}
	contents += '</div></section></div></div>';
	let html = header + contents + footer;
	file_put_contents(__dirname+"/docs/index.html",html);
}


function file_get_contents(file_path){
	console.log(file_path);
	let contents = fs.readFileSync(file_path,encoding)
	
	return contents;
}

function file_put_contents(file_path,content){
	let options = {encoding:encoding};
	let result = fs.writeFileSync(file_path, content,options);
	return result;
}


