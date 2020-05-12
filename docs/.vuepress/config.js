module.exports = {
    title: '',
    description: '',
    base: '/code-template/',
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
      nav:[
        { text: '', link: '/algorithm/' },
        { text: 'github', link: '2' }, 
        { text: '知识点文档', link: '3' },
      ],
      displayAllHeaders: true,
      sidebar:{
        '/method': [
            {
              title: '文件相关方法',   // 必要的
              path : '/method/fileMethod',
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 2,    // 可选的, 默认值是 1
            }
          ]
      },
      lastUpdated: 'Last Updated' // 文档更新时间：每个文件git最后提交的时间
    }
  }