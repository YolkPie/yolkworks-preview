webpackJsonp([60],{121:/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/boilerplates/custom/react-blocks-EntryCard/index.css ***!
  \********************************************************************************************//*! dynamic exports provided *//*! all exports used */function(a){a.exports="import React from 'react';\nimport IceContainer from '@icedesign/container';\nimport styles from './index.module.scss';\nconst list = [\n  {\n    title: '\u5E16\u5B50',\n    img: '//gw.alicdn.com/tfscom/TB1OyT.RVXXXXcpXXXXXXXXXXXX.png',\n    url: '//www.taobao.com',\n  },\n  {\n    title: '\u5B9D\u8D1D\u6E05\u5355',\n    img: '//img.alicdn.com/tfs/TB1g6cGRFXXXXa9XXXXXXXXXXXX-140-140.png',\n    url: '//www.taobao.com',\n  },\n  {\n    title: '\u56FE\u7247',\n    img: '//img.alicdn.com/tfs/TB1hJ7dRFXXXXcgXFXXXXXXXXXX-140-140.png',\n    url: '//www.taobao.com',\n  },\n  {\n    title: '\u4E0A\u65B0',\n    img: '//img.alicdn.com/tfs/TB196v1RFXXXXb6aXXXXXXXXXXX-140-140.png',\n    url: '//www.taobao.com',\n  },\n  {\n    title: '\u77ED\u89C6\u9891',\n    img: '//gw.alicdn.com/tfscom/TB1toY.RVXXXXcuXXXXXXXXXXXX.png',\n    url: '//www.taobao.com',\n  },\n  {\n    title: '\u77ED\u89C6\u9891',\n    img: '//gw.alicdn.com/tfscom/TB1toY.RVXXXXcuXXXXXXXXXXXX.png',\n    url: '//www.taobao.com',\n  },\n];\nexport default function EntryCard() {\n  return (\n    <IceContainer\n      className={styles.nl}\n    >\n      {list.map((item, index) => {\n        return (\n          <div key={index} className={styles.item}>\n            <a href={item.url} className={styles.link} target=\"_blank\" rel=\"noopener noreferrer\">\n              <img src={item.img} className={styles.cover} alt={item.title} />\n              <div className={styles.title}>{item.title}</div>\n            </a>\n          </div>\n        );\n      })}\n    </IceContainer>\n  );\n}\n"}});