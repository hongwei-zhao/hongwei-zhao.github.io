// Categories page: replace default list with card grid
;(function () {
  function initCategoryCards() {
    // Only run on the categories page
    var pageType = document.querySelector('.page.type-categories')
    if (!pageType) return

    var categoryDiv = document.querySelector('#page .category-lists')
    if (!categoryDiv) return

    var modules = [
      {
        name: 'AI Notes',
        desc: '深度学习、计算机视觉、Transformer 等 AI 研究笔记',
        icon: '/blog/img/cat-ai.png',
        url: '/blog/categories/AI/',
      },
      {
        name: '大模型',
        desc: '大语言模型训练、微调、推理与部署实战',
        icon: '/blog/img/cat-llm.png',
        url: '/blog/categories/%E5%A4%A7%E6%A8%A1%E5%9E%8B/',
      },
      {
        name: '数学',
        desc: '线性代数、概率统计、矩阵理论与最优传输',
        icon: '/blog/img/cat-math.png',
        url: '/blog/categories/%E6%95%B0%E5%AD%A6/',
      },
      {
        name: '编程笔记',
        desc: 'Linux、Git、Shell 等编程工具与语言笔记',
        icon: '/blog/img/cat-code.png',
        url: '/blog/categories/编程/',
      },
      {
        name: '其他',
        desc: '实用工具、环境配置、NAS 与日常技巧',
        icon: '/blog/img/cat-other.png',
        url: '/blog/categories/Others/',
      },
    ]

    // Count articles from the existing category list
    var countMap = {}
    var topItems = categoryDiv.querySelectorAll(':scope > ul > li > a.category-list-link')
    topItems.forEach(function (a) {
      var name = a.textContent.trim()
      var countEl = a.nextElementSibling
      if (countEl && countEl.classList.contains('category-list-count')) {
        countMap[name] = countEl.textContent.trim()
      }
    })

    // Map display names to category keys for count lookup
    var nameToKey = {
      'AI Notes': 'AI',
      大模型: '大模型',
      数学: '数学',
      编程笔记: '编程',
      其他: 'Others',
    }

    // Build card grid HTML
    var html = '<div class="categories-card-grid">'
    modules.forEach(function (m) {
      var key = nameToKey[m.name] || m.name
      var count = countMap[key] || '?'
      html += '<a class="category-card" href="' + m.url + '">'
      html += '<img class="category-card-icon" src="' + m.icon + '" alt="' + m.name + '">'
      html += '<div class="category-card-title">' + m.name + '</div>'
      html += '<div class="category-card-desc">' + m.desc + '</div>'
      html += '<span class="category-card-count">' + count + ' 篇文章</span>'
      html += '</a>'
    })
    html += '</div>'

    // Replace the category list with card grid
    categoryDiv.innerHTML = html
  }

  // Run on DOMContentLoaded and on pjax:complete (for SPA navigation)
  document.addEventListener('DOMContentLoaded', initCategoryCards)
  if (window.btf && window.btf.addGlobalFn) {
    window.btf.addGlobalFn('pjaxComplete', initCategoryCards, 'categoryCards')
  } else {
    document.addEventListener('pjax:complete', initCategoryCards)
  }
})()
