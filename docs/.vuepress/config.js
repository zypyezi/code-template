module.exports = {
    title: '方法小仓库',
    description: '收集记录了一些常用的方法',
    base: '/code-template/',
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
      nav:[
        { text: '首页', link: '/' },
        { text: '方法文档', link: '/method'},
        { text: 'github', link: '/github' }, 
        { text: '知识点文档', link: '/pages' },
      ],
      displayAllHeaders: true,
      sidebar:{
        '/method/': [
            {
              title: '文件相关方法',   // 必要的
              path : '/method/fileMethod',
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 2,    // 可选的, 默认值是 1
            },
            {
              title: '校验相关方法',   // 必要的
              path : '/method/validate',
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 2,    // 可选的, 默认值是 1
            },
            {
              title: '格式化相关方法',   // 必要的
              path : '/method/format',
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 2,    // 可选的, 默认值是 1
            },
            {
              title: 'http相关方法',   // 必要的
              path : '/method/http',
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 2,    // 可选的, 默认值是 1
            },
            {
              title: '项目中遇到过小需求实现方法',
              path: '/method/util',
              collapsable: true,
              sidebarDepth: 2
            },
            {
              title: '常见方法函数',
              path: '/method/common',
              collapsable: true,
              sidebarDepth: 2
            }
          ]
      },
      lastUpdated: 'Last Updated' // 文档更新时间：每个文件git最后提交的时间
    }
  }