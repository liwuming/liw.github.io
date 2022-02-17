import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';
import Md  from 'markdown-it';
import MtC from "markdown-it-container";
import MtI from "markdown-it-imsize";
import MtF from "markdown-it-implicit-figures";

import Prism from "prismjs";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-php.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-sql.js";



const __dirname = path.resolve();
const reg = /^---\s*?([a-z][\s\S]*?)\s*?---.*?/mi;

const encoding = 'utf8',md_options= {
	html: false,
	xhtmlOut: false,
	linkify: true,
	typography: true,
	typographer: false,
	breaks: true,
	highlight: function (code, lang) {
	  let language = "";
	  switch (lang.toLowerCase()) {
		case "html":
		case "markdown":
		case "xml":
		  language = "markup";
		  break;
		case "css":
		  language = "css";
		  break;
		case "js":
		case "json":
		case "javascript":
		  language = "javascript";
		  break;
		case "sql":
		case "php":
		case "java":
		case "python":
		case "go":
		case "bash":
		case "docker":
		  language = lang.toLowerCase();
		  break;
		default:
		  language = lang.toLowerCase();
		  break;
	  }

	  if (
		language.length > 0 &&
		Object.keys(Prism.languages).includes(language)
	  ) {
		let tmp = Prism.highlight(
		  code,
		  Prism.languages[language],
		  language
		);
		console.log(tmp);

		let tmp_code = Prism.highlight(
		  code,
		  Prism.languages[language],
		  language
		);

		let rows = code.split("\n").length;
		var line_content = "";
		for (let i = 0; i < rows - 1; i++) {
		  line_content += '<p class="row-number"></p>';
		}
		line_content =
		  '<div class="line-numbers-rows">' + line_content + "</div>";
		return `<pre class="line-numbers">${line_content}<code class="language-${language}">${tmp_code}</code></pre>`;
	  }
	},
  };
	  
	  
const commands = {};
const header = file_get_contents(__dirname+'/website/header.html');
const footer = file_get_contents(__dirname+'/website/footer.html');
const md = new Md(md_options).use(MtI).use(MtF).use(MtC, "success", {
  validate: function (params) {
	return params.trim() === "success";
  },
  render: (tokens, idx) => {
	if (tokens[idx].nesting === 1) {
	  return `<blockquote class="ui-success-section">`;
	} else {
	  return "</blockquote>";
	}
  },
}).use(MtC, "info", {
	validate: function (params) {
		return params.trim() === "info";
	},
	render: (tokens, idx) => {
		if (tokens[idx].nesting === 1) {
		  return `<blockquote class="ui-info-section">`;
		} else {
		  return "</blockquote>";
		}
	  },
}).use(MtC, "warning", {
	  validate: function (params) {
		return params.trim() === "warning";
	  },
	  render: (tokens, idx) => {
		if (tokens[idx].nesting === 1) {
		  return `<blockquote class="ui-warning-section">`;
		} else {
		  return "</blockquote>";
		}
	  },
}).use(MtC, "error", {
  validate: function (params) {
	return params.trim() === "error";
  },
  render: (tokens, idx) => {
	if (tokens[idx].nesting === 1) {
	  return `<blockquote class="ui-error-section">`;
	} else {
	  return "</blockquote>";
	}
  },
});

main(__dirname+'/command');

file_put_contents('./commands.json',JSON.stringify(commands));
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
			//console.log(path.basename(dir));
			//console.log(item);
			//console.log(path.basename(item,'.md'));
			//var fileName = basename(file,extension); // 获取没有后缀的文件名
			
			create_detail(path.basename(dir),fullPath);
        }        
    });
    return filesList;
}



function create_detail(dirname,filepath){
	/*此处可以做一些优化，实现seo，关键字之类的*/
	let markdown = file_get_contents(filepath);
	
	//let contents = file_get_contents(__dirname+'/1.md');
	let result = markdown.match(reg);
	
	
	console.log(result);
	if(result && result.length>0){
		let obj = yaml.load(result[1]);
		if(!commands.hasOwnProperty(dirname)){
			commands[dirname] = {};
		}
		/*
		commands[dirname][obj.commond]['name'] = obj.command;
		commands[dirname][obj.commond]['path'] = "/"+obj.command;
		commands[dirname][obj.commond]['desc'] = obj["command-desc"];
		*/commands[dirname][obj.command] = {
			"name":obj.command,
			"path":"/commands/"+obj.command,
			"desc":obj["command-desc"]
		};
		
		
		let contents = md.render(markdown);
		contents = '<main id="ui-main">'+contents+'</main>';
		let html = header + contents + footer;
		file_put_contents(__dirname+"/docs/commands/"+obj.command+'.html',html);
		
	}else{
		console.error('yaml解析错误,或许格式错误,或许缺少command/command-desc');
	}
}


function create_home(commands){
	
	
	
	
	//contents = '<main id="ui-main">'+contents+'</main>';
	//let html = header + contents + footer;
	//file_put_contents(__dirname+"/docs/index.html',html);
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


