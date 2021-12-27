module.exports = {
    // 博客首页标题
    title: 'WW\'s blog',
    // 博客首页介绍
    description: '小万的学习日记',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {
            rel: 'icon',
            // 这里读取的是公共路径下的文件，及.vuepress/public下的文件
            href: '/assets/images/favicon.ico',
        }], // 增加一个自定义的 favicon(网页标签的图标)
        // 实现PWA
        // ['link', {
        //     rel: 'manifest',
        //     href: '/photo.jpg'
        // }],
        // ['link', {
        //     rel: 'apple-touch-icon',
        //     href: '/photo.jpg'
        // }],
    ],
    serviceWorker: true, // 是否开启PWA
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            {
                text: '前端基础',
                link: '/accumulate/'
            },
            {
                text: '算法题库',
                link: '/algorithm/'
            },
            {
                text: '实习日记',
                link: '/internship/'
            },
            {
                text: '面试总结',
                link: '/interview/accumulates/html'
            },
            {
                text: 'gitgub',
                link: 'https://github.com/Elvira-wan'
            }
        ],
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级, 最大会显示到h3标题
        sidebar: {
            // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
            // 基础知识部分
            '/accumulate/': [
                ['/accumulate/', '前端基础'], // accumulate文件夹的README.md 不是下拉框形式
                // 若想将页面的标题设置为其他文字也可以使用一个数组定义
                // ['/path', 'tltle']
                {
                    title: '前端三剑客',
                    children: [
                        // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                        // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
                        '/accumulate/base/HTML5', // 以docs为根目录来查找文件 
                        '/accumulate/base/CSS3',
                        {
                            title: 'JS相关概念',
                            children: [
                                '/accumulate/base/JS_base/JS',
                                '/accumulate/base/JS_base/objectOriented',
                                '/accumulate/base/JS_base/DOM',
                                '/accumulate/base/JS_base/BOM',
                                '/accumulate/base/JS_base/ES6',
                                '/accumulate/base/JS_base/regExp',
                            ]
                        },
                    ]
                },
                {
                    title: '前后端交互',
                    children: [
                        '/accumulate/network/computerNetwork',
                        '/accumulate/network/AJAX',
                        '/accumulate/network/cookie',
                    ]
                },
                {
                    title: '主流框架',
                    children: [
                        '/accumulate/frame/react',
                        '/accumulate/frame/vue',
                    ]
                },
                {
                    title: '进阶部分',
                    sidebarDepth: 3, // 侧边栏显示2级, 最大会显示到h3标题
                    children: [
                        '/accumulate/advanced/typeScript',
                        '/accumulate/advanced/webpack',
                    ]
                }
            ],
            // 算法部分
            '/algorithm/': [
                ['/algorithm/', '算法基础知识'],
                ['/algorithm/sort', '十种排序'],
                {
                    title: 'leetCode题库',
                    path: '/algorithm/leetcode'
                },
            ],
            // 实习日记————小万的答辩专题
            '/internship/': [
                '/internship/',
                {
                    title: '实习积累',
                    children: [
                        '/internship/accumulate/git',
                        '/internship/accumulate/linux',
                        '/internship/accumulate/npm_yarn',
                        '/internship/accumulate/nginx',
                        '/internship/accumulate/apollo',
                    ]
                },
                ['/internship/error/error', '错误集锦']
            ],
            // 面试复盘总结
            '/interview/': [{
                    title: '基础原理积累',
                    children: [
                        ['/interview/accumulates/html', 'HTML'],
                        ['/interview/accumulates/css', 'CSS'],
                        ['/interview/accumulates/js', 'JavaScript'],
                        ['/interview/accumulates/optimize', '前端性能优化'],
                        ['/interview/accumulates/react', 'React'],
                        ['/interview/accumulates/computerNetwork', '计算机网络'],
                        ['/interview/accumulates/webpack', 'Webpack'],
                        ['/interview/accumulates/ajax', 'AJAX'],
                        ['/interview/accumulates/nodeJS', 'NodeJS'],
                        ['/interview/accumulates/computerBasic', '计算机基础'],
                        ['/interview/accumulates/func', '一些需要手写的函数']
                    ]
                },
                ['/interview/summarize', '秋招复盘'],
            ]
        },
        lastUpdated: 'Last Updated'
    },
    plugins: [
        // 百度检索插件——有助于SEO
        'vuepress-plugin-baidu-autopush',
        // 代码复制
        ['vuepress-plugin-code-copy', true],
        // 评论功能
        ['@vssue/vuepress-plugin-vssue', {
            platform: 'github',
            // 其他的 Vssue 配置
            // Github repository 的 URL 模式为 https://github.com/${owner}/${repo}
            owner: 'Elvira-wan',
            repo: 'WW_Blog_Comment',
            clientId: 'f393b085588ebc569054',
            clientSecret: 'c4ee548b4f8022ba58834cb52d9855234e0d2488',
            autoCreateIssue: true,  // 自动创建评论
        }]
    ],
}