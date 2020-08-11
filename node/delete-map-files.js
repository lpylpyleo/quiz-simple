const fs = require('fs');
const path = require('path');


/**
 * @description 实现这个方法，能够删除指定文件夹下的所有 `.map` 文件。
 * @param {string} p
 * @return {void}
 */
const deleteMapFiles = (p) => {
  const files = fs.readdirSync(p);
  console.log(`Files under ${p}: ${files}`);

  files.forEach(e => {
    const currentFilePath = path.resolve(p, e);

    fs.stat(currentFilePath, {}, (err, stat) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stat.isDirectory()) {
        deleteMapFiles(currentFilePath);
      }
      else if (stat.isFile() && e.endsWith('.map')) {
        console.log(`Delete ${e}`);
        /**
         * 解除注释后真正删除
         */
        // fs.unlinkSync(currentFilePath);
      }
    });
  });
};

deleteMapFiles(path.resolve(__dirname, 'playground'));

// * ------------------------------------------------

// * playground 文件夹目前的目录结构如下：

/*
playground
├── index.html
├── index.js
├── index.js.map
└── static
    ├── main.js
    ├── main.js.map
    ├── style.css
    └── style.css.map
*/

// * 调用 deleteMapFiles('./playground') ，将删除所有 map 文件
// * 然后文件结构应该如下：

/*
playground
├── index.html
├── index.js
└── static
    ├── main.js
    └── style.css
*/
