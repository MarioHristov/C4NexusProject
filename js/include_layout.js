function includeLayout() {
    fetch('../html_pages/layouts/page_layout.html')
      .then(response => response.text())
      .then(html => {
        // Inject the layout content into the page
        document.getElementById('layout-container').innerHTML = html;
        addScript('../js/slider.js');
        addScript('../js/filter_data.js');
        addScript('../js/sorting.js');
      })
      .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('Error fetching local file:', error);
      });
  }