;(function () {
  function enhanceCategories() {
    const root = document.querySelector('.page.type-categories .category-lists')
    if (!root || root.dataset.treeReady) return
    root.dataset.treeReady = 'true'

    for (const item of root.querySelectorAll('li.category-list-item')) {
      const children = item.querySelector(':scope > ul')
      const link = item.querySelector(':scope > a')
      if (!children || !link) continue

      const count = item.querySelector(':scope > .category-list-count')
      const details = document.createElement('details')
      const summary = document.createElement('summary')
      summary.textContent = link.textContent.trim()
      details.append(summary, link, children)
      link.textContent = '查看全部文章'
      if (count) link.after(count)
      item.append(details)
    }
  }

  document.addEventListener('DOMContentLoaded', enhanceCategories)
  document.addEventListener('pjax:complete', enhanceCategories)
  if (window.btf && window.btf.addGlobalFn) {
    window.btf.addGlobalFn('pjaxComplete', enhanceCategories, 'categoryTree')
  }
})()
