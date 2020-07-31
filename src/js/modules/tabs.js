function tabs(parentSelector, contentSelector, itemSelector, activeClass) {
    //Tabs

    const tabsParent = document.querySelector(parentSelector),
    tabsContent = document.querySelectorAll(contentSelector),
    tabs = document.querySelectorAll(itemSelector);
        
  function hideTabs() {
      tabsContent.forEach(element => {
          element.classList.remove('show');
          element.classList.add('hide');
      });

      tabs.forEach(element => {
          element.classList.remove(activeClass);
      });
  }

  function showTab(index = 0) {
      tabsContent[index].classList.remove('hide');
      tabsContent[index].classList.add('show', 'previewFade');
      tabs[index].classList.add(activeClass);
  }

  hideTabs();
  showTab();

  tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if(target && target.classList.contains(itemSelector.slice(1))) {
          tabs.forEach( (element, index) => {
              if( element == target ) {
                  hideTabs();
                  showTab(index);
              }
          });
      }
  });
}

export default tabs;