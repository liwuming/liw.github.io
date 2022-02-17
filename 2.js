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


const reg = /^---\s*?([a-z][\s\S]*?)\s*?---.*?/mi;
let contents = file_get_contents(__dirname+'/1.md');

let result = contents.match(reg);
let obj = yaml.load(result[1]);
console.log(obj.command);
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


