// Function to navigate to a specific section
      function navigateToSection(sectionId) {
        /*const targetNavItem = document.querySelector(`.nav-item[data-target="#${sectionId}"]`);
        if (targetNavItem) {
          targetNavItem.click();
        }*/
      }

      // Nav Bar Code
      document.addEventListener('DOMContentLoaded', function() {
        // Handle URL hash navigation after a delay
        /*const currentHash = window.location.hash;
        if (currentHash && currentHash.length > 1) {
          setTimeout(() => {
            navigateToSection(currentHash.substring(1));
          }, 4000);
        }*/

        // Select home tab
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');
        
        // Handle URL hash navigation after a delay
        /*const hash = window.location.hash;
        if (hash && hash.length > 1) { // Make sure hash isn't just '#'
          setTimeout(() => {
            // Find nav item that matches the hash without the '#' symbol
            const targetNavItem = document.querySelector(`.nav-item[data-target="#${hash.substring(1)}"]`);
            if (targetNavItem) {
              targetNavItem.click();
            }
          }, 4000); // 4 second delay
        }*/
        
        
        // Function to handle nav item clicks
        function handleNavClick(event) {
          const targetId = this.getAttribute('data-target');
          
          // Hide all content sections
          contentSections.forEach(section => {
            section.classList.remove('active');
          });
          
          // Show the targeted section
          document.querySelector(targetId).classList.add('active');
          
          // Reset all nav items
          navItems.forEach(item => {
            item.style.transform = 'translateY(0)';
            item.style.background = 'transparent';
          });
          
          // Style the clicked nav item
          this.style.background = 'rgba(155,130,155,0.3)';
          this.style.transform = 'translateY(-5px)';
          qs(this.primary).style.background = 'rgba(155,130,155,0.3)';
          //qs(this.primary).style.transform = 'translateY(-5px)';
        }
        
        // Add click event to each nav item
        navItems.forEach(item => {
          item.addEventListener('click', handleNavClick);
        });
        
        // Click the first nav item by default
        document.querySelector('#homeTab').click();
      });